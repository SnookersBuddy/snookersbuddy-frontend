import ItemForm from "./item-form";
import { useCreateItemMutation } from "../../hooks/use-create-admin-mutation";
import { queryClient } from "../../../../lib";
import { useCreateItemDataQuery } from "../../hooks/use-create-item-data-query";
import { ItemData } from "../../types/table-data";
import { BaseLayout } from "../../../../components";

function CreateItem() {
  const { data: item } = useCreateItemDataQuery(0);

  const { mutate } = useCreateItemMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["table-data"]);
    },
  });

  const handleSubmit = (item: ItemData) => {
    const input = {
      itemName: item.itemName,
      abbreviation: item.abbreviation,
      categoryId: item.categoryId,
      selectedOptions: item.availableOptions.filter(({ selected }) => selected),
      selectedVariants: item.availableVariants.filter((variant) =>
        variant.variants.some(({ selected }) => selected)
      ),
    };
    console.log(input);
    mutate(input);
  };

  return (
    <BaseLayout title="Item anlegen">
      <ItemForm item={item!} onSubmit={handleSubmit} />
    </BaseLayout>
  );
}

export default CreateItem;
