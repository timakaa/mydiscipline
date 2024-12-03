"use client";

import { LoginForm } from "@/components/ui/login-form";
import SwitchTheme from "@/components/ui/SwitchTheme";
import { Suspense } from "react";

export default function Login() {
  return (
    <div>
      <div className="absolute right-4 top-4">
        <SwitchTheme />
      </div>
      <div className="grid h-screen grid-cols-2 place-items-center">
        <div></div>
        <Suspense fallback={<></>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
