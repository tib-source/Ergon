import profilePic from "../assets/react.svg"
import "./navigation.css"
import {useState, useRef} from "react";
import {NavLink} from "react-router-dom";

type UserObject = {
    name: string,
    profilePic: string,
    isAdmin: boolean,
}

const Sidebar = () => {
    const [user, setUser] = useState<UserObject>({
        name: "Tibebe Demissie",
        profilePic: profilePic,
        isAdmin: false,
    })
    const sideBarHtml = useRef<HTMLDivElement>(null)
    const handleHamburger = () => {
        sideBarHtml.current?.classList.toggle("navigation__hidden")
    }
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
            <div className="navigation" ref={sideBarHtml}>
                <div onClick={handleHamburger} className='navigation__hamburger'>
                    X
                </div>
                <div className=" navigation__profile">
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