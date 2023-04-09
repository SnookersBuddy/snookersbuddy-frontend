import AssignmentForm from "./assignment-form";
import { useStrongParams } from "../../../../hooks/use-strong-params";
import { useAssignmentQuery } from "../../hooks/use-assignment-query";
import { BaseLayout } from "../../../../components";
import { useUpdateAssignmentMutation } from "../../hooks/use-update-admin-mutation";
import { queryClient } from "../../../../lib";
import { Assignment } from "../../../order/types/assignment";
import { useNavigate } from "react-router-dom";

const OUTLET_PROPS = { maxWidth: "lg" } as const;

function EditAssignment() {
  const { assignmentId } = useStrongParams("assignmentId");
  const { data: assignment } = useAssignmentQuery(parseInt(assignmentId, 10));

  const navigate = useNavigate();
  const { mutate } = useUpdateAssignmentMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["table-data"]);
      queryClient.invalidateQueries(["assignment"]);
      navigate(-1);
    },
  });

  const handleSubmit = (assignment: Assignment) => {
    mutate(assignment);
  };

  return (
    <BaseLayout title={"Bearbeite Tisch"} outletProps={OUTLET_PROPS}>
      <AssignmentForm assignment={assignment} onSubmit={handleSubmit} />
    </BaseLayout>
  );
}

export default EditAssignment;
