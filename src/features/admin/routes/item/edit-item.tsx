import ItemForm from "./item-form";
import { useStrongParams } from "../../../../hooks/use-strong-params";
import { BaseLayout } from "../../../../components";
import { useCreateItemDataQuery } from "../../hooks/use-create-item-data-query";
import { useUpdateItemMutation } from "../../hooks/use-update-admin-mutation";
import { queryClient } from "../../../../lib";
import { ItemData } from "../../types/table-data";

function EditItem() {
  // TODO: fetch existing data
  const { itemId } = useStrongParams("itemId");
  const { data: item } = useCreateItemDataQuery(parseInt(itemId, 10));

  const handleSubmit = (item: ItemData) => {
    console.log(itemId)
    console.log(parseInt(itemId, 10))
    mutate(item, parseInt(itemId, 10));
  };

  const { mutate } = useUpdateItemMutation({
    onSuccess: () => queryClient.invalidateQueries(["table-data"]),
  });

  return (
    <BaseLayout title={"Bearbeite Item"}>
      <ItemForm item={item!} onSubmit={handleSubmit} />
    </BaseLayout>
  );
}

export default EditItem;
