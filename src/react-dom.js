function ReactDOMRoot(initialRoot) {
  this._initialRoot = initialRoot;
}

ReactDOMRoot.prototype.render = function(children) {}

function updateContainer(element, container) {}

function createRoot(container) {
  const root = { containerInfo: container };

  return new ReactDOMRoot(root);
}