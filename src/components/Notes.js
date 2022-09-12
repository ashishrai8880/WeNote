import React from 'react'
import noteContext from '../context/notes/noteContext'
import { useContext } from 'react'
import { NoteItem } from './NoteItem'


export const Notes = () => {

    const { notes, setNotes } = useContext(noteContext);

    return (
        <div className='row my-3'>
            <h2>Your Notes</h2>
            {notes.map((note) => {
                return <NoteItem key={note._id} note={note}/>
            })}

        </div>
    )
}