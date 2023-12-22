import { api } from "@/trpc/server";
import Part1TextEditor from "@/app/_components/part1-text-editor";
// import Part2TextEditor from "@/app/_components/part2-text-editor";
// import Part3TextEditor from "@/app/_components/part3-text-editor";
import { Question, FormQuestion } from "@prisma/client";
interface ExtendedFormQuestion extends FormQuestion {
  question: Question;
}

export default async function Home() {
  const data = await api.question.getFormQuestion.query();

  const renderQuestionsByPart = (questions:ExtendedFormQuestion[]| undefined) => {
    return questions!.map((question) => (
      <div key={question.id}>
        {question.renderer === 'part_1' && <Part1TextEditor question={question!} />}
        {/* {question.renderer === 'part_2' && <Part2TextEditor question={question} />}
        {question.renderer === 'part_3' && <Part3TextEditor question={question} />} */}
      </div>
    ));
  };

  return (
    <main className="">
      <div className="flex flex-col">
        <div className="mb-32">
          {data && (
            <>
              {renderQuestionsByPart(data.part1)}
              {renderQuestionsByPart(data.part2)}
              {renderQuestionsByPart(data.part3)}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
