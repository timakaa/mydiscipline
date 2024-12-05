"use client";

import { InfiniteLogo } from "@/components/ui/InfiniteLogo";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();
  return (
    <footer className="border-t border-base-content/10 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-center lg:flex-nowrap">
          <div className="mr-32 flex flex-col gap-y-2">
            <div className="flex select-none items-center gap-x-1 text-lg font-[700]">
              <InfiniteLogo className="text-xl text-amber-600" />
              <div>MyDiscipline</div>
            </div>
            <div className="flex flex-col gap-y-1">
              <div className="text-sm text-neutral-500">Watch you grow.</div>
              <div className="text-sm text-neutral-500">
                Copyright © 2024 - All rights reserved
              </div>
              <div className="text-sm text-neutral-500">
                Created by{" "}
                <a
                  className="hover:underline"
                  href="https://timakaa-portfolio.vercel.app/"
                  target="_blank"
                >
                  @timakaa
                </a>
              </div>
            </div>
          </div>
          <div className="mr-32 flex flex-col gap-y-2">
            <div className="text-lg font-semibold text-neutral-500">
              Watch me grow
            </div>
            <div className="flex flex-col gap-y-1">
              <div>
                <a
                  href="https://github.com/timakaa"
                  target="_blank"
                  className="text-sm hover:underline"
                >
                  GitHub
                </a>
              </div>
              <div>
                <a
                  href="https://www.instagram.com/ulquiyy/"
                  target="_blank"
                  className="text-sm hover:underline"
                >
                  Instagram
                </a>
              </div>
              <div>
                <a
                  onClick={() => {
                    window.open("mailto:timakaa44@gmail.com", "_blank");
                  }}
                  className="cursor-pointer text-sm hover:underline"
                >
                  Mail
                </a>
              </div>
            </div>
          </div>
          <div className="mr-32 flex flex-col gap-y-2">
            <div className="text-lg font-semibold text-neutral-500">Links</div>
            <div className="flex flex-col gap-y-1">
              <div>
                <Link
                  href={session ? "/" : "/login"}
                  className="cursor-pointer text-sm hover:underline"
                >
                  Log in
                </Link>
              </div>
              <div>
                <Link
                  href={session ? "/discipline" : "/login"}
                  className="cursor-pointer text-sm hover:underline"
                >
                  Charts
                </Link>
              </div>
              <div>
                <Link
                  href={session ? "/chart/create" : "/login"}
                  className="cursor-pointer text-sm hover:underline"
                >
                  Create Chart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
