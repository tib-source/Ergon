import profilePic from "../assets/react.svg"
import "./styling/navigation.css"
import {useState, useRef, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {Hamburger} from "./Hamburger.tsx";

type UserObject = {
    name: string,
    profilePic: string,
    isAdmin: boolean,
}

const Sidebar = () => {
    const [user, setUser] = useState<UserObject>({isAdmin: false, name: "", profilePic: ""})
    const [open, setOpen] = useState<boolean>(true)

    useEffect(()=>{
        setUser({
            name: "Tibebe Demissie",
            profilePic: profilePic,
            isAdmin: false,
        })

    },[])
    const sideBarHtml = useRef<HTMLDivElement>(null)
    const renderAdminPages = (isAdmin: Boolean) => {
        if (isAdmin){
            return <>
                <NavLink to={"/report"}>Report</NavLink>
                <NavLink to={"/approvals"}>Approvals</NavLink>
                <NavLink to={"/users"}>Users</NavLink>
            </>
        }

    }
    return (
        <>
            <div className={
                open ? "navigation" : "navigation navigation__hidden"
            } ref={sideBarHtml}>
                <Hamburger open={open} setOpen={setOpen} />
                <div className="navigation__profile">
                    <img src={user.profilePic} className="navigation__pic" alt="Profile Picture"/>
                    {user.name}
                </div>

                <div className="navigation__pages">
                    <NavLink to={"/dashboard"}>Dashboard</NavLink>
                    <NavLink to={"/booking_history"}>Bookings</NavLink>
                    <NavLink to={"/notifications"}>Notifications</NavLink>
                    { renderAdminPages(user.isAdmin) }
                    <NavLink to={"/profile"}>Account</NavLink>
                </div>

                <button> Logout</button>
            </div>

        </>
    )
}

export default Sidebar