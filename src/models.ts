import type {
  TTreeTableBorderStrategy,
  TTreeTableHierarchy,
  TTreeTableNodeKeyValue,
  TTreeTableNodeKeyType,
  TTreeTableSelectionMode,
} from "./private-models";

/**
 * @exportToDoc
 */
export type TMangrove64TreeProps = {
  nodes: TNodeItemData[];
  columns: TMangrove64TreeColumn[];
  draggable?: boolean;
  nodeKey?: keyof TNodeItemData;
  childrenKey?: keyof TNodeItemData;
  parentKey?: keyof TNodeItemData;
  hasChildrenKey?: keyof TNodeItemData;
  disabledKey?: keyof TNodeItemData;
  orderKey?: keyof TNodeItemData;
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
export type TMangrove64TreeColumn = {
  name: string;
  label: string;
  fieldTarget?: keyof TNodeItemData;
  cssClass?: string;
  align?: "left" | "center" | "right";
  format?: (node: TNodeItemData) => string;
};
/**
 * @exportToDoc
 */
export type TMangrove64TreeApi = {
  getSelectedKeys: () => TNodeItem[];
  getExpandedNodeItem: () => TNodeItem[];
  getNodeItemByKey: (nodeKey: TTreeTableNodeKeyValue) => TNodeItem | undefined;
  updateNode: (nodeData: TNodeItemData) => void;
  addNode: (nodeData: TNodeItemData) => void;
  removeNode: (nodeKey: TTreeTableNodeKeyValue) => void;
};

/**
 * @exportToDoc
 */
export type TMangrove64Emits = {
  (e: "node-expand", nodeItem: TNodeItem): Promise<void> | void;
  (e: "node-collapse", nodeItem: TNodeItem): Promise<void> | void;
  (e: "node-select", nodeItem: TNodeItem): Promise<void> | void;
  (e: "node-unselect", nodeItem: TNodeItem): Promise<void> | void;
  (
    e: "lazy-load-children",
    params: {
      nodeItem: TNodeItem;
      nodeKey: TTreeTableNodeKeyValue;
      done: (nodeData: TNodeItemData[]) => Promise<void> | void;
    },
  ): Promise<void> | void;
  (
    e: "nodes-move",
    nodeItems: TNodeItem[],
    parentKey: TTreeTableNodeKeyValue | null,
    positionStartWithinParent: number,
  ): Promise<void> | void;
};

/**
 * @exportToDoc
 */
export type TNodeItemData = Record<string, unknown>;

/**
 * @exportToDoc
 */
export type TNodeItem = {
  dataIdentifierValue: TTreeTableNodeKeyValue
  dataIdentifierKey: keyof TNodeItemData;
  dataHasChildrenKey: keyof TNodeItemData | undefined;
  dataOrderKey: keyof TNodeItemData | undefined;
  parentKey: keyof TNodeItemData | undefined;
  hierarchy: TTreeTableHierarchy;
  index: number;
  expanded: boolean;
  selected: boolean;
  level: number;
  hidden: boolean;
  loading: boolean;
  data: TNodeItemData;
}
