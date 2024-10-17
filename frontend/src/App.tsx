import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './pages/Home'
const App = () => {
  return (
    <>
    <Home></Home>
    <Outlet></Outlet>
    </>
  )
}

export default App
