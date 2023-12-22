// "use client";
// import { api } from "@/trpc/server";
// import Part1TextEditor from "./part1-text-editor";
// import TextEditorSlatejs from "@/app/_components/text-editor-slatejs";
// import { useEffect, useState } from "react";
// import { Question, FormQuestion } from "@prisma/client";

// interface ExtendedFormQuestion extends FormQuestion {
//   question: Question;
// }

// const Form = () => {
//   const { data: groupedQuestions, isLoading: dataLoading } = api.question.getFormQuestion.useQuery();
//   return (
//       <div className="flex flex-col">
//         <div className="mb-32">
//           <Part1TextEditor />
//         </div>

//       </div>
//   );
// }
// export default Form;