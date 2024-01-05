// // "use client";
// // import ReactQuill from "react-quill";
// // import { api } from "@/trpc/server";
// // import "react-quill/dist/quill.snow.css";
// // import { useQuery } from "@tanstack/react-query";
// // import { useState } from "react";
// // import { FormQuestionStrength} from "@prisma/client";
// // import _ from "lodash";
// // export interface StrengthTextEditorProps {
// //   strength: FormQuestionStrength;
// //   updateStrength: (id:string, strength:string) => void;
// // }
// // const StrengthTextEditor: React.FC<StrengthTextEditorProps> = ({ strength, updateStrength }) => {
// //   const [value, setValue] = useState(
// //     strength.strength
// //   );
// //   const [rawText, setRawText]=useState(
// //     ""
// //   )
// //   const debouncedUpdate = _.debounce(updateStrength, 500);

// //   const handleProcedureContentChange = (content: any) => {
// //     console.log(content);
// //     setValue(content);
// //     const plainText = content.replace(/<[^>]*>/g, "");
// //     setRawText(plainText);
// //     debouncedUpdate(strength.id, content);
// //   };

// //   const myColors = ["yellow", "red", "blue", "green", "white"];
// //   const modules = {
// //     toolbar: [
// //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
// //       ["bold", "italic", "underline", "strike", "blockquote"],
// //       [{ align: ["justify", "center", "right"] }],
// //       [{ list: "ordered" }, { list: "bullet" }],
// //       [{ color: myColors }],
// //       [{ background: myColors }],
// //     ],
// //   };

// //   const formats = [
// //     "header",
// //     "bold",
// //     "italic",
// //     "underline",
// //     "strike",
// //     "blockquote",
// //     "list",
// //     "bullet",
// //     "color",
// //     "background",
// //     "align",
// //   ];

// //   return (
// //     <div>
// //       <div className="w-1/2 shadow-md overflow-y-auto h-36 mt-5">
// //         <ReactQuill
// //           theme="snow"
// //           modules={modules}
// //           formats={formats}
// //           value={value}
// //           placeholder="Add your input answer here..."
// //           onChange={handleProcedureContentChange}
// //           style={{height:"100%"}}
// //         />
// //       </div>
// //       <div className="mt-5 p-2 border border-black w-1/2">
// //     <p>{value}</p>
// //     <h1 className="text-xl">return raw text data by react quill:</h1><br />
// //     <p>{rawText}</p>
// //     </div>
// //     </div>
// //   );
// // };

// // export default StrengthTextEditor;

"use client"

import React from 'react';
import { api } from "@/trpc/react";
import StrengthListItem from "./StrengthListItem";

interface StrengthListProps {
  formQuestionId: string;
}
interface StrengthItem {
    id: string;
    strength: string;
    // Add other properties as needed
  }
  

  
  const StrengthList: React.FC<StrengthListProps> = ({ formQuestionId }) => {
    const { data: items, error } = api.question.strengthList.useQuery({ formQuestionId });
    const { mutate: deleteST }= api.question.strengthDelete.useMutation();
    const handleDelete = async (itemId: string) => {
        try {
          // Call your API to delete the item
          await deleteST({ id:itemId });
    
          
        } catch (error) {
          console.error('Error deleting strength:', error);
        }
      };
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

    
  
    return (
      <div>
        <h2>Strengths for Form Question {formQuestionId}</h2>
        {items && items.length > 0 ? (
          <ul>
            {items.map((item: StrengthItem) => (
              <StrengthListItem
                key={item.id}
                id={item.id}
                strength={item.strength}
                onEdit={() => {/* implement edit functionality */}}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </ul>
        ) : (
          <p>No strengths found.</p>
        )}
      </div>
    );
  };
  
  export default StrengthList;