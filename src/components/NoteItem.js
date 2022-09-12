import React from 'react'

export const NoteItem = (props) => {

    const { note } = props;

    return (
        
        <div className='col-md-3'>
            
            <div className="card my-3" >
                    {/* <img src={`https://source.unsplash.com/720x400/?${note.title}`} className="card-img-top" alt="Not Found"/> */}
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description} Lorem ipsum dolor </p>
                        
                        <i className="fa-solid fa-trash mx-2"></i>
                        <i className="fa-solid fa-pen-to-square mx-2"></i>
                    </div>
            </div>
        </div>
    )
}
