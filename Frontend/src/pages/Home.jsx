import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import axios from "axios";
import { ClimbingBoxLoader } from "react-spinners";
import NoteCard from '../components/NoteCard.jsx';
import api from '../libs/axios.js';
import NotesNotFound from '../components/NotesNotFound.jsx';

const Home = () => {
  const [RateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data.notes);
        setRateLimited(false);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching notes", error);
        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-[#001F3F] text-[#E0F2FF]">
      <Navbar />
      {RateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        <div className="relative isolate overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-center">
              {loading && <ClimbingBoxLoader color="#009DFF" />}
            </div>

            {notes.length === 0 && !loading && !RateLimited && <NotesNotFound />}

            {notes.length > 0 && !RateLimited && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
