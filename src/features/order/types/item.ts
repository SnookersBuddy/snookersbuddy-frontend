import { Option, SingleVariant } from "./configuration";

export interface Item {
  id: number;
  itemName: string;
  abbreviation: string;
  categoryId: number;
  description: string;
  specialFeature: string;
}

export interface OrderedItem {
  item: Item;
  chosenVariants: SingleVariant[];
  chosenOptions: Option[];
  comment: string;
}


