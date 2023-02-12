import {Button, ButtonProps, Stack} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {ElementType} from "react";
import {BaseLayout} from "../../../components";

function LandingButton<C extends ElementType>(
    props: ButtonProps<C, { component?: C }>
) {
    return <Button variant="outlined" sx={{py: 2}} {...props} />;
}

function Landing() {
    return (
        <BaseLayout title="hallo">
            <Stack mt={4} spacing={2}>
                <LandingButton component={RouterLink} to="/assignments">
                    Bestellung aufnehmen
                </LandingButton>
                <LandingButton component={RouterLink} to="/round-overview">
                    Bestellübersicht
                </LandingButton>
                <LandingButton disabled>Bezahlübersicht</LandingButton>
                <LandingButton component={RouterLink} to="/admin">
                    Administrationsbereich
                </LandingButton>
            </Stack>
        </BaseLayout>
    );
}

export default Landing;
