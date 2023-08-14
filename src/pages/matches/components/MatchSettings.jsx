import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useGetTeamsBySport } from '../../../features/teams.features'
import TeamSettings from './TeamSettings'
import Roster from './Roster'

const MatchSettings = ({ match, handleRemoveLineUp, handleAddLineUp }) => {
    const { data: teams } = useGetTeamsBySport(match?.sport?._id)

    const rostLocal = teams?.filter((team) => team._id === match?.local?._id)
    const rostAway = teams?.filter((team) => team._id === match?.away?._id)

    return (
        <>
            <Row className="m-2 mx-auto">
                <Col xs={12} lg={5} className="mx-auto my-1 min-vh-75">
                    <Roster
                        match={match}
                        roster={rostLocal}
                        handleAddLineUp={handleAddLineUp}
                        type={'local'}
                    />
                </Col>

                <Col xs={12} lg={5} className=" mx-auto my-1  min-vh-50">
                    <TeamSettings
                        match={match}
                        handleRemoveLineUp={handleRemoveLineUp}
                        type={'local'}
                    />
                </Col>
            </Row>
            <Row className="m-2  mx-auto">
                <Col md={5} className="mx-auto my-1 min-vh-75">
                    <Roster
                        match={match}
                        roster={rostAway}
                        handleAddLineUp={handleAddLineUp}
                        type={'away'}
                    />
                </Col>
                <Col md={5} className="mx-auto my-1">
                    <TeamSettings
                        match={match}
                        handleRemoveLineUp={handleRemoveLineUp}
                        type={'away'}
                    />
                </Col>
            </Row>
        </>
    )
}

export default MatchSettings
