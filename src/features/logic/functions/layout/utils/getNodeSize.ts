export const getNodeSize = (nodeId: string) => {
  const node = document.querySelector(
    `[data-node-id="${nodeId}"]`,
  ) as HTMLElement | null;

  if (!node) {
    return;
  }

  return {
    width: node.offsetWidth,
    height: node.offsetHeight,
  };
};
