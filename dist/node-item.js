const fakeElementPrefix = "__mangrove64-fake-row-";
function isLeaf(nodeItem) {
    if (!nodeItem.dataHasChildrenKey) {
        return false;
    }
    return Boolean(nodeItem.data[nodeItem.dataHasChildrenKey]) === false;
}
function setLeaf(nodeItem, state) {
    if (!nodeItem.dataHasChildrenKey) {
        return;
    }
    nodeItem.data[nodeItem.dataHasChildrenKey] = state;
}
function getDataKeyValue(nodeItem) {
    return nodeItem.data[nodeItem.dataIdentifierKey].toString();
}
function getFakeDataKeyValue(nodeItem) {
    return `${fakeElementPrefix}${getDataKeyValue(nodeItem).toString()}`;
}
function getNodeOrder(nodeItem) {
    if (!nodeItem.dataOrderKey) {
        return 0;
    }
    return nodeItem.data[nodeItem.dataOrderKey] ?? 0;
}
function getDataParentKeyValue(nodeItem) {
    if (!nodeItem.parentKey) {
        return '???';
    }
    return nodeItem.data[nodeItem.parentKey].toString();
}
export const NodeItemApi = {
    isLeaf,
    setLeaf,
    getDataKeyValue,
    getFakeDataKeyValue,
    getNodeOrder,
    getDataParentKeyValue
};
