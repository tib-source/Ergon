import profilePic from "../../assets/profile.jpeg";
import Env from "../../Env";
import useNotifications from "../../hooks/useNotifications";
import "../styling/navigation.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

type UserObject = {
  name: string;
  profilePic: string;
  isAdmin: boolean;
};

const Sidebar = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  const [user, setUser] = useState<UserObject>({
    isAdmin: false,
    name: "",
    profilePic: "",
  });

  const notifications = useNotifications(1);

  useEffect(() => {
    fetch(`${Env.BASE_URL}/notifications/unread/1`)
      .then((response) => response.json())
      .then((data) => {
        setNotificationCount(data.length);
      });
  }, [notifications]);

  useEffect(() => {
    setUser({
      name: "Tibebe Demissie",
      profilePic: profilePic,
      isAdmin: true,
    });
  }, []);
  const renderAdminPages = (isAdmin: boolean) => {
    if (isAdmin) {
      return (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to={"/report"}
          >
            Report
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to={"/approvals"}
          >
            Approvals
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to={"/users"}
          >
            Users
          </NavLink>
        </>
      );
    }
  };
  return (
    <>
      <div className="navigation">
        <div className="navigation__profile">
          <img
            src={user.profilePic}
            className="navigation__pic"
            alt="Profile Picture"
          />
          {user.name}
        </div>

        <div className="navigation__pages">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to={"/"}
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to={"/history"}
          >
            History
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to={"/notifications"}
            onClick={() => setNotificationCount(0)}
          >
            Notifications
            { notificationCount > 0 && <span className="notification__count">{notificationCount}</span>}
          </NavLink>
          {renderAdminPages(user.isAdmin)}
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to={"/profile"}
          >
            Account
          </NavLink>
        </div>

        <button> Logout</button>
      </div>
    </>
  );
};

export default Sidebar;
