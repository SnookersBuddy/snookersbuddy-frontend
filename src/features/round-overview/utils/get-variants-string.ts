import { OrderedItem } from "../types";

export function getVariantsString(variants: OrderedItem["variants"]): string {
  return variants.reduce(
    (previousValue, currentValue, currentIndex) =>
      currentIndex === 0
        ? currentValue.name
        : `${previousValue} - ${currentValue.name}`,
    ""
  );
}
