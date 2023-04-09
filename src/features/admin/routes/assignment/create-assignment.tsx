import AssignmentForm from "./assignment-form";
import { BaseLayout } from "../../../../components";
import { useCreateAssignmentMutation } from "../../hooks/use-create-admin-mutation";
import { queryClient } from "../../../../lib";
import { Assignment } from "../../../order/types/assignment";
import { useNavigate } from "react-router-dom";

const OUTLET_PROPS = { maxWidth: "lg" } as const;

function CreateAssignment() {
  const navigate = useNavigate();
  const { mutate } = useCreateAssignmentMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["table-data"]);
      navigate(-1);
    },
  });

  const handleSubmit = (assignment: Assignment) => {
    mutate(assignment);
  };

  return (
    <BaseLayout title={"Neuer Tisch"} outletProps={OUTLET_PROPS}>
      <AssignmentForm onSubmit={handleSubmit} />
    </BaseLayout>
  );
}

export default CreateAssignment;
