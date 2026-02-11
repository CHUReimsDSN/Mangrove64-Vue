import type { VNode } from "vue";
import type { TMangrove64NodeItem, TMangreove64NodeItemData } from "./models";

export type TMangrove64SelectionMode = 'unique' | 'multiple' | 'checkbox';
export type TMangrove64BorderStrategy = 'none' | 'vertical' | 'horizontal' | 'cell';
export type TMangrove64NodeKeyType = 'string' | 'symbol' | 'number';
export type TMangrove64Theme = 'light' | 'dark';
export type TMangrove64DragMode = 'child' | 'brother'
export type TMangrove64Slot<T extends TMangreove64NodeItemData> = (params: { nodeItem: TMangrove64NodeItem<T> }) => VNode[];
export type TMangrove64Hierarchy = {
  parentIndex: number | null;
  childrenIndex: number[];
};
