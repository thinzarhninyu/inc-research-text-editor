"use client";
import ReactQuill from "react-quill";
import { api } from "@/trpc/server";
import "react-quill/dist/quill.snow.css";
// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FormQuestionStrength} from "@prisma/client";
import _ from "lodash";
export interface StrengthTextEditorProps {
  answer: FormQuestionStrength;
  updateStrength: (id:string, strength:string) => void;
}
const StrengthTextEditor: React.FC<StrengthTextEditorProps> = ({ answer, updateStrength }) => {
  const [value, setValue] = useState(
    answer.strength
  );
  const [rawText, setRawText]=useState(
    ""
  )
  const debouncedUpdate = _.debounce(updateStrength, 500);

  const handleProcedureContentChange = (content: any) => {
    console.log(content);
    setValue(content);
    const plainText = content.replace(/<[^>]*>/g, "");
    setRawText(plainText);
    debouncedUpdate(answer.id, content);
  };

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
    <div>
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
      <div className="mt-5 p-2 border border-black w-1/2">
    <p>{value}</p>
    <h1 className="text-xl">return raw text data by react quill:</h1><br />
    <p>{rawText}</p>
    </div>
    </div>
  );
};

export default StrengthTextEditor;
