import GraphComponent from "../../../components/GraphComponent";

export default function () {
  return (
    <div className="w-scree">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Hello User!
      </div>
      <div>
        {/* graph here */}
        <GraphComponent />
      </div>
    </div>
  );
}
