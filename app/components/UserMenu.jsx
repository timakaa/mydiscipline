"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "../hooks/useClickAway";
import Image from "next/image";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InfiniteLogo } from "./ui/InfiniteLogo";

const UserMenu = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const pathname = usePathname();

  useClickAway({ func: () => setIsOpen(false), refs: [menuRef, buttonRef] });

  if (status === "loading")
    return (
      <div className='flex items-center gap-x-2'>
        <div className='animate-pulse bg-base-300 w-8 h-8 rounded-full'></div>
        <div className='animate-pulse bg-base-300 w-20 h-4 rounded-md'></div>
      </div>
    );

  return (
    <div>
      {session?.user ? (
        <div className='relative'>
          <button
            ref={buttonRef}
            onClick={() => setIsOpen((prev) => !prev)}
            className='btn btn-ghost py-1 px-4 flex gap-x-2 items-center'
          >
            <Image
              src={session?.user?.image}
              alt='user'
              width={24}
              height={24}
              className='rounded-full'
            />
            {session?.user?.name}
          </button>
          <AnimatePresence mode='wait'>
            {isOpen ? (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0.3, y: -3, x: 3 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0.3, y: -3, x: 3 }}
                transition={{ duration: 0.05, ease: "easeIn" }}
                className='relative z-50'
              >
                <div className='absolute right-0 z-50 mt-3 w-screen max-w-[12rem] transform select-none'>
                  <div className='overflow-hidden rounded-xl border border-base-content/10 bg-base-100 text-sm shadow-xl'>
                    <div className='p-1 flex flex-col gap-y-1'>
                      <Link
                        href='/discipline'
                        onClick={() => setIsOpen(false)}
                        className='btn btn-ghost btn-sm w-full flex justify-start py-2'
                      >
                        <InfiniteLogo className='text-amber-600 text-xl' />
                        <div className='text-xs'>Discipline</div>
                      </Link>
                      <Link
                        href='/settings'
                        onClick={() => setIsOpen(false)}
                        className='btn btn-ghost btn-sm w-full flex justify-start py-2'
                      >
                        <Settings size={16} />
                        <div className='text-xs'>Settings</div>
                      </Link>
                      <button
                        onClick={async () => {
                          setIsOpen(false);
                          await signOut();
                        }}
                        className='btn btn-ghost btn-sm w-full flex justify-start hover:bg-red-600/40 hover:text-red-500 py-2'
                      >
                        <LogOut size={16} />
                        <div className='text-xs'>Logout</div>
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
        <button
          onClick={() => signIn()}
          className='btn btn-simple btn-ghost py-2'
        >
          Login
        </button>
      )}
    </div>
  );
};

export default UserMenu;
