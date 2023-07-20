import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { toast, Toaster } from 'react-hot-toast'
import { useGetBookie } from '../../features/bookies.features'
import Navigate from '../../ui/Navigate'
import Loading from '../../ui/Loading'

const BookieDetails = () => {
    const { id } = useParams()
    const { data: bookie, isLoading, isError } = useGetBookie(id)

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar los bookies!')

    return (
        <>
            <Navigate />
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <Container fluid>
                <Row className="my-2 p-1  mx-auto">
                    <Col
                        xs={12}
                        md={10}
                        className="bg-dark text-light rounded mx-auto p-1"
                    >
                        <Card bg="light">
                            <Card.Header>
                                <Card.Title>{bookie?.fullName}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Subtitle>
                                    Usuario: {bookie?.username}
                                </Card.Subtitle>
                                <Card.Text>Email: {bookie?.email}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default BookieDetails
