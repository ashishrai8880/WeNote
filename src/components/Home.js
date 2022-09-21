import React from 'react'

import { Notes } from './Notes'

export const Home = (props) => {


  return (
    <div>
      {/* { localStorage.getItem('token')===null ? navigate('/login') : <Notes showAlert={props.showAlert}/>} */}
      <Notes showAlert={props.showAlert} />
    </div>
  )
}
