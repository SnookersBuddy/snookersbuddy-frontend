import { Route } from "react-router-dom";
import Assignments from "./assignments";
import Items from "./items";
import Overview from "./overview";
import Configurator from "./configurator";
import { Suspense } from "react";
import AssignmentControl from "./assignment-control";
import ErrorAwareRoutes from "../../../components/error-aware-routes";

function OrderRoutes() {
  return (
    <Suspense fallback="Laden...">
      <ErrorAwareRoutes>
        <Route path=":assignmentId" element={<AssignmentControl />}>
          <Route path="items">
            <Route index element={<Items />} />
            <Route path=":itemId" element={<Configurator />} />
          </Route>
          <Route path="overview" element={<Overview />} />
        </Route>
        <Route index element={<Assignments />} />
      </ErrorAwareRoutes>
    </Suspense>
  );
}

export default OrderRoutes;
