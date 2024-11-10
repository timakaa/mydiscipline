import CreateChartForm from "@/app/components/CreateChartForm";
import getSession from "@/app/lib/getSession";
import { redirect } from "next/navigation";

const CreateChart = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/chart/create");
  }

  return (
    <div className='max-w-6xl px-4 md:px-8 mx-auto my-16'>
      <CreateChartForm />
    </div>
  );
};

export default CreateChart;
