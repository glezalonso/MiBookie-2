import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import { toast } from 'react-hot-toast'
import Loading from '../../ui/Loading'
import SectionLeagues from './components/SectionLeagues'
import { useGetSport } from '../../features/sports.features'

const SportDetails = () => {
    const { id } = useParams()
    const { data: sport, isLoading, isError } = useGetSport(id)

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar el deporte!')

    return (
        <>
            <Navigate />
            <Container fluid>
                <Row className="my-2 mx-auto">
                    <Col md={8} className="bg-black text-light my-2 mx-auto">
                        <Breadcrumb className="mx-auto my-2 p-2">
                            <Breadcrumb.Item className="text-light" active>
                                {sport?.sport}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col
                        md={8}
                        className="bg-dark text-light rounded my-2 mx-auto"
                    >
                        <SectionLeagues sport={sport} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SportDetails
