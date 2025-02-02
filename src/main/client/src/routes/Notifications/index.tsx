import { useEffect, useState } from "react";
import useNotifications, { Notification } from "../../hooks/useNotifications";
import Env from "../../Env";
import "../../components/styling/notification.css";
import CardTable from "../../components/CardTable";
import Card from "../../components/Card";


const Notifications = () => {

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const stream = useNotifications(1);

    useEffect(() => {
        fetch(`${Env.BASE_URL}/notifications/1`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setNotifications(data)
            });
    }, [stream]);

    const notificationColor = (type: string) => {
        switch (type) {
            case "BOOKING_REQUEST":
                return {
                    backgroundColor: "#29a89f",
                    color: "var(--white)",
                };
            case "BOOKING_APPROVED":
                return {
                    backgroundColor: "green",
                    color: "white"
                }
            case "BOOKING_REJECTED":
                return {
                    backgroundColor: "blue",
                    color: "white"
                }
            default:
                return {
                    backgroundColor: "blue",
                    color: "white"
                }
        }

    }

    return (
        <div className="notification history">
            <h1 className="history__title">Notifications</h1>
            <hr />
            <CardTable rows={[]}>
                {notifications.length === 0 && (
                    <Card rows={["No notifications for now, come back later..."]} fontSize={1.2} className={"card-empty"} />
                )}
                {notifications.map((notification) => (

                    <Card rows={[notification.message]} style={notificationColor(notification.type)} fontSize={1.2} />
                ))}
            </CardTable>
        </div>
    );
}

export default Notifications;


