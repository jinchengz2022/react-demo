// 是否挂载
let isMount = true;
// 正在执行的hook
let workInProgressHook = null;

let fiber = {
  memorizeState: null,
  stateNode: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [num, updateNum] = useState(0);

    console.log({ num, isMount });

    return (
      <div className="App">
        <div>111</div>
        <div
          onClick={() => {
            updateNum((pre) => pre + 1);
          }}
        >
          {num}
        </div>
      </div>
    );
  },
};

export function run() {
  const app = fiber.stateNode();
  isMount = false;
  workInProgressHook = fiber.memorizeState;

  return app;
}

// queue为dispatchAction.bind()调用时的传参action为调用时得传参
function dispatchAction(queue, action) {
  const update = {
    action,
    next: null,
  };

  if (queue.pending === null) {
    // 不存在update则update与自己形成环状链表
    update.next = update;
  } else {
    // 更新值为3
    // 0 -> 1 -> 2
    // 3 -> 0 -> 1 -> 2 -> 3

    // 3 -> 0
    update.next = queue.pending.next;
    // 2 -> 3
    queue.pending.next = update;
  }

  // queue.pending最后一个update
  queue.pending = update;

  // update.action(fiber.memorizeState)
  run();
}

export function useState(initialState) {
  let hook;

  if (isMount) {
    // 挂载阶段创建hook
    hook = {
      queue: {
        pending: null,
      },
      memorizeState: initialState,
      next: null,
    };

    if (!fiber.memorizeState) {
      // 不存在则将hook赋值给memorizeState
      fiber.memorizeState = hook;
    } else {
      // 如果存在则将workInProgressHook指针指向创建的hook
      workInProgressHook.next = hook;
    }
    // 将hook赋值给当前workInProgressHook
    workInProgressHook = hook;
  } else {
    // 如果是update阶段
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }

  // 记录state
  let baseState = hook.memorizeState;

  // 是否有需要计算的state
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;

    // 遍历链表
    do {
      let action = firstUpdate.action;
      baseState = action(baseState);
      // 指针指向下一节点
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending.next);

    hook.queue.pending = null;
  }

  hook.memorizeState = baseState;
// 预设的初始参数hook.queue
  return [baseState, dispatchAction.bind(null, hook.queue)];
}