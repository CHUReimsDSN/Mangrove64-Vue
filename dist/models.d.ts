import type { TMangrove64BorderStrategy, TMangrove64NodeKeyType, TMangrove64SelectionMode } from "./private-models";
/**
 * @exportToDoc
 */
export type TMangrove64TreeProps<T extends TMangreove64NodeItemData> = {
    nodes: T[];
    columns: TMangrove64TreeColumn<T>[];
    draggable?: boolean;
    nodeKey?: keyof TMangreove64NodeItemData;
    parentKey?: keyof TMangreove64NodeItemData;
    childrenKey?: keyof TMangreove64NodeItemData;
    hasChildrenKey?: keyof TMangreove64NodeItemData;
    disabledKey?: keyof TMangreove64NodeItemData;
    orderKey?: keyof TMangreove64NodeItemData;
    selectionMode?: TMangrove64SelectionMode;
    resizableColumns?: boolean;
    indentationPx?: number;
    borderStrategy?: TMangrove64BorderStrategy;
    tableCssClass?: string;
    rowCssClass?: string;
    cellCssClass?: string;
    nodeKeyType?: TMangrove64NodeKeyType;
    checkboxColor?: string;
    onNodeExpand?: (nodeItem: TMangrove64NodeItem<T>) => Promise<void> | void;
    onNodeCollapse?: (nodeItem: TMangrove64NodeItem<T>) => Promise<void> | void;
    onNodeSelect?: (nodeItem: TMangrove64NodeItem<T>) => Promise<void> | void;
    onNodeUnselect?: (nodeItem: TMangrove64NodeItem<T>) => Promise<void> | void;
    onLazyLoadChildren?: (nodeItem: TMangrove64NodeItem<T>, nodeKeyValue: TMangrove64NodeKeyValue, done: (nodeData: T[]) => void) => Promise<void> | void;
    onNodesMove?: (nodeItems: TMangrove64NodeItem<T>[]) => Promise<void> | void;
};
/**
 * @exportToDoc
 */
export type TMangrove64TreeColumn<T extends TMangreove64NodeItemData> = {
    name: string;
    label: string;
    fieldTarget?: keyof T;
    cssClass?: string;
    align?: "left" | "center" | "right";
    format?: (nodeData: T) => string;
};
/**
 * @exportToDoc
 */
export type TMangrove64TreeApi<T extends TMangreove64NodeItemData> = {
    getSelectedNodeItems: () => TMangrove64NodeItem<T>[];
    getExpandedNodeItems: () => TMangrove64NodeItem<T>[];
    getNodeItemByKeyValue: (nodeKeyValue: TMangrove64NodeKeyValue) => TMangrove64NodeItem<T> | undefined;
    updateNodes: (nodesData: T[]) => void;
    addNodes: (nodesData: T[]) => void;
    setNodes: (nodesData: T[]) => void;
    removeNodes: (nodeKeyValues: TMangrove64NodeKeyValue[]) => void;
    highlightNodes: (nodeKeyValues: TMangrove64NodeKeyValue[]) => void;
    expandNodes: (nodeKeyValues: TMangrove64NodeKeyValue[]) => void;
};
/**
 * @exportToDoc
 */
export type TMangreove64NodeItemData = Record<string, unknown>;
/**
 * @exportToDoc
 */
export type TMangrove64NodeItem<T extends TMangreove64NodeItemData> = {
    dataIdentifierValue: TMangrove64NodeKeyValue;
    dataIdentifierKey: keyof TMangreove64NodeItemData;
    dataHasChildrenKey: keyof TMangreove64NodeItemData | undefined;
    dataOrderKey: keyof TMangreove64NodeItemData | undefined;
    parentKey: keyof TMangreove64NodeItemData | undefined;
    childrenKey: keyof TMangreove64NodeItemData | undefined;
    index: number;
    expanded: boolean;
    disabled: boolean;
    selected: boolean;
    level: number;
    hidden: boolean;
    loading: boolean;
    isLeaf: boolean;
    highlighted: boolean;
    data: T;
};
/**
 * @exportToDoc
 */
export type TMangrove64NodeKeyValue = string | number | symbol;
