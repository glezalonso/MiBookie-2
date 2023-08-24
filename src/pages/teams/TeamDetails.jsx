import React from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Container, Row, Col } from 'react-bootstrap'
import { useGetTeam } from '../../features/teams.features'
import Navigate from '../../ui/Navigate'
import Loading from '../../ui/Loading'
import CardTeam from './components/CardTeam'
import SectionRoster from './components/SectionRoster'
import SectionPlayers from './components/SectionPlayers'
import SectionMatches from './components/SectionMatches'

const TeamDetail = () => {
    const { id } = useParams()
    const { data: team, isLoading, isError } = useGetTeam(id)

    if (isLoading) return <Loading />
    if (isError) return toast.error('failed to load!')

    return (
        <>
            <Navigate />
            <Container fluid className="p-0">
                <Row className="my-2  mx-auto">
                    <Col xs={12} md={8} className="mx-auto">
                        <CardTeam team={team} />
                    </Col>
                </Row>
                <Row className="d-flex my-2 justify-content-center mx-auto">
                    <Col xs={12} md={4} className="my-1 vh-100 overflow-auto">
                        <SectionMatches
                            team={team}
                            status={false}
                            title={'Último'}
                        />
                    </Col>
                    <Col xs={12} md={4} className="my-1 vh-100 overflow-auto">
                        <SectionMatches
                            team={team}
                            status={true}
                            title={'Próximos'}
                        />
                    </Col>
                </Row>
                <Row className="d-flex my-2 justify-content-center mx-auto ">
                    <Col
                        xs={12}
                        md={4}
                        className="mr-auto my-1 vh-100 overflow-auto"
                    >
                        <SectionRoster team={team} />
                    </Col>
                    <Col
                        xs={12}
                        md={4}
                        className="ml-auto my-1 vh-100 overflow-auto"
                    >
                        <SectionPlayers team={team} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TeamDetail
