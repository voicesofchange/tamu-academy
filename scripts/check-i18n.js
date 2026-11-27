#!/usr/bin/env node
/**
 * check-i18n — the translation guardrail run by `npm run lint`.
 *
 * 1. Dictionary parity: src/lib/i18n/translations/{en,sw,es,fr}.js must have
 *    exactly the same keys, no empty values, and the same {placeholders} in
 *    every value (a missing {count} would show the raw placeholder).
 * 2. Translation object size: every object passed to useTranslatedContent()
 *    that is written as a literal in the same file (CONTENT, UI_TEXT, …) must
 *    hold at most 100 translatable strings, counted the way the app counts
 *    them (flattenStrings in src/lib/i18n/translate-data.js), so each page's
 *    copy stays within one translatePageContent request.
 *
 * Exits with status 1 and a list of problems when a check fails.
 * Usage: node scripts/check-i18n.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import * as espree from 'espree';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LANGUAGES = ['en', 'sw', 'es', 'fr'];
const MAX_KEYS = 100;
const problems = [];

const { flattenStrings } = await import(pathToFileURL(path.join(ROOT, 'src/lib/i18n/translate-data.js')).href);

// ── 1. Dictionary parity ───────────────────────────────────────────────────
function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}
const placeholders = (s) => (typeof s === 'string' ? [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',') : '');

const dicts = {};
for (const lang of LANGUAGES) {
  const mod = await import(pathToFileURL(path.join(ROOT, `src/lib/i18n/translations/${lang}.js`)).href);
  dicts[lang] = flatten(mod.default);
}
const enKeys = Object.keys(dicts.en);
for (const lang of LANGUAGES) {
  const d = dicts[lang];
  for (const key of Object.keys(d)) {
    if (typeof d[key] === 'string' && d[key].trim() === '') problems.push(`${lang}.js: "${key}" is empty`);
  }
  if (lang === 'en') continue;
  for (const key of enKeys) {
    if (!(key in d)) problems.push(`${lang}.js: missing key "${key}" (present in en.js)`);
    else if (placeholders(d[key]) !== placeholders(dicts.en[key])) {
      problems.push(`${lang}.js: "${key}" placeholders {${placeholders(d[key])}} differ from en.js {${placeholders(dicts.en[key])}}`);
    }
  }
  for (const key of Object.keys(d)) {
    if (!(key in dicts.en)) problems.push(`${lang}.js: extra key "${key}" (not in en.js)`);
  }
}

// ── 2. Translation object size ─────────────────────────────────────────────
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(jsx?|mjs)$/.test(e.name)) out.push(p);
  }
  return out;
}

// Rebuild the literal parts of an object or array; anything computed
// (identifiers, calls, spreads) is left out, so only literal text is counted.
function literal(node) {
  if (!node) return undefined;
  switch (node.type) {
    case 'Literal': return typeof node.value === 'string' ? node.value : undefined;
    case 'TemplateLiteral': return node.expressions.length === 0 ? node.quasis[0].value.cooked : undefined;
    case 'ArrayExpression': return node.elements.map((el) => literal(el)).filter((v) => v !== undefined);
    case 'ObjectExpression': {
      const obj = {};
      for (const prop of node.properties) {
        if (prop.type !== 'Property' || prop.computed) continue;
        const key = prop.key.type === 'Identifier' ? prop.key.name : prop.key.value;
        const value = literal(prop.value);
        if (value !== undefined) obj[key] = value;
      }
      return obj;
    }
    default: return undefined;
  }
}

function visit(node, fn) {
  if (!node || typeof node.type !== 'string') return;
  fn(node);
  for (const key of Object.keys(node)) {
    if (key === 'parent') continue;
    const child = node[key];
    if (Array.isArray(child)) child.forEach((c) => visit(c, fn));
    else if (child && typeof child.type === 'string') visit(child, fn);
  }
}

let checkedObjects = 0;
for (const file of walk(path.join(ROOT, 'src'))) {
  const code = fs.readFileSync(file, 'utf8');
  if (!code.includes('useTranslatedContent(')) continue;
  let ast;
  try {
    ast = espree.parse(code, { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } });
  } catch (err) {
    problems.push(`${path.relative(ROOT, file)}: could not be parsed (${err.message})`);
    continue;
  }
  // Top-level `const NAME = { … }` / `[ … ]` declarations in this file.
  const declared = new Map();
  for (const stmt of ast.body) {
    const decl = stmt.type === 'VariableDeclaration' ? stmt
      : stmt.type === 'ExportNamedDeclaration' && stmt.declaration && stmt.declaration.type === 'VariableDeclaration' ? stmt.declaration : null;
    if (!decl) continue;
    for (const d of decl.declarations) {
      if (d.id.type === 'Identifier' && d.init && ['ObjectExpression', 'ArrayExpression'].includes(d.init.type)) declared.set(d.id.name, d.init);
    }
  }
  const seen = new Set();
  visit(ast, (node) => {
    if (node.type !== 'CallExpression' || node.callee.type !== 'Identifier' || node.callee.name !== 'useTranslatedContent') return;
    const arg = node.arguments[1];
    if (!arg) return;
    const name = arg.type === 'Identifier' ? arg.name : '(inline object)';
    const init = arg.type === 'Identifier' ? declared.get(arg.name) : (arg.type === 'ObjectExpression' ? arg : null);
    if (!init || seen.has(name)) return;
    seen.add(name);
    checkedObjects += 1;
    const count = Object.keys(flattenStrings(literal(init))).length;
    if (count > MAX_KEYS) {
      problems.push(`${path.relative(ROOT, file)}: ${name} has ${count} translatable strings (limit ${MAX_KEYS}); split it into smaller objects`);
    }
  });
}

if (problems.length) {
  console.error(`check-i18n: ${problems.length} problem(s)\n` + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log(`check-i18n: ${LANGUAGES.join('/')} dictionaries match (${enKeys.length} keys each); ${checkedObjects} translation objects within ${MAX_KEYS} strings.`);
