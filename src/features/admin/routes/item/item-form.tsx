import {Button, FormControl, Stack, TextField, Typography} from "@mui/material";
import {ItemData} from "../../types/table-data";
import {Controller, FormProvider, useForm} from "react-hook-form";
import ItemCategoriesDropdown from "./item-categories-dropdown";
import {Item} from "../../../order/types/item";
import {ChevronRight} from "@mui/icons-material";



type ItemProps = {
    item?: ItemData;
    onSubmit: (item: Item) => void;
};

function ItemForm({item, onSubmit}: ItemProps) {

    const itemValues = useForm({
        defaultValues: item,
    });

    function updateItem(data) {
        onSubmit(data)
    }

    return (
        <FormProvider {...itemValues}>
            <form onSubmit={itemValues.handleSubmit(updateItem)}>
                <Stack spacing={2}>
                    <Typography textTransform="uppercase">Name:</Typography>
                    <FormControl>
                        <TextField {...itemValues.register("itemName")}>
                        </TextField>
                    </FormControl>
                    <Typography textTransform="uppercase">Abkürzung:</Typography>
                    <FormControl>
                        <TextField {...itemValues.register("abbreviation")}>
                        </TextField>
                    </FormControl>
                    <Typography textTransform="uppercase">Kategorie:</Typography>
                    <FormControl>
                        <Controller
                            name="categoryId"
                            control={itemValues.control}
                            rules={{required: true}}
                            render={({field}) => <ItemCategoriesDropdown
                                categories={item.availableCategories}
                                categoryId={field.value}
                                onCategoryIdChange={field.onChange}
                            />}
                        />

                        <Button
                            sx={{mt: 5}}
                            size="large"
                            type="submit"
                            variant="contained"
                            endIcon={<ChevronRight/>}
                        >
                            Abschicken
                        </Button> </FormControl>
                </Stack>
            </form>
        </FormProvider>
    );
}

export default ItemForm;