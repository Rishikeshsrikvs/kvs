import React from 'react'
import { Header } from './homecomponents/Header'
import { Land } from './homecomponents/Land'
import { Footer } from './homecomponents/Footer'
import { Routes ,Route} from 'react-router-dom'
import Works from './homecomponents/Works'
import { About } from './homecomponents/About'
export const Home = () => {
  return (
    <div>
      <Header/>
     <main>
        <Routes>
          <Route path='/about' element={<About/>}/>
          <Route path='/' element={<Land/>}/>
          <Route path='/works' element={<Works/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}
