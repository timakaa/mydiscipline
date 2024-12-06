"use client";

import { LoginForm } from "@/components/ui/login-form";
import SwitchTheme from "@/components/ui/SwitchTheme";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { InfiniteLogo } from "@/components/ui/InfiniteLogo";

export default function Login() {
  return (
    <div>
      <div className="absolute right-4 top-4 z-20">
        <SwitchTheme />
      </div>
      <Link
        href="/"
        className="absolute left-4 top-4 z-20 flex select-none items-center gap-x-1 text-sm font-[700] md:text-[1.25rem]"
      >
        <InfiniteLogo className="text-xl text-amber-600 md:text-2xl" />
        <div>MyDiscipline</div>
      </Link>
      <div className="relative grid h-screen grid-cols-1 place-items-center md:grid-cols-2">
        <div className="relative hidden h-full w-full md:block">
          <div className="absolute inset-0 z-10 bg-black/40" />
          <Image src="/loginbg.png" alt="logo" fill className="object-cover" />
        </div>
        <Suspense fallback={<></>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
