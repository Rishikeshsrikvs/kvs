import React from 'react'
import { Header } from './homecomponents/Header'
import { Land } from './homecomponents/Land'
import Services from './homecomponents/Services'
import { Footer } from './homecomponents/Footer'
import { Routes ,Route} from 'react-router-dom'
import Works from './homecomponents/Works'
import Blogs from './homecomponents/Blogs'
import Career from './homecomponents/Career'
import { About } from './homecomponents/About'
export const Home = () => {
  return (
    <div>
      <Header/>
     <main>
        <Routes>
          <Route path='/' element={<Land/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/works' element={<Works/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/career' element={<Career/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}
