import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import RegisterPage from '../pages/AuthenticationPage/RegisterPage'
import LoginPage from '../pages/AuthenticationPage/LoginPage'

function RouteList() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}

export default RouteList