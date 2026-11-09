import { useEffect, useRef, type DependencyList } from 'react';

/**
 * Runs `effect` after the current render commit, never synchronously inside the effect body.
 *
 * Data loaders typically call `setLoading(true)` before fetching. Doing that directly in a `useEffect`
 * body triggers a cascading synchronous re-render (react-hooks/set-state-in-effect). Deferring the call to
 * a microtask lets React finish the commit first, and the `active` flag stops a stale run after unmount or
 * after the dependencies change.
 *
 * The latest `effect` closure is always used, so callers do not need to memoise it; `deps` controls re-runs.
 */
export function useDeferredEffect(effect: () => void | Promise<void>, deps: DependencyList): void {
  const latest = useRef(effect);

  useEffect(() => {
    latest.current = effect;
  });

  useEffect(() => {
    let active = true;
    void Promise.resolve().then(() => {
      if (active) return latest.current();
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
