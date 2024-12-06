import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import Charts from "@/components/Charts";
import DisciplineSettings from "@/components/DisciplineSettings";

const Discipline = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/discipline");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <div className="flex items-center justify-between">
        <h1 className="hidden text-2xl font-bold md:block">Discipline</h1>
        <DisciplineSettings />
      </div>
      <div>
        <Charts />
      </div>
    </div>
  );
};

export default Discipline;
