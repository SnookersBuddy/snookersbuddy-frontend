import OptionForm from "./option-form";
import {BaseLayout} from "../../../../components";
import {useCreateOptionMutation} from "../../hooks/use-create-admin-mutation";
import {queryClient} from "../../../../lib";
import {useUpdateOptionMutation} from "../../hooks/use-update-admin-mutation";

function CreateOption() {

    const {mutate} = useCreateOptionMutation({onSuccess: () => queryClient.invalidateQueries(["table-data"])})

    const handleSubmit = option => {
        mutate(option)
    };

    return (
        <BaseLayout title='Neue Option'>
            <OptionForm onSubmit={handleSubmit}>
                test
            </OptionForm>
        </BaseLayout>
    );
}

export default CreateOption;