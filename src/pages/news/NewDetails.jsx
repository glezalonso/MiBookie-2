import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { useGetNew } from '../../features/news.features'
import Navigate from '../../ui/Navigate'
import Loading from '../../ui/Loading'

const NewDetails = () => {
    const { id } = useParams()
    const { data: notice, isLoading, isError } = useGetNew(id)

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar la noticia!')

    return (
        <>
            <Navigate />
            <Container fluid>
                <Row className="m-2 p-2 mx-auto">
                    <Col
                        xs={12}
                        md={11}
                        className="border rounded mx-auto p-4 fs-4"
                    >
                        <Card bg="light">
                            <Card.Header>
                                <Card.Title>{notice?.sport?.sport}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Subtitle>
                                    {' '}
                                    {notice?.date
                                        ?.split('T', 3)
                                        .reverse()
                                        .join(' ')}
                                </Card.Subtitle>
                                <Card.Text> {notice?.content}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NewDetails
