import React from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loading from '../../ui/Loading'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useGetPlayer } from '../../features/players.features'

const PlayerDetails = () => {
    const { id } = useParams()
    const { data: player, isLoading, isError } = useGetPlayer(id)

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar el jugador!')

    return (
        <>
            <Navigate />
            <Container fluid>
                <Row className="my-2 mx-auto">
                    <Col xs={12} md={11} className=" mx-auto fs-6">
                        <section>
                            <Card>
                                <Card.Header>
                                    <Card.Title>{player?.fullName}</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        Posición {player?.position}
                                    </Card.Text>
                                    <Card.Text>
                                        Equipo: {player?.team?.name}
                                    </Card.Text>
                                    <Card.Text>
                                        Deporte: {player?.sport?.sport}
                                    </Card.Text>
                                    <Card.Text>
                                        Estatus:{' '}
                                        {player?.status ? (
                                            <strong className="text-success">
                                                Activo
                                            </strong>
                                        ) : (
                                            <strong className="text-danger">
                                                Inactivo
                                            </strong>
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

export default PlayerDetails
