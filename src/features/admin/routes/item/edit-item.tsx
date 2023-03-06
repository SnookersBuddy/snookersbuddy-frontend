import ItemForm from "./item-form";
import { useStrongParams } from "../../../../hooks/use-strong-params";
import { BaseLayout } from "../../../../components";
import { useItemQuery } from "../../hooks/use-item-query";
import { useUpdateItemMutation } from "../../hooks/use-update-admin-mutation";
import { queryClient } from "../../../../lib";
import { Item } from "../../../order/types/item";

function EditItem() {
  const { itemId } = useStrongParams("itemId");
  const { data: item } = useItemQuery(itemId);

  const handleSubmit = (item: Item) => {
    mutate(item);
  };

  const { mutate } = useUpdateItemMutation({
    onSuccess: () => queryClient.invalidateQueries(["table-data"]),
  });

  return (
    <BaseLayout title={"Bearbeite Item"}>
      <ItemForm item={item} onSubmit={handleSubmit}></ItemForm>
    </BaseLayout>
  );
}

export default EditItem;