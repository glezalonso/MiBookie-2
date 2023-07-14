import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useGetTeams } from '../../../features/teams.features'
import TeamSettings from './TeamSettings'
import Roster from './Roster'

const MatchSettings = ({ match, handleRemoveLineUp, handleAddLineUp }) => {
    const { data: teams } = useGetTeams()

    const rostLocal = teams?.filter((team) => team._id === match?.local?._id)
    const rostAway = teams?.filter((team) => team._id === match?.away?._id)

    return (
        <>
            <Row className="m-2 mx-auto">
                <Col
                    md={5}
                    className="bg-dark text-light rounded mx-auto my-1 min-vh-100"
                >
                    <section>
                        <h5 className="h5">{match?.local?.name} plantilla</h5>
                        <Roster
                            match={match}
                            roster={rostLocal}
                            handleAddLineUp={handleAddLineUp}
                            type={'local'}
                        />
                    </section>
                </Col>

                <Col
                    md={5}
                    className="bg-dark text-light rounded mx-auto my-1  min-vh-100"
                >
                    <section>
                        <h5 className="h5">{match?.local?.name} alineación</h5>
                        <TeamSettings
                            match={match}
                            handleRemoveLineUp={handleRemoveLineUp}
                            type={'local'}
                        />
                    </section>
                </Col>
            </Row>
            <Row className="m-2  mx-auto">
                <Col
                    md={5}
                    className="bg-dark text-light rounded mx-auto my-1 min-vh-100"
                >
                    <section>
                        <h5 className="h5">{match?.away.name} plantilla</h5>
                        <Roster
                            match={match}
                            roster={rostAway}
                            handleAddLineUp={handleAddLineUp}
                            type={'away'}
                        />
                    </section>
                </Col>
                <Col
                    md={5}
                    className="bg-dark text-light rounded mx-auto my-1 fs-6"
                >
                    <section>
                        <h5 className="h5">{match?.away.name} alineación </h5>
                        <TeamSettings
                            match={match}
                            handleRemoveLineUp={handleRemoveLineUp}
                            type={'away'}
                        />
                    </section>
                </Col>
            </Row>
        </>
    )
}

export default MatchSettings
