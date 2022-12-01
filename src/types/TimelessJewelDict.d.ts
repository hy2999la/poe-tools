interface TimelessJewelDictItem {
  label: string;
  variants: string[];
  min: number;
  max: number;
}

export interface TimelessJewelDict {
  [key: string]: TimelessJewelDictItem;
}
