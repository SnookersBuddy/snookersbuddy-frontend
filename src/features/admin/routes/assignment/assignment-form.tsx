import {Assignment} from "../../../order/types/assignment";
import {FormProvider, useForm} from "react-hook-form";
import {Button, Checkbox, FormControl, Stack, TextField, Typography} from "@mui/material";

import {ChevronRight} from "@mui/icons-material";


type AssignmentProps = {
    onSubmit: (assignment: Assignment) => void;
    assignment?: Assignment;
};

function AssignmentForm({assignment, onSubmit}: AssignmentProps) {

    const assignmentValues = useForm({
        defaultValues: assignment,
    });

    function updateAssignment(data){
        onSubmit(data)
    }

    return (
        <FormProvider>
            <form onSubmit={assignmentValues.handleSubmit(updateAssignment)}>
                <Stack spacing={2}>
                    <Typography textTransform="uppercase">Name:</Typography>
                    <FormControl>
                        <TextField {...assignmentValues.register("assignmentName")}>
                        </TextField>
                    </FormControl>
                    <Typography textTransform="uppercase">Abkürzung:</Typography>
                    <FormControl>
                        <TextField {...assignmentValues.register("abbreviation")}>
                        </TextField>
                    </FormControl>
                    <Typography textTransform="uppercase">ID:</Typography>
                    <FormControl>
                        <TextField {...assignmentValues.register("id")}>
                        </TextField>
                    </FormControl>
                    <Typography textTransform="uppercase">Stammkunde:</Typography>
                    <FormControl>
                        <Checkbox {...assignmentValues.register("custom")} checked={assignmentValues.custom}/>
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
        </FormProvider>)
}

export default AssignmentForm;