import { api } from "@/trpc/server";
import Part1TextEditor from "@/app/_components/part1-text-editor";
// import Part2TextEditor from "@/app/_components/part2-text-editor";
// import Part3TextEditor from "@/app/_components/part3-text-editor";
import { ExtendedFormQuestion } from "@/types/ExtendedFormQuestion";
import Link from 'next/link';


export default async function Home() {
 
  const data = await api.question.getFormQuestion.query();
  const updatePart1ToDB = async (formQuestionID:string, answer:string)=>{
    "use server"
    try {
      await api.question.updateAnswerPart1.mutate({ answer: answer, formQuestionID:formQuestionID });
      console.log("Part 1 Answer Updated successfully for form question with ID:"+ formQuestionID);
    } catch (err) {
      console.error("Error Updating answer for form question with ID:"+ formQuestionID);
    }
  }
  const renderQuestionsByPart = (questions: ExtendedFormQuestion[] | undefined) => {
    const renderedSections: Set<string> = new Set();
  
    return questions!.map((question) => (
      <div key={question.id}>
        {renderedSections.has(question.question.section.id) ? null : (
          <div key={`section-${question.question.section.id}`}>
            <h2 className="text-2xl">{question.question.section.order}. {question.question.section.name}</h2>
            <div className="hidden">{renderedSections.add(question.question.section.id)}</div>
          </div>
        )}
        {question.renderer === 'part_1' && <Part1TextEditor question={question} updatePart1ToDB={updatePart1ToDB} />}
          {/* {question.renderer === 'part_2' && <Part2TextEditor question={question} />}
            {question.renderer === 'part_3' && <Part3TextEditor question={question} />} */}
      </div>
    ));
  };
  

  return (
    <main className="">
      <div className="flex flex-col mx-5">
        <div className="mb-32">
          {data && (
            <>
            <div className="bg-purple-800 p-2 my-2"><h1 className="text-white text-3xl">Part 1</h1></div>
              {renderQuestionsByPart(data.part1)}
              {/* <div className="bg-purple-800"><h1 className="text-white">Part 2</h1></div>
              {renderQuestionsByPart(data.part2)}
              <div className="bg-purple-800"><h1 className="text-white">Part 3</h1></div>
              {renderQuestionsByPart(data.part3)} */}
            </>
          )}
        </div>

        <Link href="/part2">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600"
          >
            Click me
          </button>
        </Link>
      </div>
  
    </main>
    
  );
}
