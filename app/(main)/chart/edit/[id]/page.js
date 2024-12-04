import EditChartForm from "@/components/EditChartForm";

export default async function EditChartPage({ params }) {
  const id = await params.id;

  return (
    <div className="mx-auto my-16 max-w-6xl px-4 md:px-8">
      <EditChartForm id={id} />
    </div>
  );
}
