import React, { useContext ,useState } from 'react'
import noteContext from '../context/notes/noteContext'

export const AddNote = () => {

    const {addNote} = useContext(noteContext);
    const [note, setNote] = useState({title:"",description:"",tag:""})

    const handleClick = (e)=>{
        //adding new note
        e.preventDefault();
        addNote(note);
        
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
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp"  onChange={onChange}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}
