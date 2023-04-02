import {
    Box,
    Button,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {useFieldArray, useForm} from "react-hook-form";
import {ChevronRight, Delete} from "@mui/icons-material";
import {Variant} from "../../types/table-data";
import {useState} from "react";
import {getErrorText} from "../../../../utils/input-validation";

type VariantFormProps = {
    onSubmit: (variant: Variant) => void;
    variant?: Variant;
};

function VariantForm({variant, onSubmit}: VariantFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors},
        control
    } = useForm({
        defaultValues: variant ?? {
            variantGroup: {
                name: "",
            },
            singleVariants: [],
        },
    });

    const updateVariant = (data: Variant) => () => {
        onSubmit(data);
    };

    const {fields, append, remove} = useFieldArray({
        control,
        name: "singleVariants",
        keyName: "inputId",
    });

    const variants = fields?.map(
        ({name, id, inputId}, index) => [index, inputId] as const
    );

    const [newSingleVariantName, setNewSingleVariantName] = useState("");

    const handleAddSingleVariantClick = () => {
        append({
            name: newSingleVariantName,
        });
        setNewSingleVariantName("");
    };

    const getRemoveSingleVariantClickHandler = (index: number) => () => {
        remove(index);
    };

    return (
        <form onSubmit={handleSubmit(updateVariant)}>
            <Stack spacing={2}>
                <FormControl>
                    <TextField
                        label="Name" {...register("variantGroup.name", {required: true})}
                        error={!!errors.variantGroup}
                        helperText={getErrorText(errors.variantGroup)}
                    />
                </FormControl>
                <Typography>Existierende Ausprägungen:</Typography>
                {variants.map(([index, inputId]) => (
                    <FormControl key={inputId}>
                        <TextField
                            label="Name"
                            error = {!!errors.singleVariants?.[index]}
                            helperText={getErrorText(errors.singleVariants?.[index])}
                            {...register(`singleVariants.${index}.name`, {required: true})}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={getRemoveSingleVariantClickHandler(index)}
                                            edge="end"
                                        >
                                            <Delete/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                ))}
                <Divider/>
                <Box display="flex">
                    <FormControl fullWidth>
                        <TextField
                            label="Neue Ausprägung hinzufügen..."
                            value={newSingleVariantName}
                            onChange={(event) => setNewSingleVariantName(event.target.value)}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    handleAddSingleVariantClick();
                                    event.preventDefault();
                                }
                            }}
                        />
                    </FormControl>
                    <Button
                        sx={{ml: 2}}
                        variant="contained"
                        onClick={handleAddSingleVariantClick}
                    >
                        OK
                    </Button>
                </Box>
                <Button
                    sx={{mt: 5}}
                    size="large"
                    type="submit"
                    variant="contained"
                    endIcon={<ChevronRight/>}
                >
                    Abschicken
                </Button>
            </Stack>
        </form>
    );
}

export default VariantForm;
