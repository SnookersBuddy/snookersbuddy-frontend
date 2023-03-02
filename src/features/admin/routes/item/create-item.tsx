import ItemForm from "./item-form";
import {useCreateItemMutation} from "../../hooks/use-create-admin-mutation";
import {queryClient} from "../../../../lib";

function CreateItem() {

    const {mutate} = useCreateItemMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(["table-data"]);
        }
    })

    const handleSubmit = item => {
        mutate(item)
    }

    return (
        <ItemForm onSubmit={handleSubmit}>

        </ItemForm>)
}

export default ItemForm;