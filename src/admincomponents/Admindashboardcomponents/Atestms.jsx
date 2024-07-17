import React from 'react'
import "./Atestms.css"
import { Feedbackcard } from './Feedbackcard'
export const Atestms = () => {
  return (
    <div className='maincontainer'>
      <div className="title">
        <h1>WHAT OUR CLIENTS SAYS</h1>
      </div>
      <div className="cardcontainer">
          <Feedbackcard/>
          <Feedbackcard/>
          <Feedbackcard/>
          <Feedbackcard/>
          <Feedbackcard/>
          <Feedbackcard/>
          <Feedbackcard/>
          <Feedbackcard/>
          <Feedbackcard/>
      </div>

    </div>
  )
}
