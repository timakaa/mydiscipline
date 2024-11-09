import { redirect } from "next/navigation";
import getSession from "@/app/lib/getSession";

const Discipline = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/discipline");
  }

  return <div>discipline</div>;
};

export default Discipline;
