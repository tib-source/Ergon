import { useEffect, useState } from "react";
import Env from "../../Env";

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  createdAt: Date;
  type: string;
  user: string;
}


const useNotifications = (userId: number) => {

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {

    const stream = new EventSource(`${Env.BASE_URL}/notifications/stream?userId=${userId}`);
    stream.onmessage = (event) => {
      if (event.data) {
        const notification = JSON.parse(event.data);

        console.log(notification);
        setNotifications((notifications) => [...notifications, notification]);

      }
    };

    return () => {
      stream.close();
    };
  }, [userId]);

  return notifications;
};


export default useNotifications;