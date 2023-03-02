import {FormProvider, useForm} from "react-hook-form";
import {Button, FormControl, Stack, TextField, Typography} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";
import {Option} from "../../types/table-data";

type OptionProps = {
    onSubmit: (option: Option) => void;
    option?: Option;
};

function OptionForm({option, onSubmit}: OptionProps) {

    const optionValues = useForm({
        defaultValues: option,

    });

    function updateOption(data) {
        onSubmit(data);
    }

    return (
        <FormProvider {...optionValues}>
            <form onSubmit={optionValues.handleSubmit(updateOption)}>
                <Stack spacing={2}>
                    <Typography textTransform="uppercase">Name:</Typography>
                    <FormControl>
                        <TextField {...optionValues.register("name")}>
                        </TextField>
                    </FormControl>
                    <Typography textTransform="uppercase">ID:</Typography>
                    <FormControl>
                        <TextField {...optionValues.register("id")}>
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