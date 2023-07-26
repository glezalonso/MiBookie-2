import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import SectionRounds from './components/SectionRounds'
import Loading from '../../ui/Loading'
import { useGetSeason } from '../../features/seasons.features'
import SectionStandings from './components/SectionStandings'
import SectionParticipants from './components/SectionParticipants'
import SectionTeams from './components/SectionTeams'

const Seasons = () => {
    const { id } = useParams()
    const { data: season, isLoading, isError } = useGetSeason(id)

    if (isLoading) return <Loading />
    if (isError) return toast.error('failed to load!')

    return (
        <>
            <Navigate />

            <Container fluid>
                <Row className="my-2 mx-auto">
                    <Col xs={12} lg={8} className="mx-auto ">
                        <Breadcrumb className=" p-2">
                            <div className="breadcrumb-item">
                                <Link to={`../sports/${season?.sport?._id}`}>
                                    {season?.sport?.sport}
                                </Link>
                            </div>
                            <div className="breadcrumb-item">
                                <Link to={`../leagues/${season?.league?._id}`}>
                                    {season?.league?.league}
                                </Link>
                            </div>
                            <Breadcrumb.Item active>
                                {season?.season}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col xs={12} lg={5} className="mx-auto my-2">
                        <SectionRounds season={season} />
                    </Col>
                    <Col xs={12} lg={5} className=" mx-auto my-2 ">
                        <SectionStandings season={season} />
                    </Col>
                </Row>
                <Row className="my-2 mx-auto">
                    <Col xs={12} lg={5} className="mx-auto my-2">
                        <SectionParticipants season={season} />
                    </Col>
                    <Col xs={12} lg={5} className="mx-auto my-2">
                        <SectionTeams season={season} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Seasons
