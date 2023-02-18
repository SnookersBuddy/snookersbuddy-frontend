import {BaseLayout} from "../../../../components";
import OptionForm from "./option-form";
import {Option} from "../../types/table-data";

function EditOption(){

    const option : Option = {
        id: 0,
        name: ""
    };

    return(
        <BaseLayout title={"Neue Option"}>
            <OptionForm option={option}>

            </OptionForm>
        </BaseLayout>
    )
}

export default EditOption;