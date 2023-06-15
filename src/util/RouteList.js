import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import RegisterPage from '../pages/AuthenticationPage/RegisterPage'

function RouteList() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/register' element={<RegisterPage/>} />
    </Routes>
  )
}

export default RouteList