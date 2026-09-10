import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChevronDown, ChevronUp, Loader2, CheckCircle2, XCircle } from 'lucide-react';

const USER_BUBBLE = {
  background: 'rgba(212,161,42,0.15)',
  border: '1px solid rgba(212,161,42,0.3)',
  borderRadius: '12px 12px 4px 12px',
  padding: '0.7rem 1rem',
  color: '#F5EFE0',
  maxWidth: '85%',
};

const ASSISTANT_BUBBLE = {
  background: 'rgba(245,239,224,0.05)',
  border: '1px solid rgba(245,239,224,0.12)',
  borderRadius: '12px 12px 12px 4px',
  padding: '0.7rem 1rem',
  color: '#F5EFE0',
  maxWidth: '85%',
};

function statusInfo(status, results) {
  if (status === 'pending' || status === 'running' || status === 'in_progress') {
    return { icon: <Loader2 size={13} className="animate-spin" style={{ color: '#D4A12A' }} />, text: 'Working…', ok: null };
  }
  if (status === 'failed' || status === 'error') {
    return { icon: <XCircle size={13} style={{ color: '#E8826A' }} />, text: 'Failed', ok: false };
  }
  let parsed = results;
  if (typeof results === 'string') {
    try { parsed = JSON.parse(results); } catch (_) { parsed = results; }
  }
  const failed = (typeof parsed === 'object' && parsed && (parsed.success === false)) || /error|failed/i.test(String(results ?? ''));
  if (failed) {
    return { icon: <XCircle size={13} style={{ color: '#E8826A' }} />, text: 'Failed', ok: false };
  }
  return { icon: <CheckCircle2 size={13} style={{ color: '#9CBF8A' }} />, text: 'Done', ok: true };
}

function ToolCallDisplay({ toolCall }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusInfo(toolCall.status, toolCall.results);
  const hide = toolCall.display_projection?.hide_details && toolCall.display_projection?.details_redacted;
  const label = toolCall.display_projection?.label || toolCall.name;

  let args = toolCall.arguments_string;
  try { args = JSON.stringify(JSON.parse(toolCall.arguments_string), null, 2); } catch (_) { /* keep raw */ }
  let results = toolCall.results;
  try { results = JSON.stringify(JSON.parse(toolCall.results), null, 2); } catch (_) { /* keep raw */ }

  if (hide) {
    return (
      <div className="mt-1.5 text-xs flex items-center gap-1.5" style={{ color: 'rgba(245,239,224,0.55)' }}>
        {status.icon}
        <span>{status.text === 'Working…' ? (toolCall.display_projection?.active_label || 'Working…') : status.ok === false ? (toolCall.display_projection?.error_label || 'Failed') : (toolCall.display_projection?.label || label)}</span>
      </div>
    );
  }

  return (
    <div className="mt-1.5 text-xs" style={{ color: 'rgba(245,239,224,0.6)' }}>
      <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1.5 hover:underline" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        {status.icon}
        <span>{label} — {status.text}</span>
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
      {expanded && (
        <div className="mt-1.5 space-y-1.5">
          {args && (
            <div>
              <div style={{ color: 'rgba(245,239,224,0.4)', marginBottom: '0.2rem' }}>Parameters:</div>
              <pre className="whitespace-pre-wrap break-words" style={{ background: 'rgba(0,0,0,0.25)', padding: '0.5rem', borderRadius: '6px', fontSize: '0.7rem' }}>{String(args)}</pre>
            </div>
          )}
          {results && (
            <div>
              <div style={{ color: 'rgba(245,239,224,0.4)', marginBottom: '0.2rem' }}>Result:</div>
              <pre className="whitespace-pre-wrap break-words" style={{ background: 'rgba(0,0,0,0.25)', padding: '0.5rem', borderRadius: '6px', fontSize: '0.7rem' }}>{String(results)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div style={isUser ? USER_BUBBLE : ASSISTANT_BUBBLE}>
        {message.content && (isUser ? (
          <p className="text-sm whitespace-pre-wrap" style={{ margin: 0 }}>{message.content}</p>
        ) : (
          <div className="text-sm prose prose-sm prose-invert" style={{ margin: 0, maxWidth: 'none' }}>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
        {message.tool_calls?.map((tc, i) => <ToolCallDisplay key={i} toolCall={tc} />)}
      </div>
    </div>
  );
}