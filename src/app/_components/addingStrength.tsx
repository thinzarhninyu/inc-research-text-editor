"use client"
import React, { useState, useEffect } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Update the prop type to include both formQuestionID and strength
interface StrengthButtonProps {

  onCreateFormQuestionStrength: (formQuestionID: string, strength: string) => void;
  questionId: string;

}

// interface StrengthListProps {
//     lists: Array<{ id: string; strength: string }>;
//     onEdit: (id: string, strength: string) => void;
//     onDelete: (id: string) => void;
//   }
  
//   const StrengthList: React.FC<StrengthListProps> = ({ lists, onEdit, onDelete }) => {
//     return (
//       <div>
//         {lists.map((item) => (
//           <div key={item.id} style={{ marginBottom: '10px' }}>
//             <p>{item.strength}</p>
//             <button onClick={() => onEdit(item.id, item.strength)}>Edit</button>
//             <button onClick={() => onDelete(item.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     );
//   };
  

const StrengthButton: React.FC<StrengthButtonProps> = ({ onCreateFormQuestionStrength, questionId }) => {

  const [value, setValue] = useState("") ;
  const [rawText, setRawText] = useState(
    ""
  )
//   const [strengthList, setStrengthList] = useState<Array<{ id: string; strength: string }>>([]);
//   const handleEdit = (id: string, strength: string) => {
//     // Handle edit logic here
//     // You might want to populate the editor with the existing strength for editing
//   };

//   const handleDelete = (id: string) => {
//     // Handle delete logic here
//   };

 

  const handleButtonClick = () => {
    const formQuestionID = questionId;
    const strength = rawText; 

    onCreateFormQuestionStrength(formQuestionID, strength);
  
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
   
     

      <div className="w-1/2 shadow-md overflow-y-auto h-36 mt-5">
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
      {/* <StrengthList lists={strengthList} onEdit={handleEdit} onDelete={handleDelete} /> */}
      {/* <div className="mt-5 p-2 border border-black w-1/2">
        <h1 className="text-xl">return text data by react quill:</h1><br />
        <p>{value}</p>
        <h1 className="text-xl">return raw text data by react quill:</h1><br />
        <p>{rawText}</p>
      </div> */}
    </div>
  );
};

export default StrengthButton;
