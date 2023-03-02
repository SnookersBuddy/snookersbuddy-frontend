import AssignmentForm from "./assignment-form";
import {BaseLayout} from "../../../../components";
import {useCreateAssignmentMutation} from "../../hooks/use-create-admin-mutation";
import {queryClient} from "../../../../lib";

function CreateAssignment() {

    const {mutate} = useCreateAssignmentMutation({
        onSuccess: () => {
            queryClient.invalidateQueries([['table-data']])
        }
    })

    const handleSubmit = assignment => {
        mutate(assignment)
    }

    return (
        <BaseLayout title={"Neuer Tisch"}>
            <AssignmentForm onSubmit={handleSubmit}/>
        </BaseLayout>)
}

export default CreateAssignment;