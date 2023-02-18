import {Item} from "../../order/types/item";
import {Assignment} from "../../order/types/assignment";

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

export interface Wrapper{
    option: Option;
}


