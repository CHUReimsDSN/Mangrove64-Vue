import type { TNodeItem } from "./models";
declare function isLeaf(nodeItem: TNodeItem): boolean;
declare function setLeaf(nodeItem: TNodeItem, state: boolean): void;
declare function getDataKeyValue(nodeItem: TNodeItem): string;
declare function getFakeDataKeyValue(nodeItem: TNodeItem): string;
declare function getNodeOrder(nodeItem: TNodeItem): number;
declare function getDataParentKeyValue(nodeItem: TNodeItem): string;
export declare const NodeItemApi: {
    isLeaf: typeof isLeaf;
    setLeaf: typeof setLeaf;
    getDataKeyValue: typeof getDataKeyValue;
    getFakeDataKeyValue: typeof getFakeDataKeyValue;
    getNodeOrder: typeof getNodeOrder;
    getDataParentKeyValue: typeof getDataParentKeyValue;
};
export {};
