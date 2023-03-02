import {Item} from "../../order/types/item";
import {Assignment} from "../../order/types/assignment";
import {Variant} from "../../order/types/configuration";

export interface TableData{
    items: Item[];
    options: Option[];
    variants: VariantGroup[];
    assignments: Assignment[];
}

export interface Option{
    id: number;
    name: string;
}

export interface VariantGroup{
    id: number;
    name: string;
}

export interface ItemData{

    itemName: string;
    abbreviation: string;
    categoryId: number;
    selectedOptions: Option[];
    selectedVariants: Variant[];

    availableOptions: Option[];
    availableVariants: Variant[];
    availableCategories: ItemCategory[];

}

export interface ItemCategory {
    id: number;
    name: string;
}


