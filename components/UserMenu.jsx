"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "../hooks/useClickAway";
import Image from "next/image";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { InfiniteLogo } from "./ui/InfiniteLogo";

const UserMenu = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useClickAway({ func: () => setIsOpen(false), refs: [menuRef, buttonRef] });

  if (status === "loading")
    return (
      <div className="flex items-center gap-x-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-base-300"></div>
        <div className="h-4 w-20 animate-pulse rounded-md bg-base-300"></div>
      </div>
    );

  return (
    <div>
      {session?.user ? (
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen((prev) => !prev)}
            className="btn btn-ghost flex items-center gap-x-2 px-4 py-1"
          >
            <Image
              src={session?.user?.image || "/default-user-avatar.jpg"}
              alt="user"
              width={24}
              height={24}
              className="rounded-full"
            />
            {session?.user?.name || "Account"}
          </button>
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0.3, y: -3, x: 3 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0.3, y: -3, x: 3 }}
                transition={{ duration: 0.05, ease: "easeIn" }}
                className="relative z-50"
              >
                <div className="absolute right-0 z-50 mt-3 w-screen max-w-[12rem] transform select-none">
                  <div className="overflow-hidden rounded-xl border border-base-content/10 bg-base-100 text-sm shadow-xl">
                    <div className="flex flex-col gap-y-1 p-1">
                      <Link
                        href="/discipline"
                        onClick={() => setIsOpen(false)}
                        className="btn btn-ghost btn-sm flex w-full justify-start py-2"
                      >
                        <InfiniteLogo className="text-xl text-amber-600" />
                        <div className="text-xs">Discipline</div>
                      </Link>
                      <button
                        onClick={async () => {
                          setIsOpen(false);
                          await signOut();
                        }}
                        className="btn btn-ghost btn-sm flex w-full justify-start py-2 hover:bg-red-600/40 hover:text-red-500"
                      >
                        <LogOut size={16} />
                        <div className="text-xs">Logout</div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              ""
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link href="/login" className="btn-simple btn py-2">
          Login
        </Link>
      )}
    </div>
  );
};

export default UserMenu;
