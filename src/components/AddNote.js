import React, { useContext ,useState } from 'react'
import noteContext from '../context/notes/noteContext'

export const AddNote = (props) => {

    const {addNote} = useContext(noteContext);
    const [note, setNote] = useState({title:"",description:"",tag:"We are genius "})

    const handleClick = (e)=>{
        //adding new note
        e.preventDefault();
        addNote(note);
        props.showAlert("Your New Note has been added successfully","success")
        
    }

    const onChange = (e) =>{
        // console.log(e.target.name);
        e.preventDefault();
        setNote({ ...note , [e.target.name] : e.target.value });
        
    }

    return (
        <div>
            <h1>Add a Note</h1>

            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" required minLength={5}  onChange={onChange}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" required minLength={5}  className="form-control" id="description" name='description' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" required minLength={5} className="form-control" id="tag" name='tag' onChange={onChange}/>
                </div>
                
                <button disabled={note.title.length <= 5 || note.description.length <= 5}  type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}
