interface TimelessJewelDictItem {
  name: string;
  variants: string[];
  min: number;
  max: number;
}

export interface TimelessJewelDict {
  [key: string]: TimelessJewelDictItem;
}
