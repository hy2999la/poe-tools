interface AscendancyItem {
  label: string;
}

interface ClassItem {
  ascendancies: {
    [key: string]: AscendancyItem;
  };
  hiddenForbiddenJewelPassive: string;
  label: string;
}

export interface AscendanciesDict {
  [key: string]: ClassItem;
}
