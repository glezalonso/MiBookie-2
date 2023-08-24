import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '../store/auth'
import logo from '../assets/mibookie.png'

const Navigate = () => {
    const logOut = useAuthStore((state) => state.logOut)
    const isAdmin = useAuthStore((state) => state.isAdmin)
    const navigate = useNavigate()
    const handleLogOut = () => {
        logOut()
        toast.success('Cierre de sesión exitoso!')
        navigate('/')
    }

    return (
        <>
            <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container className="p-0">
                    <Link to={'../home'} className="navbar-brand d-flex">
                        <div>
                            <img
                                style={{ width: '33px', height: '33px' }}
                                src={logo}
                                alt="Mi Bookie"
                            />
                        </div>
                        <div className="mt-1 mx-1">Mi Bookie Panel</div>
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto">
                            <Link className="nav-link" to={'../home'}>
                                Inicio
                            </Link>
                            <Link className="nav-link" to={'../players'}>
                                Jugadores
                            </Link>
                            <Link className="nav-link" to={'../teams'}>
                                Equipos
                            </Link>
                            <Link className="nav-link" to={'../sports'}>
                                Deportes
                            </Link>
                            <Link className="nav-link" to={'../news'}>
                                Noticias
                            </Link>
                            {isAdmin ? (
                                <>
                                    <Link
                                        className="nav-link"
                                        to={'../bookies'}
                                    >
                                        Bookies
                                    </Link>
                                    <Link className="nav-link" to={'../users'}>
                                        Usuarios
                                    </Link>
                                </>
                            ) : null}
                        </Nav>
                        <Button
                            variant="warning"
                            onClick={() => handleLogOut()}
                        >
                            Cerrar Sesión
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Navigate
