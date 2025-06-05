"use client";

import Link from "next/link";
import ThemeController from "./ThemeController";
import SignIn from "../sign-in";
// import SignIn from "../sign-in";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 shadow-2xl text-base-content">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full border p-4">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            STREAMER
          </Link>
        </div>
        <div className="flex-none">
            <SignIn />
          <ThemeController />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
