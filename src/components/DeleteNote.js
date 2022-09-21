import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export const DeleteNote = (props) => {

    const { notes , deleteNote} = useContext(noteContext);
    const _id = props ;

    const handleClick = () =>{

        deleteNote(_id);
        props.showAlert("Your Note has been Deleted Successfully","danger")

    }


  return (
    <>
        <i className="fa-solid fa-trash mx-2" onClick={handleClick}></i>
    </>
  )
}
