let workInProgress = {
  memorizeState: null,
};

export function useCallback(nextCreate, deps) {
  const hook = workInProgress;
  const nextDeps = deps === undefined ? null : deps;
  const pre = workInProgress.memorizeState;

  if (pre !== null) {
    if (nextDeps !== null) {
      const curDeps = pre[1];

      if (curDeps === nextDeps) {
        return pre[0];
      }
    }
  }

  const create = nextCreate();
  hook.memorizeState = [create, nextCreate];

  return create;
}
