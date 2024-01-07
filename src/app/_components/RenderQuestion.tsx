"use client"
import { ExtendedFormQuestion } from "@/types/ExtendedFormQuestion";
import Part2TextEditor from "./part2-text-editor";
import Strength from "./addingStrength";
import ImprovementButton from "./addingImprovement";
import { api } from "@/trpc/react";

const RenderQuestion = ({
  questions,
}: {
  questions: ExtendedFormQuestion[];
}) => {
  const renderedSections: Set<string> = new Set();
  
  const { mutate: updatePart2 } = api.question.updateAnswerPart2.useMutation();
  const { mutate: createForm } = api.question.createFormQuestionStrength.useMutation();
  const { mutate: createFormImprovement } = api.question.createFormQuestionImprovement.useMutation();


  

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
  const createFormQuestionImprovementToDB = async (
    formQuestionID: string,
    improvement: string,
  ) => {
    try {
      await createFormImprovement({
        formQuestionId: formQuestionID,
        improvement: improvement,
      });
      console.log(
        "Form Question improvement created successfully for form question with ID:" +
        formQuestionID,
      );
    } catch (error) {
      console.error("Error creating form question improvement:", error);
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

<div className="flex">
  <div className="mr-8">
    <h1 className="text-3xl text-black">
      Strength{" "}
      <Strength
        onCreateFormQuestionStrength={createFormQuestionStrengthToDB}
        questionId={question.id}
      />
    </h1>
  </div>
  <div>
    <h1 className="text-3xl text-black">
      Area of Improvement{" "}
      <ImprovementButton
        onCreateFormQuestionImprovement={createFormQuestionImprovementToDB}
        questionId={question.id}
      />
    </h1>
  </div>
</div>

    </div>
  ));
};

export default RenderQuestion;

