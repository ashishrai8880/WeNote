import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [ ];

    const [notes, setNotes] = useState(notesInitial);
    

    //Add a note
    const getNotes = async () => {
        // Calling API to get all notes
        const url = `${host}/api/notes/fetchallnotes`
        // console.log(localStorage.getItem('token'));

        const response = await fetch(url, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json' ,
                "auth-token" : `${localStorage.getItem('token')}` ,
                
            },

            
        });
        const getAllNotes = await response.json();
        // console.log(json);
        setNotes(getAllNotes);


    }

    //Add a note
    const addNote = async ({ title, description, tag }) => {
        //To Do API call
        const url = `${host}/api/notes/addnote`

        const response = await fetch(url, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json' ,
                "auth-token" : `${localStorage.getItem('token')}`
            },
            body : JSON.stringify({title , description , tag}) 
            
        });
        const newNote = await response.json();
        // console.log(newNote);


        // console.log("adding a new note");
        

        //concat returns an array where as push updates an array
        // setNotes(notes.push(note))
        setNotes(notes.concat(newNote));
    }

    //Delete a Note
    const deleteNote =async (_id) => {
        //Calling API
        const url = `${host}/api/notes/deletenote/${_id.note}`

        const response = await fetch(url, {
            method: 'DELETE',

            headers: {
                'Content-Type': 'application/json' ,
                "auth-token" : `${localStorage.getItem('token')}`
            },
           
            
        });
        // const result = await response;
        // console.log(result);

        //changing into frontend
        // console.log("deleting note");
        // console.log(_id);
        setNotes(notes.filter((note) => { return note._id !== _id.note }))

    }

    //Edit a Note
    const editNote = async (id , title , description , tag) => {
        //API Call
        const url = `${host}/api/notes/updatenote/${id}`

        const response = await fetch(url, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json' ,
                "auth-token" : `${localStorage.getItem('token')}`
            },
            body : JSON.stringify({title , description , tag}) 
            
        });
        // const updatedNote = await response.json();
        // console.log(updatedNote);

        //Logic to change in note for frontend
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title ;
                newNotes[index].description = description ;
                newNotes[index].tag = tag ;
                break ;
            }
            
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;