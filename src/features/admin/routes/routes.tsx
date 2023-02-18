import {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Admin from "./admin";
import AssignmentForm from "./assignment/assignment-form";
import ItemForm from "./item/item-form";
import VariantForm from "./variant/variant-form";
import CreateOption from "./option/create-option";
import EditOption from "./option/edit-option";

function AdminRoutes() {
    return (
        <Suspense fallback="Laden...">
            <Routes>
                <Route path="option/:optionId" element={<CreateOption/>}/>
                <Route path="option/new" element={<EditOption/>}/>
                <Route path="assignment" element={<AssignmentForm/>}/>
                <Route path="item" element={<ItemForm/>}/>
                <Route path="variant" element={<VariantForm/>}/>
                <Route index element={<Admin/>}/>
            </Routes>
        </Suspense>
    );
}

export default AdminRoutes;