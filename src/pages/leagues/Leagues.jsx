import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import Loading from '../../ui/Loading'
import SectionSeasons from './components/SectionSeasons'
import { useGetLeague } from '../../features/leagues.features'

const Leagues = () => {
    const { id } = useParams()
    const { data: league, isLoading, isError } = useGetLeague(id)

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar la liga!')

    return (
        <>
            <Navigate />
            <Container fluid>
                <Row className="my-2 mx-auto">
                    <Col xs={12} lg={8} className="  mx-auto">
                        <Breadcrumb className="p-2">
                            <div className="breadcrumb-item">
                                <Link to={`../sports/${league?.sport?._id}`}>
                                    {league?.sport?.sport}
                                </Link>
                            </div>
                            <Breadcrumb.Item active>
                                {league?.league}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col xs={12} lg={8} className=" my-2 mx-auto">
                        <SectionSeasons league={league} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Leagues
