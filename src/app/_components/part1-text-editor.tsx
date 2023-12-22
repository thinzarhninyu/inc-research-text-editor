"use client";
import ReactQuill from "react-quill";
// import { api } from "@/trpc/server";
import "react-quill/dist/quill.snow.css";
// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Part1TextEditor = () => {
  const [value, setValue] = useState(
    "",
  );
  const handleProcedureContentChange = (content: any) => {
    console.log(content);
    setValue(content);
  };
  // const { data: groupedQuestions, isLoading: dataLoading } = api.question.getFormQuestion.useQuery();
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
      <h1>Part 1 question 1.1. Describe the Mission, Vision, and Values</h1>
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
