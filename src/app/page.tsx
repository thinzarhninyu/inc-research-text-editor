import { api } from "@/trpc/server";
import Part1TextEditor from "@/app/_components/part1-text-editor";
import TextEditorSlatejs from "@/app/_components/text-editor-slatejs";
import { useEffect, useState } from "react";
import { Question, FormQuestion } from "@prisma/client";

interface ExtendedFormQuestion extends FormQuestion {
  question: Question;
}

export default function Home() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await api.question.getFormQuestion.query();
  //       const responseData = result.data;
  
  //       // Check if responseData is defined before updating state
  //       if (responseData) {
  //         // Transform the array into an object with keys 'part1', 'part2', 'part3'
  //         const transformedData: Record<string, ExtendedFormQuestion[]> = {
  //           part1: responseData.filter((item) => item.renderer === 'part_1'),
  //           part2: responseData.filter((item) => item.renderer === 'part_2'),
  //           part3: responseData.filter((item) => item.renderer === 'part_3'),
  //         };
  
  //         setGroupedQuestions(transformedData);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       // Handle error if needed
  //     } finally {
  //       setDataLoading(false);
  //     }
  //   };
  
  //   fetchData();
  // }, []);
  return (
    <main className="">
      <div className="flex flex-col">
        <div className="mb-32">
          <Part1TextEditor />
        </div>
      </div>
    </main>
  );
}
