import { useEffect, useState } from "react";
import useNotifications, { Notification } from "../../hooks/useNotifications";
import Env from "../../Env";
import CardGrid from "../../components/CardGrid";
import Card from "../../components/Card";
import { Bell, CheckCircle, XCircle, AlertCircle, RotateCcw, Calendar, Check, EyeClosed } from "lucide-react"


const Notifications = () => {

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const stream = useNotifications(1);

    useEffect(() => {
        fetch(`${Env.BASE_URL}/notifications/users/1`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setNotifications(data)
            });
    }, [stream]);

    const markAsRead = (id: number) => {
        fetch(`${Env.BASE_URL}/notifications/${id}`, {
            method: "POST"
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to mark notification as read");
            }
            setNotifications(notifications.map((notification) => {
                if (notification.id === id) {
                    return { ...notification, read: true };
                }
                return notification;
            }));
        });
    }

    // convert notification type to css variable name, e.g. REQUEST_CREATED -> --request-created
    const typeToCssVar = (type: string) => {
        return `--${type.toLowerCase().replace(/_/g, "-")}`;
    };

    const iconForType = (type: string) => {
        switch (type) {
            case "REQUEST_CREATED":
                return <Bell />;
            case "REQUEST_APPROVED":
                return <CheckCircle />;
            case "REQUEST_REJECTED":
                return <XCircle />;
            case "OUTSTANDING_RETURN":
                return <AlertCircle />;
            case "RETURN_COMPLETED":
                return <CheckCircle />;
            case "UPCOMING_RETURN":
                return <Calendar />;
            default:
                return <RotateCcw />;
        }
    }

    const styleNotification = (notification: Notification) => {
        let style = "notification__item";
        if (notification.read) {
            style += " card-grid-item-read";
        }
        return (
            <Card className={style} style={{ backgroundColor: `var(${typeToCssVar(notification.type)})` }} key={notification.id}>
                    <div className="notification__content">
                        {iconForType(notification.type)}
                        <span>{notification.message}</span>
                    </div>
                    { !notification.read && <Check className="notification__tick" onClick={()=>markAsRead(notification.id)}/>}
                </Card>          
        );
    };

    return (
        <div className="notification history">
            <h1 className="history__title">Notifications</h1>
            <hr />
            <CardGrid>
                {notifications.length === 0 && (
                    <Card className={"card-empty"}>
                        <EyeClosed/> 
                        <span> No notifications for now </span>
                        <EyeClosed/> 
                    </Card>
                )}
                {notifications.map((notification) => (
                    styleNotification(notification)
                ))}
            </CardGrid>
        </div>
    );
}

export default Notifications;


