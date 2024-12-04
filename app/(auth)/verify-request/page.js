import React from "react";

const VerifyRequestPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="max-w-xs rounded-lg border border-neutral-500/50 p-4 py-8 text-center shadow-md">
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="text-neutral-500">
          A sign in link has been sent to your email address.
        </p>
      </div>
    </div>
  );
};

export default VerifyRequestPage;
