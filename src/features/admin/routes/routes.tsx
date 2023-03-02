import {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Admin from "./admin";
import CreateOption from "./option/create-option";
import EditOption from "./option/edit-option";
import EditAssignment from "./assignment/edit-assignment";
import CreateAssignment from "./assignment/create-assignment";
import EditItem from "./item/edit-item";
import EditVariant from "./variant/edit-variant";
import CreateVariant from "./variant/create-variant";
import CreateItem from "./item/create-item";

function AdminRoutes() {
    return (
        <Suspense fallback="Laden...">
            <Routes>
                <Route path="option/:optionId" element={<EditOption/>}/>
                <Route path="option/new" element={<CreateOption/>}/>

                <Route path="assignment/:assignmentId" element={<EditAssignment/>}/>
                <Route path="assignment/new" element={<CreateAssignment/>}/>

                <Route path="variant/:variantId" element={<EditVariant/>}/>
                <Route path="variant/new" element={<CreateVariant/>}/>

                <Route path="item/:itemId" element={<EditItem/>}/>
                <Route path="item/new" element={<CreateItem/>}/>

                <Route index element={<Admin/>}/>
            </Routes>
        </Suspense>
    );
}

export default AdminRoutes;