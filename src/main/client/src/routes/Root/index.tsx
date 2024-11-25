import Sidebar from "../../components/Sidebar";
import {Outlet} from "react-router-dom";

const RootRoute = () => {
    return (
        <div className="home">
        <Sidebar/>
        <div className="home__container">
            <Outlet/>
        </div>
        </div>
    )
}


export default RootRoute;