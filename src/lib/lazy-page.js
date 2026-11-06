import { lazy } from 'react';

/**
 * lazyPage — route-level code loading with a one-time recovery reload.
 *
 * A page's code is fetched only when its route is opened. That fetch can fail
 * for a reason that has nothing to do with the learner: a new version was
 * published while the site was open, so the file the old page asked for no
 * longer exists under that name. The visitor would otherwise be left looking
 * at a blank screen.
 *
 * So when a module fails to load, the page reloads once — that picks up the
 * current version and the page opens normally. A flag in sessionStorage makes
 * sure this happens at most once per tab: if the page still cannot load after
 * that reload, the error is re-thrown so the app's error boundary can show the
 * friendly recovery screen instead of retrying forever. The flag is cleared as
 * soon as any page loads successfully, so a later deploy gets its own reload.
 */

const RELOAD_FLAG = 'tamu-page-reload-attempt';

/** Recognises the errors thrown when a page's JavaScript file cannot be fetched. */
function isModuleLoadError(error) {
  const signature = `${error?.name || ''} ${error?.message || error || ''}`;
  return /dynamically imported module|module script failed|Loading chunk|ChunkLoadError/i.test(signature);
}

function readFlag() {
  try {
    return window.sessionStorage.getItem(RELOAD_FLAG) === '1';
  } catch {
    return false;
  }
}

function writeFlag() {
  try {
    window.sessionStorage.setItem(RELOAD_FLAG, '1');
  } catch {
    // Storage can be unavailable in private modes; the retry still runs once
    // because the reload discards this page's memory.
  }
}

function clearFlag() {
  try {
    window.sessionStorage.removeItem(RELOAD_FLAG);
  } catch {
    // Nothing to clear if storage is unavailable.
  }
}

export function lazyPage(importer) {
  return lazy(async () => {
    try {
      const module = await importer();
      clearFlag();
      return module;
    } catch (error) {
      if (isModuleLoadError(error) && !readFlag()) {
        writeFlag();
        window.location.reload();
        // The reload replaces this page; keep the suspended view in place
        // while the browser navigates.
        return new Promise(() => {});
      }
      throw error;
    }
  });
}