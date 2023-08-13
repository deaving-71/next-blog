import { createContext, useContext, useState } from "react";

export type Notification = {
  message: string;
  type: "success" | "error" | "info" | "warn";
};

type NotificationContext = {
  notifications: (Notification & { id: string })[];
  popNotification: (notificationId: string) => void;
  displayNotification: (notification: Notification) => void;
};

const NotificationContext = createContext({} as NotificationContext);

const useNotificationContext = () => useContext(NotificationContext);

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<
    (Notification & { id: string })[]
  >([]);

  const appendNotification = (notification: Notification): string => {
    const id = Math.random().toString(16).slice(2);

    setNotifications((prev) => [...prev, { ...notification, id: id }]);

    return id;
  };

  const popNotification = (notificationId: string) =>
    setNotifications((prev) =>
      prev.filter((notif) => notif.id !== notificationId)
    );

  const displayNotification = (notification: Notification) => {
    const notificationId = appendNotification(notification);

    setTimeout(() => {
      popNotification(notificationId);
    }, 3000 /* 3s */);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        displayNotification,
        popNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
export { useNotificationContext, NotificationProvider };
