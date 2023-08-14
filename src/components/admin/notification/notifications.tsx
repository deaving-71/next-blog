"use client";

import { Notification, useNotificationContext } from "@/context";
import { AiFillCheckCircle, AiFillInfoCircle } from "react-icons/ai";
import { BiSolidError, BiSolidErrorCircle } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode };

export default function Notifications({ children }: Props) {
  const { notifications } = useNotificationContext();
  return (
    <div>
      {notifications.length > 0 &&
        notifications.map((notification) => (
          <ToastNotification
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
          />
        ))}
      {children}
    </div>
  );
}

const Icons = {
  success: <AiFillCheckCircle size={56} className="text-green-400" />,
  info: <AiFillInfoCircle size={56} className="text-blue-400" />,
  error: <BiSolidError size={56} className="text-red-400" />,
  warn: <BiSolidErrorCircle size={56} className="text-yellow-400" />,
};

const color = {
  success: "border-l-green-400",
  info: "border-l-blue-400",
  error: "border-l-red-400",
  warn: "border-l-yellow-400",
};

function ToastNotification({
  message,
  type,
  id,
}: Notification & { id: string }) {
  return (
    <div
      className={cn(
        "fixed top-2 right-3 z-50 w-[400px] h-[80px] bg-woodsmoke-800 flex p-4 border-l-8 rounded-lg gap-4",
        color[type]
      )}
    >
      <span className="flex items-center justify-center w-[40px]">
        {Icons[type]}
      </span>
      <div className="flex-1">
        <h4 className="font-semibold text-xl capitalize text-white/90 ">
          {type}
        </h4>
        <p className="text-white/70">{message}</p>
      </div>
      <button className="absolute top-4 right-4 rounded-full hover:bg-woodsmoke-900 p-1 transition-all">
        <FaXmark size={22} fill="#838383" />
      </button>
    </div>
  );
}
