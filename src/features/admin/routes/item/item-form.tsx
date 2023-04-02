import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {ItemData} from "../../types/table-data";
import {Controller, FormProvider, useFieldArray, useForm,} from "react-hook-form";
import {ChevronRight} from "@mui/icons-material";
import ItemVariantForm from "./item-variant-form";
import {TransformController} from "../../../../components/transform-controller";
import {ChangeEvent} from "react";
import {getErrorText} from "../../../../utils/input-validation";

type ItemProps = {
    item: ItemData;
    onSubmit: (item: ItemData) => void;
};

function ItemForm({item, onSubmit}: ItemProps) {
    const formValues = useForm({
        defaultValues: item,

    });
    const {handleSubmit, register, control, formState: {errors}} = formValues;

    const updateItem = (data: ItemData) => {
        onSubmit(data);
    };

    const {fields} = useFieldArray({
        control,
        name: "availableVariants",
        keyName: "variantControlId",
    });

    const {fields: optionFields} = useFieldArray({
        control,
        name: "availableOptions",
        keyName: "optionControlId",
    });

    return (
        <FormProvider {...formValues}>
            <form onSubmit={handleSubmit(updateItem)}>
                <Stack spacing={2}>
                    <FormControl>
                        <TextField
                            label="Name"
                            error={errors.itemName}
                            helperText={getErrorText(errors.itemName)}
                            {...register("itemName", {required: true})}/>
                    </FormControl>
                    <FormControl>
                        <TextField
                            label="Abkürzung"
                            error={errors.abbreviation}
                            helperText={getErrorText(errors.abbreviation)}
                            {...register("abbreviation", {required: true})}
                        />
                    </FormControl>
                    <FormControl
                        error={errors.categoryId}
                    >
                        <InputLabel id="item-category-label">Kategorie</InputLabel>
                        <Controller
                            name="categoryId"
                            control={control}
                            rules={{
                                validate: {
                                    selected: v => v != 0,
                                }
                            }}
                            helperText={getErrorText(errors.categoryId)}
                            render={({field}) => (
                                <Select
                                    label="Kategorie"
                                    labelId="item-category-label"
                                    {...field}
                                >
                                    {item.availableCategories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>
                    <Box>
                        <Typography variant="h4">Varianten</Typography>
                        <Stack mt={2} spacing={4}>
                            {fields.map((variant, index) => (
                                <ItemVariantForm
                                    key={variant.variantControlId}
                                    variant={variant}
                                    index={index}
                                />
                            ))}
                        </Stack>
                    </Box>
                    <Box>
                        <Typography variant="h4">Optionen</Typography>
                        <Stack mt={2}>
                            {optionFields.map((option, index) => (
                                <Box
                                    key={option.optionControlId}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Controller
                                        name={`availableOptions.${index}.selected`}
                                        control={control}
                                        render={({field}) => (
                                            <Checkbox checked={field.value} {...field} />
                                        )}
                                    />
                                    <Typography>{option.name}</Typography>
                                    {/*TODO extract this transform object to a constant*/}
                                    <TransformController
                                        name={`availableOptions.${index}.defaultValue`}
                                        control={control}
                                        transform={{
                                            toInput: (value: boolean) => value.toString(),
                                            toOutput: (event: unknown) => {
                                                const inputEvent =
                                                    event as ChangeEvent<HTMLInputElement>;
                                                return inputEvent.target.value === "true";
                                            },
                                        }}
                                        render={({field}) => (
                                            <RadioGroup {...field} row>
                                                <FormControlLabel
                                                    value="true"
                                                    control={<Radio/>}
                                                    label="Ja"
                                                />
                                                <FormControlLabel
                                                    value="false"
                                                    control={<Radio/>}
                                                    label="Nein"
                                                />
                                            </RadioGroup>
                                        )}
                                    />
                                </Box>
                            ))}
                        </Stack>
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
        </FormProvider>
    );
}

export default ItemForm;
