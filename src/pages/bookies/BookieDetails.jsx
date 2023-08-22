import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
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
            <Container fluid className="p-0 ">
                <Row className="my-2 p-1  mx-auto">
                    <Col
                        xs={12}
                        md={10}
                        className="bg-light rounded  mx-auto p-1"
                    >
                        <Table responsive size="sm" borderless>
                            <thead className="border-bottom">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Usuario</th>
                                    <th>Email</th>
                                    <th>Votos antes</th>
                                    <th>Votos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{bookie?.fullName}</td>
                                    <td>{bookie?.username}</td>
                                    <td>{bookie?.email}</td>
                                    <td>{bookie?.votes?.length}</td>
                                    <td>{bookie?.total}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default BookieDetails
