import React from 'react'

export const Feedbackcard = () => {
  return (
    <div className='feedbackcard'>
        <div className="feedback">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, magni soluta! Eveniet minus consequuntur quisquam tempore inventore quod debitis quasi corporis ducimus at, id veritatis sunt, quia excepturi, aliquam nulla.</div>
        <div className="clientcontainer">
            <div className='client'>
                <img src="" alt="" />
                <span>
                    <h4>Expertai</h4>
                    <h5>avadi,chennai</h5>
                </span>
            </div>
            <span className='clientlogo'>logo</span>
        </div>
        <div className="action">
            <button className='reject'>Reject</button>
            <button className='approve'>Approve</button>
        </div>
    </div>
  )
}
