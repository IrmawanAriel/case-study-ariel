import { createBrowserRouter } from "react-router-dom";
import Dashboard from './pages/Dashboard.js';
import CreateEmployeeForm from "./pages/Create.js";
import Index from './pages/index';
import Detailpage from "./pages/Detailpage.js";
import EditEmployeeForm from "./pages/Edit.js";

function Error() {
    return <div>Error</div>
}

function NotFound() {
    return <div>Not Found</div>
}

const RouterWithChildren = createBrowserRouter([{
    path: '/',
    element: <Index/>,
    errorElement: <Error/>,
    children: [
    {
        path: 'home',
        element: <Dashboard/>
    },
    {
        path: 'create',
        element: <CreateEmployeeForm/>
    },
    {
        path: 'details/:id',
        element: <Detailpage/>
    },
    {
        path: 'edit/:id',
        element: <EditEmployeeForm/>
    },
    {
        path:"*", 
        element: <NotFound/>
    },{},{},]
},{
    path: '/create',
    element: <CreateEmployeeForm/>
},])

export default RouterWithChildren;