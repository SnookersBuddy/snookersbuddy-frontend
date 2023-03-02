import VariantForm from "./variant-form";
import {useCreateVariantMutation} from "../../hooks/use-create-admin-mutation";
import {queryClient} from "../../../../lib";
import {BaseLayout} from "../../../../components";

function CreateVariant() {

    const {mutate} = useCreateVariantMutation({
        onSuccess: () =>
            queryClient.invalidateQueries(["table-data"])
    })

    const handleSubmit = variant => {
        mutate(variant)
    };

    return (
        <BaseLayout title='Neue Variante'>
            <VariantForm onSubmit={handleSubmit}>
            </VariantForm>
        </BaseLayout>);
}

export default CreateVariant;