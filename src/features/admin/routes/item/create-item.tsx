import ItemForm from "./item-form";
import { useCreateItemMutation } from "../../hooks/use-create-admin-mutation";
import { queryClient } from "../../../../lib";
import { useCreateItemDataQuery } from "../../hooks/use-create-item-data-query";
import { ItemData } from "../../types/table-data";
import { BaseLayout } from "../../../../components";
import { useNavigate } from "react-router-dom";

const OUTLET_PROPS = { maxWidth: "lg" } as const;

function CreateItem() {
  const navigate = useNavigate();
  const { data: item } = useCreateItemDataQuery(0);

  const { mutate } = useCreateItemMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["table-data"]);
      navigate(-1);
    },
  });

  const handleSubmit = (item: ItemData) => {
    item.availableVariants.forEach(
      (variantGroup) =>
        (variantGroup.variants = variantGroup.variants.filter(
          (singleVariant) => singleVariant.selected
        ))
    );
    const input = {
      itemName: item.itemName,
      abbreviation: item.abbreviation,
      categoryId: item.categoryId,
      availableOptions: item.availableOptions.filter(
        ({ selected }) => selected
      ),
      availableVariants: item.availableVariants.filter((variant) =>
        variant.variants.some(({ selected }) => selected)
      ),
    };
    mutate(input);
  };

  return (
    <BaseLayout title="Item anlegen" outletProps={OUTLET_PROPS}>
      <ItemForm item={item!} onSubmit={handleSubmit} />
    </BaseLayout>
  );
}

export default CreateItem;
