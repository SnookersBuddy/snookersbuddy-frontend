import { Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { BaseLayout } from "../../../components";
import LandingButton from "./landing-button";

function Landing() {
    return (
        <BaseLayout title="Anwendungsauswahl">
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
