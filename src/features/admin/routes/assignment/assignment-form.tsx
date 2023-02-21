import {Assignment} from "../../../order/types/assignment";
import {FormProvider, useForm} from "react-hook-form";
import {useCreateAssignmentMutation} from "../../hooks/use-create-admin-mutation";
import {Button, Checkbox, FormControl, Stack, TextField, Typography} from "@mui/material";

import {ChevronRight} from "@mui/icons-material";


type AssignmentProps = {
    assignment: Assignment;
};

function AssignmentForm({assignment}: AssignmentProps) {

    const assignmentValues = useForm({
        defaultValues: assignment,
    });

    const {mutate} = useCreateAssignmentMutation(assignment);

    function updateAssignment(data) {
        console.log(data);
        mutate(assignment)
    }

    return (
        <FormProvider>
            <form onSubmit={assignmentValues.handleSubmit(updateAssignment)}>
                <Stack spacing={2}>
                    <Typography textTransform="uppercase">Name:</Typography>
                    <FormControl key={assignment.displayName}>
                        <TextField {...assignmentValues.register("displayName")}
                                   defaultValue={assignmentValues.displayName}>
                        </TextField>
                    </FormControl>
                    <Typography textTransform="uppercase">Abkürzung:</Typography>
                    <FormControl key={assignment.abbreviation}>
                        <TextField {...assignmentValues.register("abbreviation")}
                                   defaultValue={assignmentValues.abbreviation}>
                        </TextField>
                    </FormControl>
                    <Typography textTransform="uppercase">ID:</Typography>
                    <FormControl key={assignment.id}>
                        <TextField {...assignmentValues.register("id")} defaultValue={assignmentValues.id}>
                        </TextField>
                    </FormControl>
                    <Typography textTransform="uppercase">Stammkunde:</Typography>
                    <FormControl key={assignment.custom}>
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