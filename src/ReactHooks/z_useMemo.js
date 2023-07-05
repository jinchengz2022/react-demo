let workInProgressHook = {
  memorizeState: null
};

export function useMemo(nextCreate, deps) {
  debugger;
  const hook = workInProgressHook;
  const nextDeps = deps === undefined ? null : deps;
  const preState = hook.memorizeState;

  if(preState !== null) {
    if(nextDeps !== null) {
      const preDeps = preState[1];
      if(preDeps === nextDeps) {
        return preState[0];
      }
    }
  }

  const nextValue = nextCreate();

  hook.memorizeState = [nextValue, nextDeps];

  return nextValue;
}