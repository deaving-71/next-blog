"use client";

import Image from "next/image";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiSearch } from "react-icons/bi";

export default function Header() {
  return (
    <header className="flex justify-end mb-6">
      <div className="flex items-center gap-2">
        <label htmlFor="search" className="relative">
          <span className="absolute top-2 left-2">
            <BiSearch size={22} />
          </span>
          <input
            type="search"
            placeholder="Search..."
            name="seach"
            id="search"
            className="rounded-xl outline-none border border-port-gore-600 pl-8 pr-4 py-1 bg-woodsmoke-950 min-w-[260px]"
          />
        </label>

        <button className="hover:bg-woodsmoke-900 rounded-full p-1 transition-all">
          <IoIosNotificationsOutline size={22} />
        </button>

        <button className="rounded-full border-2 border-solid border-port-gore-600 p-[2px]">
          <div className="rounded-full overflow-hidden w-[30px] h-[30px]">
            <Image
              src={"/assets/avatar_male.png"}
              alt="user avatar"
              width={30}
              height={30}
              className="object-contain"
            />
          </div>
        </button>
      </div>
    </header>
  );
}
