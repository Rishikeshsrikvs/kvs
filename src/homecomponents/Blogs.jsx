import React from 'react'
import "./Blogs.css"
import bb1 from './../assets/images/Blogs/bb1.png';
import bb2 from './../assets/images/Blogs/bb2.png';
import bb3 from './../assets/images/Blogs/bb3.png';
import bb4 from './../assets/images/Blogs/bb4.png';
import bb5 from './../assets/images/Blogs/bb5.png';
import bb6 from './../assets/images/Blogs/bb6.png';
import blogcard from './../assets/images/Blogs/blogcard.png';


const blogs=[
  {id:"1",}
]
const Blogs = () => {
  return (
    <div className='blogparent'>
      <div className="blog1main">
        <div className="blog1back">
            <div><img src={bb1} alt="" /></div>
            <div><img src={bb2} alt="" /></div>
            <div><img src={bb3} alt="" /></div>
            <div><img src={bb4} alt="" /></div>
            <div><img src={bb5} alt="" /></div>
            <div><img src={bb6} alt="" /></div>

        </div>
        <div className="blog1sub">
                <h1>Unraveling the Unsolvable: <br/>
                Your Blogging Solutions Await!</h1>
        </div>
      </div>
      <div className="blog2latest">
        <h2> Latest one</h2>
        <div className='blogcon'>
            <div className="blogcard">
                <div className="blogcardimg"><img src={blogcard} alt="" /></div>
                <div className="blogdetail">
                  <h1 className="bgtiltle">BLOG1</h1>
                  <p>TAG : Business</p>
                </div>
            </div>
            <div className="blogcard">
                <div className="blogcardimg"><img src={blogcard} alt="" /></div>
                <div className="blogdetail">
                  <h1 className="bgtiltle">BLOG1</h1>
                  <p>TAG : Business</p>
                </div>
            </div>
            <div className="blogcard">
                <div className="blogcardimg"><img src={blogcard} alt="" /></div>
                <div className="blogdetail">
                  <h1 className="bgtiltle">BLOG1</h1>
                  <p>TAG : Business</p>
                </div>
            </div>
            <div className="blogcard">
                <div className="blogcardimg"><img src={blogcard} alt="" /></div>
                <div className="blogdetail">
                  <h1 className="bgtiltle">BLOG1</h1>
                  <p>TAG : Business</p>
                </div>
            </div>
        </div>
      </div>
      <div className="blog2latest">
        <h2> Latest one</h2>
        <div className='blogcon'>
            <div className="blogcard">
                <div className="blogcardimg"><img src={blogcard} alt="" /></div>
                <div className="blogdetail">
                  <h1 className="bgtiltle">BLOG1</h1>
                  <p>TAG : Business</p>
                </div>
            </div>
            <div className="blogcard">
                <div className="blogcardimg"><img src={blogcard} alt="" /></div>
                <div className="blogdetail">
                  <h1 className="bgtiltle">BLOG1</h1>
                  <p>TAG : Business</p>
                </div>
            </div>
            <div className="blogcard">
                <div className="blogcardimg"><img src={blogcard} alt="" /></div>
                <div className="blogdetail">
                  <h1 className="bgtiltle">BLOG1</h1>
                  <p>TAG : Business</p>
                </div>
            </div>
            <div className="blogcard">
                <div className="blogcardimg"><img src={blogcard} alt="" /></div>
                <div className="blogdetail">
                  <h1 className="bgtiltle">BLOG1</h1>
                  <p>TAG : Business</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Blogs
