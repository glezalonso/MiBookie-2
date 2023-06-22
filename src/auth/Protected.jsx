import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import decode from 'jwt-decode'

const Protected = ({ isLogged }) => {
  const auth = useAuthStore(state => state.auth)
  const logOut = useAuthStore(state => state.logOut)

  if (!isLogged) {
    return <Navigate to={'/'} />
  } else if (auth && Date.now() >= decode(auth).exp * 1000) {
    logOut()
  } else {
    return <Outlet />
  }
}

export default Protected
