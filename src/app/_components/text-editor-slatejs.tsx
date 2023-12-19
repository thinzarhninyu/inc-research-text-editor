"use client"
import React, { useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const TextEditorSlatejs = () => {
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <>
      <h1>SLATEJS TEXT AREA</h1>
      <div className="flex">
        <Slate editor={editor} initialValue={initialValue}>
          <Editable />
        </Slate>
      </div>
    </>
  );
};

export default TextEditorSlatejs;
