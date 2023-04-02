import ItemForm from "./item-form";
import { useCreateItemMutation } from "../../hooks/use-create-admin-mutation";
import { queryClient } from "../../../../lib";
import { useCreateItemDataQuery } from "../../hooks/use-create-item-data-query";
import { ItemData } from "../../types/table-data";
import { BaseLayout } from "../../../../components";
import { useNavigate } from "react-router-dom";
import produce from "immer";

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

  const handleSubmit = (itemIn: ItemData) => {
    const item = produce(itemIn, draft => {
      draft.availableVariants.forEach(
        (variantGroup) =>
          (variantGroup.variants = variantGroup.variants.filter(
            (singleVariant) => singleVariant.selected
          ))
      );
    })


    mutate({
      itemName: item.itemName,
      abbreviation: item.abbreviation,
      categoryId: item.categoryId,
      availableOptions: item.availableOptions.filter(
        ({ selected }) => selected
      ),
      availableVariants: item.availableVariants.filter((variant) =>
        variant.variants.some(({ selected }) => selected)
      ),
    });
  };

  return (
    <BaseLayout title="Item anlegen" outletProps={OUTLET_PROPS}>
      <ItemForm item={item!} onSubmit={handleSubmit} />
    </BaseLayout>
  );
}

export default CreateItem;
