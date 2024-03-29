import OptionForm from "./option-form";
import { BaseLayout } from "../../../../components";
import { useCreateOptionMutation } from "../../hooks/use-create-admin-mutation";
import { queryClient } from "../../../../lib";
import { Option } from "../../types/table-data";
import { useNavigate } from "react-router-dom";

const OUTLET_PROPS = { maxWidth: "lg" } as const;

function CreateOption() {
  const navigate = useNavigate();
  const { mutate } = useCreateOptionMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["table-data"]);
      navigate(-1);
    },
  });

  const handleSubmit = (option: Option) => {
    mutate(option);
  };

  return (
    <BaseLayout title="Neue Option" outletProps={OUTLET_PROPS}>
      <OptionForm onSubmit={handleSubmit} />
    </BaseLayout>
  );
}

export default CreateOption;
