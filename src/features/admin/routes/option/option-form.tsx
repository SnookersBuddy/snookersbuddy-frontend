import {useForm} from "react-hook-form";
import {Button, FormControl, Stack, TextField} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";
import {Option} from "../../types/table-data";
import {getErrorText} from "../../../../utils/input-validation";

type OptionProps = {
    onSubmit: (option: Option) => void;
    option?: Option;
};

function OptionForm({option, onSubmit}: OptionProps) {
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm({
        defaultValues: option,
    });

    const updateOption = (data: Option) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(updateOption)}>
            <Stack spacing={2}>
                <FormControl>
                    <TextField
                        label="Name"
                        error={!!errors.name}
                        helperText={getErrorText(errors.name)}
                        {...register("name", {required: true})}
                    />
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
    );
}

export default OptionForm;
