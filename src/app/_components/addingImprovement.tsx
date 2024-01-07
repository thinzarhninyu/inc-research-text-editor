"use client"
import React, { useState, useEffect } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRouter } from 'next/router';


// Update the prop type to include both formQuestionID and strength
interface ImprovementButtonProps {

  onCreateFormQuestionImprovement: (formQuestionID: string, improvement: string) => void;
  questionId: string;

}

  

const ImprovementButton: React.FC<ImprovementButtonProps> = ({ onCreateFormQuestionImprovement, questionId }) => {

  const [value, setValue] = useState("") ;
  const [rawText, setRawText] = useState(
    ""
)

    


 

  const handleButtonClick = () => {
    const formQuestionID = questionId;
    const improvement = rawText; 
    

    onCreateFormQuestionImprovement(formQuestionID, improvement);
    window.location.reload();

  
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

  const handleProcedureContentChange = (content: any) => {
    console.log(content);
    setValue(content);
    const plainText = content.replace(/<[^>]*>/g, "");
    setRawText(plainText);
 
  };

  return (
    <div>
   
     

      <div className="w-1/2 shadow-md overflow-y-auto h-100 mt-5">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={value}
          placeholder="Add your input answer here..."
          onChange={handleProcedureContentChange}
          style={{ height: "100%" }}
        />
      </div>

      <button onClick={handleButtonClick}
       style={{
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px',
        marginTop: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      
        Done
      </button>
     
     
    </div>
  );
};

export default ImprovementButton;
