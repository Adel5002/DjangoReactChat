import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Features from '../pages/Features'
import Home from './Home'
import Room from '../pages/Room'



const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/features' element={<Features />} />
      <Route path='/ws/room/:name' element={<Room />} />
    </Routes>
  )
}

export default AppRouter