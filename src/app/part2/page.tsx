
// import ReactDOM from 'react-dom';
// import { api } from "@/trpc/server";
// import Part2TextEditor from "@/app/_components/part2-text-editor";
// import { ExtendedFormQuestion } from "@/types/ExtendedFormQuestion";

// export const StrengthButton = ({ onClick }: { onClick: () => void }) => (

//   <button onClick={onClick}>+</button>
// );

// export default async function part2() {
//   const data = await api.question.getFormQuestion.query();

//   const createFormQuestionStrengthToDB = async (formQuestionID: string, strength: string) => {
//     try {
//       await api.question.createFormQuestionStrength.mutate({ formQuestionId: formQuestionID, strength: strength });
//       console.log("Form Question Strength created successfully for form question with ID:" + formQuestionID);
//     } catch (err) {
//       console.error("Error creating form question strength for form question with ID:" + formQuestionID);
//     }
//   };

//   const updatePart2ToDB = async (formQuestionID: string, answer: string) => {
//     "use server"
//     try {
//       await api.question.updateAnswerPart2.mutate({ answer: answer, formQuestionID: formQuestionID });
//       console.log("Part 2 Answer Updated successfully for form question with ID:" + formQuestionID);
//     } catch (err) {
//       console.error("Error Updating answer for form question with ID:" + formQuestionID);
//     }
//   };

//   const renderQuestionsByPart = (questions: ExtendedFormQuestion[] | undefined) => {
//     const renderedSections: Set<string> = new Set();

//     return questions!.map((question) => (
//       <div key={question.id}>
//         {renderedSections.has(question.question.section.id) ? null : (
//           <div key={`section-${question.question.section.id}`}>
//             <h2 className="text-2xl">{question.question.section.order}. {question.question.section.name}</h2>
//             <div className="hidden">{renderedSections.add(question.question.section.id)}</div>
//           </div>
//         )}
//         {question.renderer === 'part_2' && <Part2TextEditor question={question} updatePart2ToDB={updatePart2ToDB} />}
//       </div>
//     ));
//   };

//   const addInputBox = (formQuestionID: string) => {
//     const strengthContainer = document.getElementById('strength-container');
//     const input = document.createElement('input');
//     input.type = 'text';
//     input.placeholder = 'Enter strength';
//     strengthContainer?.appendChild(input);

//     const button = <StrengthButton onClick={() => submitStrength(formQuestionID, input.value)} />;
//     ReactDOM.render(button, strengthContainer);
//   };

//   const submitStrength = (formQuestionID: string, strength: string) => {
//     createFormQuestionStrengthToDB(formQuestionID, strength);
//   };

//   return (
//     <main className="">
//       <div className="flex flex-col mx-5">
//         <div className="mb-32">
//           {data && (
//             <>
//               <div className="bg-purple-800 p-2 my-2"><h1 className="text-white text-3xl">Part 2</h1></div>
//               {renderQuestionsByPart(data.part2)}
//             </>
//           )}

//           <div>
//             <h1 className="text-black text-3xl">Strength</h1>
//             <StrengthButton onClick={() => addInputBox("someFormQuestionID")} />
//             <div id="strength-container"></div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


import { api } from "@/trpc/server";
import Part2TextEditor from "@/app/_components/part2-text-editor";
import { ExtendedFormQuestion } from "@/types/ExtendedFormQuestion";
import StrengthButtonProps from "@/app/_components/addingStrength";

export default async function part2() {
  const data = await api.question.getFormQuestion.query();


  const createFormQuestionStrengthToDB = async (formQuestionID: string, strength: string) => {
    "use server"
    try {
      await api.question.createFormQuestionStrength.mutate({ formQuestionId: formQuestionID, strength: strength });
      console.log("Form Question Strength created successfully for form question with ID:" + formQuestionID);
    } catch (err) {
      console.error("Error creating form question strength for form question with ID:" + formQuestionID);
    }
  };


  const updatePart2ToDB = async (formQuestionID: string, answer: string) => {
    "use server"
    try {
      await api.question.updateAnswerPart2.mutate({ answer: answer, formQuestionID: formQuestionID });
      console.log("Part 2 Answer Updated successfully for form question with ID:" + formQuestionID);
    } catch (err) {
      console.error("Error Updating answer for form question with ID:" + formQuestionID);
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
        {question.renderer === 'part_2' && <Part2TextEditor question={question} updatePart2ToDB={updatePart2ToDB} />}
        {/* {question.renderer === 'part_2' && <Part2TextEditor question={question} />}
            {question.renderer === 'part_3' && <Part3TextEditor question={question} />} */}

        <h1 className="text-black text-3xl">
          Strength <StrengthButtonProps onCreateFormQuestionStrength={createFormQuestionStrengthToDB} questionId={question.id}  />
        </h1>
      </div>
    ));
  };


  return (
    <main className="">
      <div className="flex flex-col mx-5">
        <div className="mb-32">
          {data && (
            <>
              <div className="bg-purple-800 p-2 my-2"><h1 className="text-white text-3xl">Part 2</h1></div>
              {renderQuestionsByPart(data.part2)}

            </>
          )}
        </div>
      </div>
    </main>
  );
}