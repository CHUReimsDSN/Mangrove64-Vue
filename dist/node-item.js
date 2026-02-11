const fakeElementPrefix = '__mangrove64-fake-row-';
function getFakeDataKeyValue(nodeItem) {
    return `${fakeElementPrefix}${String(nodeItem.dataIdentifierValue)}`;
}
function getDataChildren(nodeItem) {
    if (!nodeItem.childrenKey) {
        return [];
    }
    return (nodeItem.data[nodeItem.childrenKey] ?? []);
}
function setDataChildren(nodeItem, dataChildren) {
    if (!nodeItem.childrenKey) {
        return;
    }
    nodeItem.data[nodeItem.childrenKey] = dataChildren;
}
function getParentKeyValue(nodeItem) {
    if (!nodeItem.parentKey) {
        return null;
    }
    return nodeItem.data[nodeItem.parentKey];
}
function setParentKeyValue(nodeItem, parentKeyValue) {
    if (!nodeItem.parentKey) {
        return;
    }
    nodeItem.data[nodeItem.parentKey] = parentKeyValue;
}
function getDataOrder(nodeItem) {
    if (!nodeItem.dataOrderKey) {
        return -1;
    }
    return nodeItem.data[nodeItem.dataOrderKey] ?? 0;
}
function setDataOrder(nodeItem, newOrder) {
    if (!nodeItem.dataOrderKey) {
        return;
    }
    nodeItem.data[nodeItem.dataOrderKey] = newOrder;
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
