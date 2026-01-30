import type { TNodeItem } from "./models";
import { TTreeTableNodeKeyValue } from "./private-models";

const fakeElementPrefix = "__mangrove64-fake-row-";

function isLeaf(nodeItem: TNodeItem) {
  if (!nodeItem.dataHasChildrenKey) {
    return false;
  }
  return Boolean(nodeItem.data[nodeItem.dataHasChildrenKey]) === false;
}
function setLeaf(nodeItem: TNodeItem, state: boolean) {
  if (!nodeItem.dataHasChildrenKey) {
    return;
  }
  nodeItem.data[nodeItem.dataHasChildrenKey] = state;
}
function getDataKeyValue(nodeItem: TNodeItem) {
  return (nodeItem.data[nodeItem.dataIdentifierKey] as TTreeTableNodeKeyValue).toString()
}
function getFakeDataKeyValue(nodeItem: TNodeItem) {
  return `${fakeElementPrefix}${getDataKeyValue(nodeItem).toString()}`;
}
function getNodeOrder(nodeItem: TNodeItem) {
  if (!nodeItem.dataOrderKey) {
    return 0
  }
  return (nodeItem.data[nodeItem.dataOrderKey] as number) ?? 0;
}
function getDataParentKeyValue(nodeItem: TNodeItem) {
  if (!nodeItem.parentKey) {
    return '???'
  }
  return (nodeItem.data[nodeItem.parentKey] as TTreeTableNodeKeyValue).toString()
}

export const NodeItemApi = {
  isLeaf,
  setLeaf,
  getDataKeyValue,
  getFakeDataKeyValue,
  getNodeOrder,
  getDataParentKeyValue
};
