"use client";

import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import ThemeController from "./ThemeController";
import Image from "next/image";
import { useState } from "react";

const NavBar = () => {
  const { data: session } = useSession()
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar bg-base-100 shadow-2xl text-base-content">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full border p-4">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            STREAMER
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeController />
          {session ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="rounded-full overflow-hidden w-10 h-10 cursor-pointer"
              >
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Avatar"
                  width={40}
                  height={40}
                />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-base-100 border shadow rounded-lg z-50">
                  <div className="px-4 py-2 text-sm">{session.user?.name}</div>
                  <hr />
                  <button
                    onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-base-200 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
