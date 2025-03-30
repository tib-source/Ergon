import "../styling/navigation.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserInfo } from "../../hooks/useUserInfo.tsx";
import { useUserRole } from "../../hooks/useUserRole.tsx";
import { useAuth } from "../../hooks/UseAuth.tsx";


const Sidebar = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const { logout } = useAuth();
  const { data: user } = useUserInfo();
  const isAdmin = useUserRole();
  // const notifications = useNotifications(1);

  // useEffect(() => {
  //   fetch(`${Env.BASE_URL}/notifications/unread/1`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setNotificationCount(data.length);
  //     });
  // }, [notifications]);

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
            src={user?.profilePicture}
            className="navigation__pic"
            alt="Profile Picture"
          />
          {user?.firstName + " " + user?.lastName}
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
            {notificationCount > 0 && <span className="notification__count">{notificationCount}</span>}
          </NavLink>
          {renderAdminPages(isAdmin)}
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to={"/profile"}
          >
            Account
          </NavLink>
        </div>

        <button onClick={logout}> Logout</button>
      </div>
    </>
  );
};

export default Sidebar;
