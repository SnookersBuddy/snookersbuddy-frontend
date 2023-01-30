export interface UnpreparedRound {
  id: number;
  orderedAt: string;
  orderedBy: string;
  orderedItems: ReadonlyArray<OrderedItem>;
}

export interface OrderedItem {
  id: number;
  name: string;
  comment: string;
  category: { id: number; name: string };
  amount: number;
  options: ReadonlyArray<{
    id: number;
    name: string;
    defaultValue: boolean;
  }>;
  variants: ReadonlyArray<{
    id: number;
    name: string;
  }>
}

export type SortedRound = Omit<UnpreparedRound, 'orderedItems'> & {
  orderedItemsByCategory: Record<string, ReadonlyArray<OrderedItem>>;
}
