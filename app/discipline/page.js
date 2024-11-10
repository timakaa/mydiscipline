import { redirect } from "next/navigation";
import getSession from "@/app/lib/getSession";
import Charts from "../components/Charts";
import DisciplineSettings from "../components/DisciplineSettings";

const Discipline = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/discipline");
  }

  return (
    <div className='mx-auto max-w-6xl px-4 md:px-8 py-12'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Discipline</h1>
        <DisciplineSettings />
      </div>
      <div>
        <Charts />
      </div>
    </div>
  );
};

export default Discipline;
