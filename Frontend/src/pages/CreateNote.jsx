import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../libs/axios';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      await api.post('/notes', { title, content });
      toast.success('Note created successfully');
      navigate('/');
    } catch (error) {
      console.error('Error creating note', error);
      if (error.response?.status === 429) {
        setRateLimited(true);
      } else {
        toast.error('Failed to create note');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001F3F] text-[#E0F2FF]">
      {rateLimited ? (
        <RateLimitedUI />
      ) : (
        <div className="container mx-auto py-6 px-4">
          <div className="relative isolate overflow-hidden">
            {/* Blue Radial Gradient Background */}
            <div className="relative z-10 p-4">
              <div className="max-w-2xl mx-auto">
                <Link to="/" className="btn btn-outline btn-accent mt-6">
                  <ArrowLeftIcon className="size-5 mr-2" />
                  Back to Notes
                </Link>

                <div className="card bg-[#002B5B] shadow-lg mt-6">
                  <div className="card-body">
                    <h2 className="card-title mb-4 text-2xl text-[#E0F2FF]">Create New Note</h2>

                    <form onSubmit={handleSubmit}>
                      <div className="form-control mb-4">
                        <label className="label pb-2">
                          <span className="label-text text-[#E0F2FF]">Title</span>
                        </label>
                        <input
                          type="text"
                          placeholder="The Note's Title"
                          className="input input-bordered w-full bg-[#001F3F] text-[#E0F2FF] border-[#009DFF] placeholder:text-[#5BAEFF]"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div className="form-control mb-4">
                        <label className="label pb-2">
                          <span className="label-text text-[#E0F2FF]">Content</span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered h-32 w-full bg-[#001F3F] text-[#E0F2FF] border-[#009DFF] placeholder:text-[#5BAEFF]"
                          placeholder="Write your note here"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                      </div>

                      <div className="card-actions justify-end">
                        <button
                          className="btn bg-[#009DFF] text-white hover:bg-[#00B7FF]"
                          disabled={loading}
                        >
                          {loading ? 'Creating...' : 'Create Note'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNote;
