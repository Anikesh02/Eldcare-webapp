import React from 'react'
import Home from '../pages/Home'
import ContactApp from '../ContactApp'
// import Services from '../pages/Services'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import Doctors from '../pages/Doctors/Doctors'
import DoctorDetails from '../pages/Doctors/DoctorDetails'
// import SidePanel from '../pages/Doctors/SidePanel'
import Appointment from '../pages/Doctors/Appointment'

import {Routes, Route} from 'react-router-dom'
import Notifications from '../pages/Notification'


const Routers = () => {
  return <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/contact' element={<ContactApp/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/doctors' element={<Doctors/>}></Route>
    <Route path='/doctors/:id' element={<DoctorDetails/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Signup/>}></Route>
    <Route path='/contactUs' element={<Contact/>}></Route>
    <Route path='/services' element={<Notifications/>}></Route>
    <Route path='/appointment' element={<Appointment/>}></Route>
    
  </Routes>
  
}

export default Routers