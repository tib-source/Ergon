import Sidebar from "../components/sidebar.tsx";
import {Outlet} from "react-router-dom";

const RootRoute = () => {
    return (
        <>
        <Sidebar/>
        <Outlet/>
        </>
    )
}


export default RootRoute;