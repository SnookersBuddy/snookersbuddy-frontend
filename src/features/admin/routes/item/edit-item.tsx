import ItemForm from "./item-form";
import {useStrongParams} from "../../../../hooks/use-strong-params";
import {BaseLayout} from "../../../../components";
import {useCreateItemDataQuery} from "../../hooks/use-create-item-data-query";
import {useUpdateItemMutation} from "../../hooks/use-update-admin-mutation";
import {queryClient} from "../../../../lib";
import {ItemData} from "../../types/table-data";
import { useNavigate } from "react-router-dom";

function EditItem() {

    const navigate = useNavigate();
    const {itemId} = useStrongParams("itemId");
    const {data: item} = useCreateItemDataQuery(parseInt(itemId, 10));

    const handleSubmit = (item: ItemData) => {
        function removeUnusedVariants(item: ItemData) {
            // remove unused variant groups and unused singleVariants
            item.availableVariants = item.availableVariants.filter(variant => variant.defaultVariantId != 0);
            item.availableVariants.forEach(variantGroup => variantGroup.variants = variantGroup.variants.filter(singleVariant => singleVariant.selected))
        }

        function removeUnusedOptions(item: ItemData) {
            item.availableOptions = item.availableOptions.filter(option => option.selected)
        }

        removeUnusedVariants(item);
        removeUnusedOptions(item);
        mutate(item, parseInt(itemId, 10));
    };

    const {mutate} = useUpdateItemMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(["table-data"])
            navigate(-1);
        },
    });

    return (
        <BaseLayout title={"Bearbeite Item"}>
            <ItemForm item={item!} onSubmit={handleSubmit}/>
        </BaseLayout>
    );
}

export default EditItem;
