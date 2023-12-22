
import { api } from "@/trpc/server";
import Part1TextEditor from "@/app/_components/part1-text-editor";
import TextEditorSlatejs from "@/app/_components/text-editor-slatejs";
export default async function Home() {
  return (
    <main className="">
<div className="flex flex-col">
      <div className="mb-32"> 
        <Part1TextEditor />
      </div>
      {/* <div>
        <TextEditorSlatejs />
      </div> */}
    </div>
    </main >
  );
}
