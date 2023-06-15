import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'

function RouteList() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
    </Routes>
  )
}

export default RouteList