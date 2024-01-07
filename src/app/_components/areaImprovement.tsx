"use client"
import React, { useState } from 'react';
import { api } from '@/trpc/react';
import ImprovementList from './ImprovementList';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ImprovementListProps {
    formQuestionId: string;
}

interface ImprovementItem {
    id: string;
    improvement: string;
}

const ImprovementListItem: React.FC<ImprovementListProps> = ({ formQuestionId }) => {
    const { data: items, error } = api.question.improvementList.useQuery({ formQuestionId });
    const { mutate: deleteST } = api.question.improvementDelete.useMutation();
    const { mutate: updateST } = api.question.updateImprovement.useMutation();
    
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
    const handleProcedureContentChange = (content: string) => {
        const plainText = content.replace(/<[^>]*>/g, '');
        return plainText;
      };

    const [selectedItem, setSelectedItem] = useState<ImprovementItem | null>(null);

    const handleDelete = async (itemId: string) => {
        try {
            // Call your API to delete the item
            await deleteST({ id: itemId });

            window.location.reload();
        } catch (error) {
            console.error('Error deleting improvement:', error);
        }
    };

    const handleEdit = (item: ImprovementItem) => {
        // Set the selected item for editing
        setSelectedItem(item);
    };

    const handleUpdate = async (newImprovement: string) => {
        if (selectedItem) {
            try {
                // Call your API to update the improvement
                handleProcedureContentChange(newImprovement)
                await updateST({
                    Improvement: newImprovement,
                    formQuestionID: selectedItem.id,
                });

                // Clear the selected item after successful update
                setSelectedItem(null);
                window.location.reload();
            } catch (error) {
                console.error('Error updating improvement:', error);
            }
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Improvements for Form Question {formQuestionId}</h2>
            {items && items.length > 0 ? (
                <ul>
                    {items.map((item: ImprovementItem) => (
                        <ImprovementList
                            key={item.id}
                            id={item.id}
                            improvement={item.improvement}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => handleDelete(item.id)}
                        />
                    ))}
                </ul>
            ) : (
                <p>No Improvements found.</p>
            )}

            {/* Popup window for editing */}
            {selectedItem && (
                <div className="popup w-1/2 shadow-md overflow-y-auto h-100 mt-5">
                    <h3>Edit Improvement</h3>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder="Add your input answer here..."
                        value={selectedItem.improvement}
                        onChange={(content) => setSelectedItem({ ...selectedItem, improvement: content })}
                        style={{ height: "100%" }}
                    />
                    <button onClick={() => handleUpdate(handleProcedureContentChange(selectedItem.improvement))}>Submit</button>
                    <button onClick={() => setSelectedItem(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ImprovementListItem;
