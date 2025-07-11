import Note from "../models/Note.js"

export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json({notes});
    } catch (error) {
        console.error("Error getting Notes from Server", error);
        res.status(500).json({ message:"Internal Server Error" });
    }
};

export const getNoteByID = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found"});
        res.status(200).json({note});
    } catch (error) {
        console.error("Error getting Notes by id from Server", error);
        res.status(500).json({ message:"Internal Server Error" });
    }
};

export const createNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content});

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error creating Note", error);
        res.status(500).json({ message:"Internal Server Error" });
    }
};

export const updateNote = async (req, res) => {
    try {
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});

        if(!updatedNote) return res.status(404).json({message:"Note not found"});

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error updating Note", error);
        res.status(500).json({ message:"Internal Server Error" });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const {title,content} = req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id,{title,content});

        if(!deletedNote) return res.status(404).json({message:"Note not found"});

        res.status(200).json({message:"Note not found"});
    } catch (error) {
        console.error("Error deleting Note", error);
        res.status(500).json({ message:"Internal Server Error" });
    }
};