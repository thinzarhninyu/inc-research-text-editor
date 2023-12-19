"use client"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useState } from "react"
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area"

const TextEditorReactQuill = () => {

    const [value, setValue] = useState('')

    const onSubmit = () => {
        console.log(value);
    }

    return (
        <>
            <h1>
                 REACT QUILL TEXT AREA
            </h1>
            <div className="flex ">
                <aside id="default-sidebar" className="fixed left-0 z-40 w-96 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-xl" aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto">
 
                        <div className='flex flex-col justify-center items-center gap-y-4'>
                            <ReactQuill theme="snow" value={value} onChange={setValue} placeholder='Type your text here...' />

                        </div>
                    </div>
                </aside>
                <div className="p-4 sm:ml-96 w-screen sm:mr-8 max-h-screen">
                    <ScrollArea className='w-[450px]'>
                        <div className='shadow-md bg-white'>
                            {value}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </>
    )
}

export default TextEditorReactQuill;