import profilePic from "../assets/react.svg"
import "./navigation.css"
import {useState, useRef} from "react";
const Sidebar = () => {
    const [closed, setClosed] = useState<boolean>(false)
    const sideBarHtml = useRef<HTMLDivElement>(null)
    const handleHamburger = () => {
        setClosed(!closed)
        sideBarHtml.current?.classList.toggle("navigation__hidden")


    }
    return (
        <>
            <div className="navigation" ref={sideBarHtml}>
                <div onClick={handleHamburger} className='navigation__hamburger'>
                    X
                </div>
                <div className=" navigation__profile">
                    <img src={profilePic} className="navigation__pic" alt="Profile Picture"/>
                    Tibebe Demissie
                </div>

                <div className="navigation__pages">
                    <a href="/dashboard">Dashboard</a>
                    <a href="/booking_history">Bookings</a>
                    <a href="/notifications">Notifications</a>
                    <a href="/approvals">Approvals</a>
                    <a href="/report">Report</a>
                    <a href="/users">Users</a>
                    <a href="/profile">Account</a>
                </div>

                <button> Logout</button>
            </div>

        </>
    )
}

export default Sidebar