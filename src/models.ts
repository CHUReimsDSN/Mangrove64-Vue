import type {
  TTreeTableBorderStrategy,
  TTreeTableNodeKey,
  TTreeTableNodeKeyType,
  TTreeTableSelectionMode,
} from "./private-models";

export type TMangrove64TreeProps<T> = {
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
export type TMangrove64TreeColumn<T> = {
  name: string;
  label: string;
  fieldTarget?: keyof T;
  cssClass?: string;
  align?: "left" | "center" | "right";
  format?: (node: T) => string;
};
export type TMangrove64TreeApi<T> = {
  getSelectedKeys: () => Set<TTreeTableNodeKey>;
  getExpandedKeys: () => Set<TTreeTableNodeKey>;
  getNodeByKey: (nodeKey: TTreeTableNodeKey) => T | undefined;
  updateNode: (nodeData: T) => void;
  addNode: (node: T) => void;
  removeNode: (nodeKey: TTreeTableNodeKey) => void;
}
