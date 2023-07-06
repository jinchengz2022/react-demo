import { createFiber } from './ReactFiber';

function ReactDOMRoot(initialRoot) {
  this._initialRoot = initialRoot;
}

ReactDOMRoot.prototype.render = function(children) {
  const root = this.initialRoot;

  updateContainer(children, root);
}

function updateContainer(element, container) {
  const { containerInfo } = container;
  const fiber = createFiber(element, {
    type: containerInfo.nodeName.toLowerCase(),
    stateNode: containerInfo
  })

  // scheduleUpdateOnFiber(fiber);
}

export function createRoot(container) {
  const root = { containerInfo: container };

  return new ReactDOMRoot(root);
}