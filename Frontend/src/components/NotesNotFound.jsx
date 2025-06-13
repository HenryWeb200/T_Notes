import { NotebookIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NotesNotFound = () => {
  return (
    <div className="relative isolate overflow-hidden px-6 py-4">
  <div className="relative z-10">
    {/* Message and button */}

    <div className="flex flex-col items-center justify-center pt-6 pb-12 px-6 md:px-0 space-y-6 max-w-xl mx-auto text-center">
      <div className="bg-[#009DFF1A] rounded-full p-10"> {/* soft blue background */}
        <NotebookIcon className="size-12 text-[#009DFF]" /> {/* bold blue icon */}
      </div>
      <h1 className="text-3xl font-bold text-[#E0F2FF]">Welcome to T_Notes</h1> {/* soft white-blue text */}
      <p className="text-[#A4CFFF] text-md">
        Hi there! It looks like you haven't created any notes yet.
        <br />
        Start capturing your ideas by creating your first note below.
      </p>
      <Link to="/create" 
      className="inline-flex h-12 items-center justify-center rounded-md border border-[#0050B3] bg-gradient-to-t from-[#007BFF] to-[#80D0FF] px-6 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#009DFF] focus:ring-offset-2 focus:ring-offset-[#001F3F] btn bg-[#009DFF] text-white border-none hover:bg-[#007ACC] mt-4 ">
        Create Your First Note
      </Link>
    </div>
    </div>
    </div>
  );
};

export default NotesNotFound;
