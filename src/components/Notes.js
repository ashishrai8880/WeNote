import React, {useState , useRef} from 'react'
import noteContext from '../context/notes/noteContext'
import { useContext, useEffect } from 'react'
import { NoteItem } from './NoteItem'
import { AddNote } from './AddNote'


export const Notes = () => {

    const { notes, addNote, getNotes , editNote} = useContext(noteContext);

    const [note, setNote] = useState({eId:""  , etitle:"",edescription:"",etag:""})

    useEffect(() => {
        getNotes();
    }, [])

    const updateNote = (currentNote) => {
        console.log("updating");
        //indicating that modal button is clicked
        ref.current.click();

        setNote({eId : currentNote._id ,etitle : currentNote.title , edescription : currentNote.description , etag : currentNote.tag});

    }

    const handleClick = (e)=>{
        //adding new note
        e.preventDefault();
        console.log("Updating your note");
        ref.current.click();
        editNote( note.eId , note.etitle , note.edescription , note.etag)
    }

    const onChange = (e) =>{
        // console.log(e.target.name);
        e.preventDefault();
        setNote({ ...note , [e.target.name] : e.target.value });
        
    }

    const ref = useRef(null)

    return (
        <>
            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit Note
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input value={note.etitle} type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} required minLength={5}/>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input value={note.edescription} type="text" className="form-control" id="edescription" name='edescription' onChange={onChange}  required minLength={5}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input value={note.etag} type="text" className="form-control" id="etag" name='etag' onChange={onChange} required minLength={5}/>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  disabled={note.etitle.length <= 5 || note.edescription.length <= 5}  type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h2>Your Notes</h2>
                {notes.length === 0 && "You have no notes "}
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}

            </div>
        </>

    )
}
