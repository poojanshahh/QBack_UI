import { formatDate } from "@/fwk/utils";

export default async function IntelDetails({
  params,
}: {
  params: { id: string };
}) {
  const intel = await fetch(`/api/intel/${params.id}`, {
    method: "GET",
    cache: "no-cache",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const renderTitle = () => {
    return <div className="text-xl">{intel.title}</div>;
  };

  const renderSourceWidget = () => {
    return (
      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-1/3">
          <div className="text-lg font-semibold">Source</div>
          <div>{intel.source}</div>
        </div>
        <div className="flex flex-col w-1/3 ml-4">
          <div className="text-base font-semibold">Created By</div>
          <div>{intel.createdBy}</div>
        </div>
        <div className="flex flex-col w-1/3 ml-4">
          <div className="text-base font-semibold">Last Updated</div>
          <div>{formatDate(intel.updateAt)}</div>
        </div>
      </div>
    );
  };

  const renderContentWidget = () => {
    return (
      <div className="flex flex-col">
        <div className="text-lg font-bold mb-4">Content</div>
        <div style={{ maxHeight: 600 }} className="overflow-auto">
          {intel.content}
        </div>
      </div>
    );
  };

  const renderInsightsWidget = () => {
    return (
      <div className="flex flex-col">
        <div className="text-lg font-bold mb-4">Insights</div>
        <div>{intel.insights || "No Insights generated"}</div>
      </div>
    );
  };
  return (
    <div className="w-full">
      <div className="p-4 border-b-2 flex flex-row justify-between">
        <div className="">{renderTitle()}</div>
        <div className="ml-4 w-1/3">{renderSourceWidget()}</div>
      </div>

      <div className="py-4 px-6 flex flex-row">
        <div className="w-1/2">{renderInsightsWidget()}</div>
        <div className="w-1/2">{renderContentWidget()}</div>
      </div>
    </div>
  );
}
