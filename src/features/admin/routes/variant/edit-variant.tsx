import VariantForm from "./variant-form";
import { useStrongParams } from "../../../../hooks/use-strong-params";
import { useVariantQuery } from "../../hooks/use-variant-query";
import { useUpdateVariantMutation } from "../../hooks/use-update-admin-mutation";
import { queryClient } from "../../../../lib";
import { BaseLayout } from "../../../../components";
import { Variant } from "../../types/table-data";
import { useNavigate } from "react-router-dom";

const OUTLET_PROPS = { maxWidth: "lg" } as const;
function EditVariant() {
  const { variantId } = useStrongParams("variantId");
  const { data: variant } = useVariantQuery(+variantId);

  const navigate = useNavigate();
  const { mutate } = useUpdateVariantMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["table-data"]);
      queryClient.invalidateQueries(["variant"]);
      navigate(-1);
    },
  });

  const handleSubmit = (variant: Variant) => {
    console.log("HÄ")
    mutate(variant);
  };

  return (
    <BaseLayout title="Bearbeite Variante" outletProps={OUTLET_PROPS}>
      <VariantForm variant={variant} onSubmit={handleSubmit} />
    </BaseLayout>
  );
}

export default EditVariant;
