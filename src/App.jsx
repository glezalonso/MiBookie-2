// Dependencies
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Auth
import Unprotected from './auth/Unprotected'
import Protected from './auth/Protected'

// Unprotected Routes
import Login from './pages/Login'
import GenerateOTP from './pages/recovery/GenerateOTP'
import VerifyOTP from './pages/recovery/VeryfyOPT'
import ResetPassword from './pages/recovery/ResetPassword'

// Protected Routes
import Home from './pages/home/Home'
import Sports from './pages/sports/Sports'
import SportDetails from './pages/sports/SportsDetails'
import Leagues from './pages/leagues/Leagues'
import Seasons from './pages/seasons/Seasons'
import Rounds from './pages/rounds/Rounds'
import Players from './pages/players/Players'
import PlayerDetails from './pages/players/PlayerDetails'
import Teams from './pages/teams/Teams'
import TeamDetails from './pages/teams/TeamDetails'
import Matches from './pages/matches/Matches'

// Store
import { useAuthStore } from './store/auth'

const App = () => {
  const isLogged = useAuthStore(state => state.isLogged)

  return (
    <>
    <BrowserRouter>
     <Routes>
              <Route element={<Unprotected isLogged={isLogged}></Unprotected>}>
                <Route path="/" element={<Login />} />
                <Route path="/recovery" element={<GenerateOTP />} />
                <Route path="/verify" element={<VerifyOTP />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path="*" element={<h1>Not Found!</h1>} />
              </Route>

              <Route element={<Protected isLogged={isLogged} />}>
                    <Route path='/home' element={<Home/>} />
                    <Route path='/sports' element={<Sports />} />
                    <Route path='/sports/:id' element={<SportDetails />} />
                    <Route path='/players' element={<Players />} />
                    <Route path='/players/:id' element={<PlayerDetails />} />
                    <Route path='/teams' element={<Teams />} />
                    <Route path='/teams/:id' element={<TeamDetails />} />
                    <Route path='/leagues/:id' element={<Leagues />} />
                    <Route path='/seasons/:id' element={<Seasons />} />
                    <Route path='/rounds/:id' element={<Rounds />} />
                    <Route path='/matches/:id' element={<Matches />} />
                    <Route path="*" element={<h1>Not Found!</h1>} />
              </Route>

     </Routes>
     </BrowserRouter>

    </>
  )
}
export default App
