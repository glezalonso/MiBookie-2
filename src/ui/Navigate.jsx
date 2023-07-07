import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { useAuthStore } from '../store/auth'

const Navigate = () => {
  const logOut = useAuthStore(state => state.logOut)
  const navigate = useNavigate()
  const handleLogOut = () => {
    logOut()
    toast.success('Log out successfuly')
    navigate('/')
  }

  return (
        <>
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand >Mi Bookie Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto">
           <Link className='nav-link' to={'../home'} >Home</Link>
           <Link className='nav-link' to={'../players'} >Players</Link>
           <Link className='nav-link' to={'../teams'} >Teams</Link>
           <Link className='nav-link' to={'../sports'} >Sports</Link>
           <Link className='nav-link' to={'../news'} >News</Link>
           <Link className='nav-link' to={'../bookies'} >Bookies</Link>
           <Link className='nav-link' to={'../users'} >Users</Link>
          </Nav>
            <Button variant="warning" onClick={() => handleLogOut()}>Log out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
  )
}
export default Navigate
