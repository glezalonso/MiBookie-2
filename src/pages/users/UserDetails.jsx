import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { useGetUser } from '../../features/users.features'
import Navigate from '../../ui/Navigate'
import Loading from '../../ui/Loading'

const UserDetails = () => {
    const { id } = useParams()
    const { data: user, isLoading, isError } = useGetUser(id)

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar el usuario!')

    return (
        <>
            <Navigate />

            <Container fluid>
                <Row className="my-2 p-1  mx-auto">
                    <Col xs={12} md={11} className="mx-auto p-1 fs-4">
                        <section>
                            <Card bg="light">
                                <Card.Header>
                                    <Card.Title>{user?.fullName}</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Subtitle>
                                        Usuario: {user?.username}
                                    </Card.Subtitle>
                                    <Card.Text>Email: {user?.email}</Card.Text>
                                    <Card.Text>
                                        Rol:{' '}
                                        {user?.isAdmin ? (
                                            <strong>Administrador</strong>
                                        ) : (
                                            <strong>Usuario</strong>
                                        )}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </section>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserDetails
