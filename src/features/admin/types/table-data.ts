import { Item } from "../../order/types/item";
import { Assignment } from "../../order/types/assignment";

export interface TableData {
  items: Item[];
  options: Option[];
  variants: VariantGroup[];
  assignments: Assignment[];
}

export interface Option {
  id: number;
  name: string;
}

export interface VariantGroup {
  id?: number;
  name: string;
}

export interface SingleVariant {
  id?: number;
  name: string;
  selected?: boolean;
}

export interface Variant {
  variantGroup: VariantGroup;
  singleVariants: SingleVariant[];
}

export interface ItemData {
  [x: string]: any;

  itemName: string;
  abbreviation: string;
  categoryId: number;

  availableOptions: OptionWithDefault[];
  availableVariants: VariantWithDefault[];
  availableCategories: ItemCategory[];
}

export interface CreateItemInput {
  itemName: string;
  abbreviation: string;
  categoryId: number;
  selectedOptions: OptionWithDefault[];
  selectedVariants: VariantWithDefault[];
}

export interface OptionWithDefault {
  id: number;
  name: string;
  defaultValue: boolean;
  selected?: boolean;
}

export interface VariantWithDefault {
  name: string;
  defaultVariantId: number;
  variants: SingleVariant[];
}

export interface ItemCategory {
  id: number;
  name: string;
}
