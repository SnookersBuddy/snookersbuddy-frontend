import { useQuery } from "@tanstack/react-query";
import produce from "immer";
import { ItemData } from "../types/table-data";

function getItem(): Promise<ItemData> {
  return (
    fetch(`/api/item-creation-data`)
      .then((res) => res.json())
      // TODO: remove once backend sets select flag
      .then(
        produce((draft: ItemData) => {
          for (let variant of draft.availableVariants) {
            for (let singleVariant of variant.variants) {
              singleVariant.selected = false;
            }
          }

          for (let option of draft.availableOptions) {
            option.selected = false;
          }
        })
      )
  );
}

export function useCreateItemDataQuery() {
  return useQuery({
    queryKey: ["item"],
    queryFn: getItem,
  });
}
