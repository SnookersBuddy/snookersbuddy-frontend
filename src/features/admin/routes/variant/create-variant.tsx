import VariantForm from "./variant-form";
import { useCreateVariantMutation } from "../../hooks/use-create-admin-mutation";
import { queryClient } from "../../../../lib";
import { BaseLayout } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { Variant } from "../../types/table-data";

function CreateVariant() {
  const navigate = useNavigate();
  const { mutate } = useCreateVariantMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["table-data"]);
      navigate(-1);
    },
  });

  const handleSubmit = (variant: Variant) => {
    mutate(variant);
  };

  return (
    <BaseLayout title="Neue Variante">
      <VariantForm onSubmit={handleSubmit}></VariantForm>
    </BaseLayout>
  );
}

export default CreateVariant;