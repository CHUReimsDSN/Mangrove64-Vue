import type { TTreeTableBorderStrategy, TTreeTableNodeKey, TTreeTableNodeKeyType, TTreeTableSelectionMode } from "./private-models";
export type TMangrove64TreeProps<T extends object = object> = {
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
    contextMenu?: TMangrove64TreeContextMenu<T>;
    resizableColumns?: boolean;
    indentationPx?: number;
    borderStrategy?: TTreeTableBorderStrategy;
    tableCssClass?: string;
    rowCssClass?: string;
    cellCssClass?: string;
    nodeKeyType?: TTreeTableNodeKeyType;
    checkboxColor?: string;
};
export type TMangrove64TreeColumn<T extends object = object> = {
    name: string;
    label: string;
    fieldTarget: keyof T;
    cssClass?: string;
    align?: "left" | "center" | "right";
    format?: (node: T) => string;
};
export type TMangrove64TreeContextMenu<T extends object = object> = {
    actions: {
        label: string;
        action: (node: T) => Promise<void> | void;
        icon?: string;
        cssClass?: string;
    }[];
    cssClass?: string;
};
export type TMangrove64TreeApi<T extends object = object> = {
    getSelectedKeys: () => Set<TTreeTableNodeKey>;
    getExpandedKeys: () => Set<TTreeTableNodeKey>;
    getNodeByKey: (nodeKey: TTreeTableNodeKey) => T | undefined;
    updateNode: (nodeKey: TTreeTableNodeKey, nodeData: T) => void;
    addNode: (node: T, parentNodeKey: TTreeTableNodeKey, positionBelowParent: number) => void;
    removeNode: (nodeKey: TTreeTableNodeKey) => void;
};
