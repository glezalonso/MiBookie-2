import React from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Container, Row, Col } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import Loading from '../../ui/Loading'
import SectionTeam from './components/SectionTeam'
import SectionMatches from './components/SectionMatches'
import SectionRoster from './components/SectionRoster'
import SectionPlayers from './components/SectionPlayers'
import SectionNextMatches from './components/SectionNextMatches'
import { useGetTeam } from '../../features/teams.features'

const TeamDetail = () => {
    const { id } = useParams()
    const { data: team, isLoading, isError } = useGetTeam(id)

    if (isLoading) return <Loading />
    if (isError) return toast.error('failed to load!')

    return (
        <>
            <Navigate />
            <Container fluid>
                <Row className="my-2 mx-auto ">
                    <Col xs={12} md={10} className="mx-auto">
                        <SectionTeam team={team} />
                    </Col>
                </Row>
                <Row className="my-2p">
                    <Col xs={12} md={5} className="mx-auto my-1">
                        <SectionMatches team={team} />
                    </Col>
                    <Col xs={12} md={5} className="mx-auto my-1">
                        <SectionNextMatches team={team} />
                    </Col>
                </Row>
                <Row className="my-3 mx-auto rounded">
                    <Col xs={12} md={5} className="mx-auto my-1">
                        <SectionRoster team={team} />
                    </Col>
                    <Col xs={12} md={5} className="mx-auto my-1">
                        <SectionPlayers team={team} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TeamDetail
