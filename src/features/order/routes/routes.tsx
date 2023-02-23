import { Route, Routes } from "react-router-dom";
import Assignments from "./asignments";
import Items from "./items";
import Overview from "./overview";
import Configurator from "./configurator";
import { Suspense } from "react";
import AssignmentControl from "./assignment-control";

function OrderRoutes() {
  return (
    <Suspense fallback="Laden...">
      <Routes>
        <Route path=":assignmentId" element={<AssignmentControl />}>
          <Route path="items">
            <Route index element={<Items />} />
            <Route path=":itemId" element={<Configurator />} />
          </Route>
          <Route path="overview" element={<Overview />} />
        </Route>
        <Route index element={<Assignments />} />
      </Routes>
    </Suspense>
  );
}

export default OrderRoutes;
