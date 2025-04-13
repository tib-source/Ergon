import { useEffect, useState } from "react";
import useNotifications, { Notification } from "../../hooks/useNotifications";
import Env from "../../Env";
import {
  AlertCircle,
  Bell,
  Calendar,
  Check,
  CheckCircle,
  EyeClosed,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.tsx";
import CardGrid from "@/components/CardGrid";

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const stream = useNotifications(1);

  useEffect(() => {
    fetch(`${Env.BASE_URL}/notifications/users/1`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNotifications(data);
      });
  }, [stream]);

  const markAsRead = (id: number) => {
    fetch(`${Env.BASE_URL}/notifications/${id}`, {
      method: "POST",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }
      setNotifications(
        notifications.map((notification) => {
          if (notification.id === id) {
            return { ...notification, read: true };
          }
          return notification;
        }),
      );
    });
  };

  const typeToCssClass = (type: string) => {
    switch (type) {
      case "REQUEST_CREATED":
        return "blue-500";
      case "REQUEST_APPROVED":
        return "green-500";
      case "REQUEST_REJECTED":
        return "red-500";
      case "OUTSTANDING_RETURN":
        return "orange-500";
      case "RETURN_COMPLETED":
        return "green-500";
      case "UPCOMING_RETURN":
        return "blue-500";
      default:
        return "purple-500";
    }
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
  };

  const styleNotification = (notification: Notification) => {
    const style = notification.read && "card-grid-item-read" ;
    const colorClass = typeToCssClass(notification.type);

    return (
      <Card className={`border-l-4 border-l-${colorClass}  ${style}`} key={notification.id}>
        <CardContent className="flex items-start gap-4">
          <div className="rounded-full">
            {iconForType(notification.type)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{notification.type}</p>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <span className="text-xs text-muted-foreground">5 min ago</span>
              </div>
              <div>
                {!notification.read && (
                  <Check
                    className="notification__tick"
                    onClick={() => markAsRead(notification.id)}
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>
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
            <EyeClosed />
            <span> No notifications for now </span>
            <EyeClosed />
          </Card>
        )}
        {notifications.map((notification) => styleNotification(notification))}
      </CardGrid>
    </div>
  );
};

export default Notifications;
