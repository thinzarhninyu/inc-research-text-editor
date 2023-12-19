
import { CreatePost } from "@/app/_components/create-post";
import { api } from "@/trpc/server";
import TextEditorReactQuill from "@/app/_components/text-editor-react-quill";
import TextEditorSlatejs from "@/app/_components/text-editor-slatejs";
export default async function Home() {
  return (
    <main className="">
<div className="flex flex-col">
      <div className="mb-32"> 
        <TextEditorReactQuill />
      </div>
      {/* <div>
        <TextEditorSlatejs />
      </div> */}
    </div>
    </main >
  );
}

// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
