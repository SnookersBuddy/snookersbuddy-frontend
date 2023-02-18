import OptionForm from "./option-form";
import {getOptionData} from "../../hooks/use-option-query";
import {useStrongParams} from "../../../../hooks/use-strong-params";
import {BaseLayout} from "../../../../components";

function CreateOption() {

    const optionId = useStrongParams("optionId").optionId;
    const option = getOptionData(optionId).data.optionDTO;


    return (
        <BaseLayout title='Bearbeite Option'>
            <OptionForm option={option} isExisting={true}>
                test
            </OptionForm>
        </BaseLayout>
    );
}

export default CreateOption;