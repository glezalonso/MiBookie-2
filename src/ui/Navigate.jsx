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
    <Navbar expand="md" >
      <Container fluid>
        <Navbar.Brand className='text-light'>Mi Bookie Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            <Nav.Item ><Link to={'../home'} className='nav-link text-secondary'>Home</Link></Nav.Item>
            <Nav.Item ><Link to={'../players'} className='nav-link text-secondary'>Players</Link></Nav.Item>
            <Nav.Item ><Link to={'../teams'} className='nav-link text-secondary'>Teams</Link></Nav.Item>
            <Nav.Item ><Link to={'../sports'} className='nav-link text-secondary'>Sports</Link></Nav.Item>
            <Nav.Item ><Link to={'../users'} className='nav-link text-secondary'>Users</Link></Nav.Item>
          </Nav>
            <Button variant="warning" onClick={() => handleLogOut()}>Log out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
  )
}
export default Navigate
