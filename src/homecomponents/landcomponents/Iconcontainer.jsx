import React from 'react'

import ae from './../../assets/images/sm logo/ae.svg';
import ai from './../../assets/images/sm logo/AI.svg';
import canva from './../../assets/images/sm logo/canva.svg';
import fb from './../../assets/images/sm logo/facebook.svg';
import figma from './../../assets/images/sm logo/figmalogo.svg';
import insta from './../../assets/images/sm logo/instagram.svg';
import linkedin from './../../assets/images/sm logo/linkedinlogo.svg';
import ps from './../../assets/images/sm logo/photoshop.svg';
import pin from './../../assets/images/sm logo/pintrest.svg';
import pr from './../../assets/images/sm logo/PR.svg';
import teams from './../../assets/images/sm logo/teamslogo.svg';
import trello from './../../assets/images/sm logo/trello.svg';
import wh from './../../assets/images/sm logo/whatsapplogo.svg';
import x from './../../assets/images/sm logo/x.svg';
import bloger from './../../assets/images/sm logo/bloger.svg';




export const Iconcontainer = () => {
  return (
    <div><div className='iconflexcontainer'>
    <div className="iconrow">
        <img src={ai} alt=""  className=''/>
        <img src={insta} alt="" className=''/>
        <img src={figma} alt="" className=''/>
        <img src={ae} alt="" className=''/>
    </div>
    <div className="iconrow">
        <img src={pin} alt="" className=''/>
        <img src={trello} alt="" className=''/>
        <img src={pr} alt="" className=''/>
        <img src={fb} alt="" className=''/>
        <img src={ps} alt="" className=''/>
        <img src="" alt="" className=''/>
    </div>
    <div className="iconrow">
        <img src={x} alt="" className=''/>
        <img src={teams} alt="" className=''/>
        <img src={canva} alt="" className=''/>
        <img src={linkedin} alt="" className=''/>
        <img src={wh} alt="" className=''/>
        <img src={bloger} alt="" className=''/>
    </div>

</div></div>
  )
}
