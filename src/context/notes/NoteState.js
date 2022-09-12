import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{

    const notesInitial = [
        {
            "_id": "62fc867fe686d5a8c62f4e6f",
            "user": "62fc864de686d5a8c62f4e6d",
            "title": "mango",
            "description": "Tomato lana hai",
            "tag": "Kuch bhi krle bhai",
            "date": "2022-08-17T06:11:11.800Z",
            "__v": 0
        },
        {
            "_id": "62fc868ce686d5a8c62f4e71",
            "user": "62fc864de686d5a8c62f4e6d",
            "title": "vegetables",
            "description": "Banana lana hai",
            "tag": "Kuch bhi krle bhai",
            "date": "2022-08-17T06:11:24.968Z",
            "__v": 0
        },
        {
            "_id": "631f35ca779f1dbca862aeb7",
            "user": "62fc864de686d5a8c62f4e6d",
            "title": "apple",
            "description": "notes 3",
            "tag": "notes 3 hai ashish2 k",
            "date": "2022-09-12T13:36:10.360Z",
            "__v": 0
        },
        {
            "_id": "631f35ff779f1dbca862aeb9",
            "user": "62fc864de686d5a8c62f4e6d",
            "title": "sweet",
            "description": "notes 4",
            "tag": "notes 3 hai ashish2 k",
            "date": "2022-09-12T13:37:03.756Z",
            "__v": 0
        }
    ]
    
    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes , setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState ;