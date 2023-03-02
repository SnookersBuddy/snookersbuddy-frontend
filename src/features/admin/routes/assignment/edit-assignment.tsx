import AssignmentForm from "./assignment-form";
import {useStrongParams} from "../../../../hooks/use-strong-params";
import {getAssignmentData} from "../../hooks/use-assignment-query";
import {BaseLayout} from "../../../../components";
import {useUpdateAssignmentMutation} from "../../hooks/use-update-admin-mutation";
import {queryClient} from "../../../../lib";


function EditAssignment() {

    const assignmentId = useStrongParams("assignmentId").assignmentId;
    const assignment = getAssignmentData(assignmentId).data.assignmentDTO;

    const {mutate} = useUpdateAssignmentMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(["table-data"]);
        },
    })

    const handleSubmit = assignment => {
        mutate(assignment)
    };

    return (
        <BaseLayout title={"Bearbeite Tisch"}>
            <AssignmentForm assignment={assignment} onSubmit={handleSubmit}>

            </AssignmentForm>
        </BaseLayout>)
}

export default EditAssignment;