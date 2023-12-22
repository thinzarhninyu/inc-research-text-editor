"use client";
import ReactQuill from "react-quill";
import { api } from "@/trpc/server";
import "react-quill/dist/quill.snow.css";
// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Question, FormQuestion } from "@prisma/client";
interface ExtendedFormQuestion extends FormQuestion {
  question: Question;
}

const Part1TextEditor: React.FC<{ question: ExtendedFormQuestion }> = ({ question }) => {
  const [value, setValue] = useState(
    "",
  );
  const stringQuestion: string = question.question.question || ''; 
  const handleProcedureContentChange = (content: any) => {
    console.log(content);
    setValue(content);
  };
  // const data = api.question.getFormQuestion.query();
  // console.log(data);
//   const { data, isLoading, error } = useQuery(['question.getFormQuestion'], () =>
//   api.question.getFormQuestion.query()
// );
  const myColors = ["yellow", "red", "blue", "green", "white"];
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["justify", "center", "right"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: myColors }],
      [{ background: myColors }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "color",
    "background",
    "align",
  ];

  return (
    <div className="m-10">
      <h1>Part 1 question 1.1. {question.question.question}</h1>
      <div className="w-1/2 shadow-md overflow-y-auto h-36 mt-5">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={value}
          placeholder="Add your input answer here..."
          onChange={handleProcedureContentChange}
          style={{height:"100%"}}
        />
      </div>
    </div>
  );
};

export default Part1TextEditor;
