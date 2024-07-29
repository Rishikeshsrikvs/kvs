import React from 'react'
import "./Blogland.css"
import nearrow from './../../assets/images/ne arrow.svg';
const Blogland = () => {
  return (
    <div className="landblogcordcon">
        <div className="landblogcard">
            <div className="lbimg">
                <img src="" alt="" />
            </div>
            <div className="lbdetail">
                <h2>Earn money</h2>
                <p>The shuttering of Koo, a microblogging website similar to Twitter (now X), has rekindled discussions about why India doesn’t have its own Google, Facebook, or WhatsApp, and whether a protectionist approach like China’s is necessary</p>
                <h3>Tag : Business</h3>
                <span className="lbarrow"><img src={nearrow} alt="" /></span>
            </div>
        </div>
        <div className="landblogcard">
            <div className="lbimg">
                <img src="" alt="" />
            </div>
            <div className="lbdetail">
                <h2>Earn money</h2>
                <p>The shuttering of Koo, a microblogging website similar to Twitter (now X), has rekindled discussions about why India doesn’t have its own Google, Facebook, or WhatsApp, and whether a protectionist approach like China’s is necessary</p>
                <h3>Tag : Business</h3>
                <span className="lbarrow"><img src={nearrow} alt="" /></span>
            </div>
        </div>
        <div className="landblogcard">
            <div className="lbimg">
                <img src="" alt="" />
            </div>
            <div className="lbdetail">
                <h2>Earn money</h2>
                <p>The shuttering of Koo, a microblogging website similar to Twitter (now X), has rekindled discussions about why India doesn’t have its own Google, Facebook, or WhatsApp, and whether a protectionist approach like China’s is necessary</p>
                <h3>Tag : Business</h3>
                <span className="lbarrow"><img src={nearrow} alt="" /></span>
            </div>

        </div>
    </div>
  )
}

export default Blogland
