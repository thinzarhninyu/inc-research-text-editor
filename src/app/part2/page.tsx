import { api } from "@/trpc/server";
import RenderQuestion from "@/app/_components/RenderQuestion";
import StrengthList from "../_components/strength";

const Part2Page = async () => {
  const data = await api.question.getFormQuestion.query();
  
  console.log("oi", data );
  return (
    <main className="">
      <div className="mx-5 flex flex-col">
        <div className="mb-32">
        {data && data.part2 && (
            <>
              <div className="my-2 bg-purple-800 p-2">
                <h1 className="text-3xl text-white">Part 2</h1>
              </div>
              <RenderQuestion questions={data.part2} />
              {data.part2.map((item) => (
                <StrengthList key={item.id} formQuestionId={item.id} />
                ))}
              
              
            </>
          )}
        </div>
      </div>
    </main>
  );
};


export default Part2Page;
