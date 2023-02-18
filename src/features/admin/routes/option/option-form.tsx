import {FormProvider, useForm} from "react-hook-form";
import {Button, FormControl, Stack, TextField, Typography} from "@mui/material";
import {useUpdateOptionMutation} from "../../hooks/use-update-admin-mutation";
import {ChevronRight} from "@mui/icons-material";
import {Option} from "../../types/table-data";
import {useCreateOptionMutation} from "../../hooks/use-create-admin-mutation";

type OptionProps = {
    option: Option;
};

function OptionForm({option}: OptionProps) {

    const {mutate} = useCreateOptionMutation(option);
    const {mutate2} = useUpdateOptionMutation(option);

    const optionValues = useForm({
        defaultValues: option,
    });

    function updateOption(data) {

        mutate(option)
        mutate2(option)
    }

    return (
        <FormProvider {...optionValues}>
            <form onSubmit={optionValues.handleSubmit(updateOption)}>
                <Stack spacing={2}>
                    <Typography textTransform="uppercase">Name:</Typography>
                    <FormControl key={option.name}>
                        <TextField {...optionValues.register("name")} defaultValue={optionValues.name}>
                        </TextField>
                    </FormControl>
                    <Typography textTransform="uppercase">ID:</Typography>
                    <FormControl key={option.id}>
                        <TextField {...optionValues.register("id")} defaultValue={optionValues.name}>
                        </TextField>
                    </FormControl>
                </Stack>
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
        </FormProvider>
    );
}

export default OptionForm;