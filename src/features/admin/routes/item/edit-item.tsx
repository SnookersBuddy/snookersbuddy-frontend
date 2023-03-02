import ItemForm from "./item-form";
import {useStrongParams} from "../../../../hooks/use-strong-params";
import {BaseLayout} from "../../../../components";
import {getItemData} from "../../hooks/use-item-query";
import {useUpdateItemMutation} from "../../hooks/use-update-admin-mutation";
import {queryClient} from "../../../../lib";

function EditItem() {

    const itemId = useStrongParams("itemId").itemId;
    const item = getItemData(itemId).data;

    const handleSubmit = item => {
        mutate(item)
    }

    const {mutate} = useUpdateItemMutation({onSuccess: () => queryClient.invalidateQueries(["table-data"])})


    return (
        <BaseLayout title={"Bearbeite Item"}>
            <ItemForm item={item} onSubmit={handleSubmit}>

            </ItemForm>
        </BaseLayout>)

}

export default EditItem;