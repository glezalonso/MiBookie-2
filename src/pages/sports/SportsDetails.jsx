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
                <Row className="mt-1 mx-auto">
                    <Col md={8} className=" mx-auto">
                        <Breadcrumb className="p-1 ">
                            <Breadcrumb.Item active>
                                {sport?.sport}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={8} className="my-1 mx-auto">
                        <SectionLeagues sport={sport} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SportDetails
