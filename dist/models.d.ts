import type { TTreeTableBorderStrategy, TTreeTableNodeKey, TTreeTableNodeKeyType, TTreeTableSelectionMode } from "./private-models";
/**
 * @exportToDoc
 */
export type TMangrove64TreeProps<T = object> = {
    nodes: T[];
    columns: TMangrove64TreeColumn<T>[];
    draggable?: boolean;
    nodeKey?: keyof T;
    childrenKey?: keyof T;
    parentKey?: keyof T;
    hasChildrenKey?: keyof T;
    disabledKey?: keyof T;
    orderKey?: keyof T;
    expandedNodeAtStart?: TTreeTableNodeKey[];
    expandeAllNodeAtStart?: boolean;
    selectedNodeAtStart?: TTreeTableNodeKey[];
    selectionMode?: TTreeTableSelectionMode;
    resizableColumns?: boolean;
    indentationPx?: number;
    borderStrategy?: TTreeTableBorderStrategy;
    tableCssClass?: string;
    rowCssClass?: string;
    cellCssClass?: string;
    nodeKeyType?: TTreeTableNodeKeyType;
    checkboxColor?: string;
};
/**
 * @exportToDoc
 */
export type TMangrove64TreeColumn<T = object> = {
    name: string;
    label: string;
    fieldTarget?: keyof T;
    cssClass?: string;
    align?: "left" | "center" | "right";
    format?: (node: T) => string;
};
/**
 * @exportToDoc
 */
export type TMangrove64TreeApi<T = object> = {
    getSelectedKeys: () => Set<TTreeTableNodeKey>;
    getExpandedKeys: () => Set<TTreeTableNodeKey>;
    getNodeByKey: (nodeKey: TTreeTableNodeKey) => T | undefined;
    updateNode: (nodeData: T) => void;
    addNode: (node: T) => void;
    removeNode: (nodeKey: TTreeTableNodeKey) => void;
};
/**
 * @exportToDoc
 */
export type TMangrove64Emits<T = object> = {
    (e: "node-expand", node: T): Promise<void> | void;
    (e: "node-collapse", node: T): Promise<void> | void;
    (e: "node-select", node: T): Promise<void> | void;
    (e: "node-unselect", node: T): Promise<void> | void;
    (e: "lazy-load-children", params: {
        node: T;
        nodeKey: TTreeTableNodeKey;
        done: (node: T[]) => Promise<void> | void;
    }): Promise<void> | void;
    (e: "nodes-move", nodes: T[], parentKey: TTreeTableNodeKey | null, positionStartWithinParent: number): Promise<void> | void;
};
