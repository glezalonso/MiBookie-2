import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Unprotected = ({ isLogged }) => {
  if (isLogged) return <Navigate to={'/home'} />
  else return <Outlet />
}

export default Unprotected
