import {Variant} from "../../../order/types/configuration";
import {FormProvider, useForm} from "react-hook-form";
import {Button, FormControl, Stack, TextField, Typography} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";




type VariantFormProps = {
    onSubmit: (variant: Variant) => void;
    variant?: Variant;
}

function VariantForm({variant, onSubmit}: VariantFormProps) {

    const variantValues = useForm({
        defaultValues: variant,
    });

    function updateVariant(data) {
        onSubmit(data)
    }

    return (
        <FormProvider {...variantValues}>
            <form onSubmit={variantValues.handleSubmit(updateVariant)}>
                <TextField {...variantValues.register("id")}>
                </TextField>
                <Button
                    sx={{mt: 5}}
                    size="large"
                    type="submit"
                    variant="contained"
                    endIcon={<ChevronRight/>}
                >
                    Abschicken
                </Button>
            </form>
        </FormProvider>);
}

export default VariantForm;