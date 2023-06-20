import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import decode from 'jwt-decode'

const Protected = ({ isLogged }) => {
  const token = useAuthStore(state => state.token)
  const logOut = useAuthStore(state => state.logOut)

  if (!isLogged) {
    return <Navigate to={'/'} />
  } else if (token && Date.now() >= decode(token).exp * 1000) {
    logOut()
  } else {
    return <Outlet />
  }
}

export default Protected
