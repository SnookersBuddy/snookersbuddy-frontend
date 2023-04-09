import ItemForm from "./item-form";
import { useStrongParams } from "../../../../hooks/use-strong-params";
import { BaseLayout } from "../../../../components";
import { useCreateItemDataQuery } from "../../hooks/use-create-item-data-query";
import { useUpdateItemMutation } from "../../hooks/use-update-admin-mutation";
import { queryClient } from "../../../../lib";
import { ItemData } from "../../types/table-data";
import { useNavigate } from "react-router-dom";
import { produce } from 'immer';

const OUTLET_PROPS = { maxWidth: "lg" } as const;

function EditItem() {
  const navigate = useNavigate();
  const { itemId } = useStrongParams("itemId");
  const { data: item } = useCreateItemDataQuery(parseInt(itemId, 10));


  const { mutate } = useUpdateItemMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["table-data"]);
      queryClient.invalidateQueries(["item"]);
      navigate(-1);
    },
  });

  const handleSubmit = (item: ItemData) => {
    const itemWithoutUnusedVariants = produce(item, (draft) => {
      draft.availableVariants = item.availableVariants.filter(
        (variant) => variant.defaultVariantId != 0
      );
      draft.availableVariants.forEach(
        (variantGroup) =>
          (variantGroup.variants = variantGroup.variants.filter(
            (singleVariant) => singleVariant.selected
          ))
      );
      draft.availableOptions = item.availableOptions.filter(
        (option) => option.selected
      );
    })

    mutate(itemWithoutUnusedVariants);
  };

  return (
    <BaseLayout title={"Bearbeite Item"} outletProps={OUTLET_PROPS}>
      <ItemForm item={item!} onSubmit={handleSubmit} />
    </BaseLayout>
  );
}

export default EditItem;
