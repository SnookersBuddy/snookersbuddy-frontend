import AssignmentForm from "./assignment-form";
import {BaseLayout} from "../../../../components";
import {Assignment} from "../../../order/types/assignment";

function CreateAssignment() {

    const assignment : Assignment = {
        id : 0,
        abbreviation: "",
        custom: false,
        assignmentName: "",
    };

    return (
        <BaseLayout title={"Neuer Tisch"}>
            <AssignmentForm assignment={assignment}>

            </AssignmentForm>
        </BaseLayout>)
}

export default CreateAssignment;