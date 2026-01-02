import type { VNode } from "vue";
export type TTreeTableNodeKey = string | number | symbol;
export type TTreeTableSelectionMode = 'unique' | 'multiple' | 'checkbox';
export type TTreeTableBorderStrategy = 'none' | 'vertical' | 'horizontal' | 'cell';
export type TTreeTableNodeKeyType = 'string' | 'symbol' | 'number';
export type TTreeTableTheme = 'light' | 'dark';
export type TTreeTableSlot<T> = (params: {
    node: T;
}) => VNode[];
export type TTreeTableHierarchy = {
    parent: TTreeTableNodeKey;
    children: TTreeTableNodeKey[];
};
