import type { TMangrove64NodeItem, TMangreove64NodeItemData, TMangrove64NodeKeyValue } from './models';

const fakeElementPrefix = '__mangrove64-fake-row-';

function getFakeDataKeyValue<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>) {
  return `${fakeElementPrefix}${String(nodeItem.dataIdentifierValue)}`;
}
function getDataChildren<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>) {
  if (!nodeItem.childrenKey) {
    return [];
  }
  return (nodeItem.data[nodeItem.childrenKey] ?? []) as T[];
}
function setDataChildren<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>, dataChildren: T[]) {
  if (!nodeItem.childrenKey) {
    return;
  }
  (nodeItem.data[nodeItem.childrenKey] as T[]) = dataChildren;
}
function getParentKeyValue<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>) {
  if (!nodeItem.parentKey) {
    return null
  }
  return nodeItem.data[nodeItem.parentKey] as TMangrove64NodeKeyValue;
}
function setParentKeyValue<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>, parentKeyValue: TMangrove64NodeKeyValue | null) {
  if (!nodeItem.parentKey) {
    return
  }
  (nodeItem.data[nodeItem.parentKey] as (TMangrove64NodeKeyValue | null)) = parentKeyValue
}
function getDataOrder<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>) {
  if (!nodeItem.dataOrderKey) {
    return -1;
  }
  return nodeItem.data[nodeItem.dataOrderKey] as number ?? 0;
}
function setDataOrder<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>, newOrder: number) {
  if (!nodeItem.dataOrderKey) {
    return
  }
  (nodeItem.data[nodeItem.dataOrderKey] as number) = newOrder
}

export const NodeItemApi = {
  getFakeDataKeyValue,
  getDataChildren,
  setDataChildren,
  getParentKeyValue,
  setParentKeyValue,
  getDataOrder,
  setDataOrder,
  fakeElementPrefix
};
