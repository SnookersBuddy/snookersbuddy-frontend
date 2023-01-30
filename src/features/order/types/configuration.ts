import { Item } from "./item";

export interface Configuration {
  amount: number;
  item: Item;
  variants: Variant[];
  options: Option [];
  comment: string;
}

export interface Variant {
  name: string;
  defaultVariantId: number;
  variants: SingleVariant[];
}

export interface Option {
  id: number;
  name: string;
  defaultValue: boolean;
}

export interface SingleVariant {
  id: number;
  name: string
}
