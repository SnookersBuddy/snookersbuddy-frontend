import { BaseLayout } from "../../../../components";
import OptionForm from "./option-form";
import { queryClient } from "../../../../lib";
import { useStrongParams } from "../../../../hooks/use-strong-params";
import { useOptionQuery } from "../../hooks/use-option-query";
import { useUpdateOptionMutation } from "../../hooks/use-update-admin-mutation";
import { Option } from "../../types/table-data";
import { useNavigate } from "react-router-dom";

const OUTLET_PROPS = { maxWidth: "lg" } as const;

function EditOption() {
  const { optionId } = useStrongParams("optionId");
  const { data: option } = useOptionQuery(parseInt(optionId, 10));

  const navigate = useNavigate();
  const { mutate } = useUpdateOptionMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["table-data"]);
      navigate(-1);
    },
  });

  const handleSubmit = (option: Option) => {
    mutate(option);
  };

  return (
    <BaseLayout title={"Bearbeite Option"} outletProps={OUTLET_PROPS}>
      <OptionForm option={option} onSubmit={handleSubmit} />
    </BaseLayout>
  );
}

export default EditOption;
