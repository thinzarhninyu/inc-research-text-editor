// import { ExtendedFormQuestion } from "@/types/ExtendedFormQuestion";
// import Part2TextEditor from "./part2-text-editor";
// import StrengthButton from "./addingStrength";
// import { api } from "@/trpc/server";

// export default async function RenderQuestion(
//   questions: ExtendedFormQuestion[] | undefined,
// ) {
//   const renderedSections: Set<string> = new Set();

//   const updatePart2ToDB = async (formQuestionID: string, answer: string) => {
//     "use server";
//     try {
//       await api.question.updateAnswerPart2.mutate({
//         answer: answer,
//         formQuestionID: formQuestionID,
//       });
//       console.log(
//         "Part 2 Answer Updated successfully for form question with ID:" +
//           formQuestionID,
//       );
//     } catch (err) {
//       console.error(
//         "Error Updating answer for form question with ID:" + formQuestionID,
//       );
//     }
//   };
//   const createFormQuestionStrengthToDB = async (
//     formQuestionID: string,
//     strength: string,
//   ) => {
//     "use server";
//     try {
//       await api.question.createFormQuestionStrength.mutate({
//         formQuestionId: formQuestionID,
//         strength: strength,
//       });
//       console.log(
//         "Form Question Strength created successfully for form question with ID:" +
//           formQuestionID,
//       );
//     } catch (err) {
//       console.error(
//         "Error creating form question strength for form question with ID:" +
//           formQuestionID,
//       );
//     }
//     return questions!.map((question) => (
//       <div key={question.id}>
//         {renderedSections.has(question.question.section.id) ? null : (
//           <div key={`section-${question.question.section.id}`}>
//             <h2 className="text-2xl">
//               {question.question.section.order}.{" "}
//               {question.question.section.name}
//             </h2>
//             <div className="hidden">
//               {renderedSections.add(question.question.section.id)}
//             </div>
//           </div>
//         )}
//         {question.renderer === "part_2" && (
//           <Part2TextEditor
//             question={question}
//             updatePart2ToDB={updatePart2ToDB}
//           />
//         )}

//         <h1 className="text-3xl text-black">
//           Strength{" "}
//           <StrengthButton
//             onCreateFormQuestionStrength={createFormQuestionStrengthToDB}
//             questionId={question.id}
//           />
//         </h1>
//       </div>
//     ));
//   };
// }

// ./components/renderQuestion.tsx

// import { ExtendedFormQuestion } from "@/types/ExtendedFormQuestion";
// import Part2TextEditor from "./part2-text-editor";
// import StrengthButton from "./addingStrength";
// import { api } from "@/trpc/server";

// const updatePart2ToDB = async (formQuestionID: string, answer: string) => {
//     "use server"
//   try {
//     await api.question.updateAnswerPart2.mutate({
//       answer: answer,
//       formQuestionID: formQuestionID,
//     });
//     console.log(
//       "Part 2 Answer Updated successfully for form question with ID:" +
//         formQuestionID,
//     );
//   } catch (err) {
//     console.error(
//       "Error Updating answer for form question with ID:" + formQuestionID,
//     );
//   }
// };

// const createFormQuestionStrengthToDB = async (
//   formQuestionID: string,
//   strength: string,
// ) => {
//     "use server"
//   try {
//     await api.question.createFormQuestionStrength.mutate({
//       formQuestionId: formQuestionID,
//       strength: strength,
//     });
//     console.log(
//       "Form Question Strength created successfully for form question with ID:" +
//         formQuestionID,
//     );
//   } catch (err) {
//     console.error(
//       "Error creating form question strength for form question with ID:" +
//         formQuestionID,
//     );
//   }
// };

// const RenderQuestion = ({ questions }: { questions: ExtendedFormQuestion[] }) => {
//   const renderedSections: Set<string> = new Set();

//   return questions.map((question) => (
//     <div key={question.id}>
//       {renderedSections.has(question.question.section.id) ? null : (
//         <div key={`section-${question.question.section.id}`}>
//           <h2 className="text-2xl">
//             {question.question.section.order}. {question.question.section.name}
//           </h2>
//           <div className="hidden">
//             {renderedSections.add(question.question.section.id)}
//           </div>
//         </div>
//       )}
//       {question.renderer === "part_2" && (
//         <Part2TextEditor
//           question={question}
//           updatePart2ToDB={updatePart2ToDB}
//         />
//       )}

//       <h1 className="text-3xl text-black">
//         Strength{" "}
//         <StrengthButton
//           onCreateFormQuestionStrength={createFormQuestionStrengthToDB}
//           questionId={question.id}
//         />
//       </h1>
//     </div>
//   ));
// };

// export default RenderQuestion;
"use client"
import { ExtendedFormQuestion } from "@/types/ExtendedFormQuestion";
import Part2TextEditor from "./part2-text-editor";
import Strength from "./addingStrength";
import { api } from "@/trpc/react";

const RenderQuestion = ({
  questions,
}: {
  questions: ExtendedFormQuestion[];
}) => {
  const renderedSections: Set<string> = new Set();
  
  const { mutate: updatePart2 } = api.question.updateAnswerPart2.useMutation();
  const { mutate: createForm } = api.question.createFormQuestionStrength.useMutation();

  const updatePart2ToDB = async (formQuestionID: string, answer: string) => {
    try {
      await updatePart2({ formQuestionID, answer });
      console.log(
        "Part 2 Answer Updated successfully for form question with ID:" +
        formQuestionID,
      );
    } catch (error) {
      console.error("Error updating Part 2 answer:", error);
    }
  };

  const createFormQuestionStrengthToDB = async (
    formQuestionID: string,
    strength: string,
  ) => {
    try {
      await createForm({
        formQuestionId: formQuestionID,
        strength: strength,
      });
      console.log(
        "Form Question Strength created successfully for form question with ID:" +
        formQuestionID,
      );
    } catch (error) {
      console.error("Error creating form question strength:", error);
    }
  };

  return questions.map((question) => (
    <div key={question.id}>
      {renderedSections.has(question.question.section.id) ? null : (
        <div key={`section-${question.question.section.id}`}>
          <h2 className="text-2xl">
            {question.question.section.order}. {question.question.section.name}
          </h2>
          <div className="hidden">
            {renderedSections.add(question.question.section.id)}
          </div>
        </div>
      )}
      {question.renderer === "part_2" && (
        <Part2TextEditor
          question={question}
          updatePart2ToDB={updatePart2ToDB}
        />
      )}

      <h1 className="text-3xl text-black">
        Strength{" "}
        <Strength
          onCreateFormQuestionStrength={createFormQuestionStrengthToDB}
          questionId={question.id}
        />
      </h1>
    </div>
  ));
};

export default RenderQuestion;

// import { ExtendedFormQuestion } from "@/types/ExtendedFormQuestion";
// import Part2TextEditor from "./part2-text-editor";
// import StrengthButton from "./addingStrength";
// import { api } from "@/trpc/react";

// const RenderQuestion = ({
//   questions,
// }: {
//   questions: ExtendedFormQuestion[];
// }) => {
//   const renderedSections: Set<string> = new Set();

//   const updatePart2ToDB = async (formQuestionID: string, answer: string) => {
//     const {mutate: updatePart2} = api.question.updateAnswerPart2.useMutation();
 
//       updatePart2({ formQuestionID, answer},
//         {
//             onSuccess:()=>{
//                 console.log("success")
//             }, 
//             onError:(e)=>{
//                 console.log(e.message)
//             }
//         })
//       console.log(
//         "Part 2 Answer Updated successfully for form question with ID:" +
//           formQuestionID,
//       );
  
//   };

//   const createFormQuestionStrengthToDB = async (
//     formQuestionID: string,
//     strength: string,
//   ) => {
//     const {mutate: createForm} = api.question.updateAnswerPart2.useMutation();
      
//     createForm ({
//         formQuestionId: formQuestionID,
//         strength: strength,
//       });
//       console.log(
//         "Form Question Strength created successfully for form question with ID:" +
//           formQuestionID,
//       );
   
//   };

//   return questions.map((question) => (
//     <div key={question.id}>
//       {renderedSections.has(question.question.section.id) ? null : (
//         <div key={`section-${question.question.section.id}`}>
//           <h2 className="text-2xl">
//             {question.question.section.order}. {question.question.section.name}
//           </h2>
//           <div className="hidden">
//             {renderedSections.add(question.question.section.id)}
//           </div>
//         </div>
//       )}
//       {question.renderer === "part_2" && (
//         <Part2TextEditor
//           question={question}
//           updatePart2ToDB={updatePart2ToDB}
//         />
//       )}

//       <h1 className="text-3xl text-black">
//         Strength{" "}
//         <StrengthButton
//           onCreateFormQuestionStrength={createFormQuestionStrengthToDB}
//           questionId={question.id}
//         />
//       </h1>
//     </div>
//   ));
// };

// export default RenderQuestion;
