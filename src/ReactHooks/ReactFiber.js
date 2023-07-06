import { Placement, FunctionComponent, HostComponent } from "./ReactWorkTags";

export function createFiber(vnode, returnFiber) {
  const fiber = {
    type: vnode.type,
    props: vnode.props,
    key: vnode.key,
    stateNode: null,
    child: null,
    sibling: null,
    return: returnFiber,
    idnex: null,
    alternate: null,
    flags: Placement,
  };

  const type = { vnode };

  if (typeof type === "string") {
    fiber.tag = HostComponent;
  } else if (Object.prototype.toString.call(type) === "[object Function]") {
    fiber.tag = FunctionComponent;
  } else {
    // TODO
  }

  return fiber;
}
