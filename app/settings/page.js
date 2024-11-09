import { redirect } from "next/navigation";
import getSession from "@/app/lib/getSession";

const Settings = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/settings");
  }

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export default Settings;
