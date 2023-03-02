import {BaseLayout} from "../../../../components";
import OptionForm from "./option-form";
import {useCreateOptionMutation} from "../../hooks/use-create-admin-mutation";
import {queryClient} from "../../../../lib";
import {useStrongParams} from "../../../../hooks/use-strong-params";
import {getOptionData} from "../../hooks/use-option-query";
import {useUpdateOptionMutation} from "../../hooks/use-update-admin-mutation";

function EditOption() {

    const optionId = useStrongParams("optionId").optionId;
    const option = getOptionData(optionId).data.optionDTO;

    const {mutate} = useUpdateOptionMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(["table-data"]);
        }
    })

    const handleSubmit = option => {
        mutate(option)
    }

    return (
        <BaseLayout title={"Bearbeite Option"}>
            <OptionForm option={option} isExisting={true} onSubmit={handleSubmit}/>
        </BaseLayout>
    )
}

export default EditOption;