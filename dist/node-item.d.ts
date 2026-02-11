import type { TMangrove64NodeItem, TMangreove64NodeItemData, TMangrove64NodeKeyValue } from './models';
declare function getFakeDataKeyValue<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>): string;
declare function getDataChildren<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>): T[];
declare function setDataChildren<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>, dataChildren: T[]): void;
declare function getParentKeyValue<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>): TMangrove64NodeKeyValue | null;
declare function setParentKeyValue<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>, parentKeyValue: TMangrove64NodeKeyValue | null): void;
declare function getDataOrder<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>): number;
declare function setDataOrder<T extends TMangreove64NodeItemData>(nodeItem: TMangrove64NodeItem<T>, newOrder: number): void;
export declare const NodeItemApi: {
    getFakeDataKeyValue: typeof getFakeDataKeyValue;
    getDataChildren: typeof getDataChildren;
    setDataChildren: typeof setDataChildren;
    getParentKeyValue: typeof getParentKeyValue;
    setParentKeyValue: typeof setParentKeyValue;
    getDataOrder: typeof getDataOrder;
    setDataOrder: typeof setDataOrder;
    fakeElementPrefix: string;
};
export {};
