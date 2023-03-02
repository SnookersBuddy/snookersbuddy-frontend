import VariantForm from "./variant-form";
import {useStrongParams} from "../../../../hooks/use-strong-params";
import {getVariantData} from "../../hooks/use-variant-query";
import {useUpdateVariantMutation} from "../../hooks/use-update-admin-mutation";
import {queryClient} from "../../../../lib";
import {BaseLayout} from "../../../../components";

function EditVariant() {

    const variantId = useStrongParams("variantId").variantId;
    const variant = getVariantData(variantId).data.variantDTO;
    console.log(variant)

    const {mutate} = useUpdateVariantMutation({
        onSuccess: () => queryClient.invalidateQueries(["table-data"])
    })

    const handleSubmit = variant => {
        mutate(variant)
    };

    return (
        <BaseLayout title='Bearbeite Variante'>
            <VariantForm variant={variant} onSubmit={handleSubmit}>
            </VariantForm>
        </BaseLayout>)

}

export default EditVariant;