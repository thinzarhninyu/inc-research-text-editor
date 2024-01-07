"use client"

import React, { useState } from 'react';
import { api } from "@/trpc/react";
import StrengthListItem from "./StrengthListItem";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
    const { mutate: updateST } = api.question.updateStrength.useMutation();
    const handleProcedureContentChange = (content: string) => {
      const plainText = content.replace(/<[^>]*>/g, '');
      return plainText;
    };

  const [selectedItem, setSelectedItem] = useState<StrengthItem | null>(null);
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
  const handleDelete = async (itemId: string) => {
        try {
          // Call your API to delete the item
          await deleteST({ id:itemId });
          window.location.reload();
    
          
        } catch (error) {
          console.error('Error deleting strength:', error);
        }
      };
    
     
     const handleEdit = (item: StrengthItem) => {
        // Set the selected item for editing
        setSelectedItem(item);
    };

    const handleUpdate = async (newStrength: string) => {
        if (selectedItem) {
            try {
                // Call your API to update the strength
                handleProcedureContentChange(newStrength)
                await updateST({
                    strength: newStrength,
                    formQuestionID: selectedItem.id,
                });

                // Clear the selected item after successful update
                setSelectedItem(null);
                window.location.reload();
            } catch (error) {
                console.error('Error updating strength:', error);
            }
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
                          onEdit={() => handleEdit(item)}
                          onDelete={() => handleDelete(item.id)}
                      />
                  ))}
              </ul>
          ) : (
              <p>No Strengths found.</p>
          )}

          {/* Popup window for editing */}
          {selectedItem && (
              <div className="popup w-1/2 shadow-md overflow-y-auto h-100 mt-5">
                  <h3>Edit strength</h3>
                  <ReactQuill
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      placeholder="Add your input answer here..."
                      value={selectedItem.strength}
                      onChange={(content) => setSelectedItem({ ...selectedItem, strength: content })}
                      style={{ height: "100%" }}
                  />
                  <button onClick={() => handleUpdate(handleProcedureContentChange(selectedItem.strength))}>Submit</button>
                  <button onClick={() => setSelectedItem(null)}>Cancel</button>
              </div>
          )}
      </div>
  );
          };
  
  export default StrengthList;