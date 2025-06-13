import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router';
import { formatDate }  from '../libs/utils';
import api from '../libs/axios';
import toast from 'react-hot-toast';

const NoteCard = ({note, setNotes}) => {
  const handleDelete = async (e,id) => {
    e.preventDefault();
    if(!window.confirm("Are you sure you want to delete this note")) return;

    try {
        await api.delete(`/notes/${id}`);
        toast.success("Note deleted successfully");
        setNotes((prev) => prev.filter((note) => note._id !== id)); 
    } catch (error) {
        console.error("Error in handleDelete", error)
        toast.error("Failed to delete the designated note")
    }
  }
  return (
    <div className="card bg-base-100 shadow-md">
      {/* Note content */}

    <Link to={`/note/${note._id}`} 
    className='card bg-base-100 hover:shadow-lg transition-all duration-200
    border-t-4 border-solid border-[#009DFF] hover:border-[#007ACC]'>
        <div className="card-body">
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className="card-actions flex items-center justify-between mt-4">
                <span className='text-base-content/60 text-sm'>
                    {formatDate(new Date(note.createdAt))}
                </span>
                <div className='flex items-center gap-1'>
                    <button className='btn btn-ghost btn-success btn-xs'>
                        <PenSquareIcon className='size-4' />
                    </button>
                    <button className='btn btn-ghost btn-error btn-xs' onClick={(e) => handleDelete(e,note._id)}>
                        <Trash2Icon className='size-4' />
                    </button>
                </div>
            </div>
        </div>
    </Link>
    </div>
  )
}

export default NoteCard