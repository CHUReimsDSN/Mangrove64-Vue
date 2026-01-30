import type { VNode } from "vue";
import type { TNodeItem } from "./models";

export type TTreeTableNodeKeyValue = string | number | symbol;
export type TTreeTableSelectionMode = 'unique' | 'multiple' | 'checkbox';
export type TTreeTableBorderStrategy = 'none' | 'vertical' | 'horizontal' | 'cell';
export type TTreeTableNodeKeyType = 'string' | 'symbol' | 'number';
export type TTreeTableTheme = 'light' | 'dark';
export type TTreeTableSlot = (params: { nodeItem: TNodeItem }) => VNode[];
export type TTreeTableHierarchy = {
  parent: TTreeTableNodeKeyValue;
  children: TTreeTableNodeKeyValue[];
};
