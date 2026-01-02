---
title: Définitions
---

# Définitions

## TMangrove64TreeProps
```typescript
type TMangrove64TreeProps<T extends object> = {
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
type TTreeTableNodeKey = string | number | symbol;
type TTreeTableSelectionMode = 'unique' | 'multiple' | 'checkbox';
type TTreeTableBorderStrategy = 'none' | 'vertical' | 'horizontal' | 'cell';
type TTreeTableNodeKeyType = 'string' | 'symbol' | 'number';
```

## TMangrove64TreeColumn
```typescript
type TMangrove64TreeColumn<T extends object> = {
  name: string;
  label: string;
  fieldTarget: keyof T;
  cssClass?: string;
  align?: "left" | "center" | "right";
  format?: (node: T) => string;
};
```

## TMangrove64TreeApi

```typescript
type TMangrove64TreeApi<T extends object> = {
  getSelectedKeys: () => Set<TTreeTableNodeKey>;
  getExpandedKeys: () => Set<TTreeTableNodeKey>;
  getNodeByKey: (nodeKey: TTreeTableNodeKey) => T | undefined;
  updateNode: (nodeKey: TTreeTableNodeKey, nodeData: T) => void;
  addNode: (node: T, parentNodeKey: TTreeTableNodeKey, positionBelowParent: number) => void;
  removeNode: (nodeKey: TTreeTableNodeKey) => void;
}
```