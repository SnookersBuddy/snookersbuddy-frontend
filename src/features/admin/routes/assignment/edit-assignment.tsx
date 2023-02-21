import AssignmentForm from "./assignment-form";
import {useStrongParams} from "../../../../hooks/use-strong-params";
import {getAssignmentData} from "../../hooks/use-assignment-query";
import {BaseLayout} from "../../../../components";


function EditAssignment() {

    const assignmentId = useStrongParams("assignmentId").assignmentId;
    const assignment = getAssignmentData(assignmentId).data.assignmentDTO;
    console.log(assignment)
    return (
        <BaseLayout title={"Bearbeite Tisch"}>
            <AssignmentForm assignment={assignment}>

            </AssignmentForm>
        </BaseLayout>)
}

export default EditAssignment;