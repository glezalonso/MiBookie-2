import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useGetTeams } from '../../../features/teams.features'
import TeamSettings from './TeamSettings'
import Roster from './Roster'

const MatchSettings = ({ match, handleRemoveLineUp, handleAddLineUp }) => {
  const { data: teams } = useGetTeams()

  const rostLocal = teams?.filter(team => team._id === match?.local?._id)
  const rostAway = teams?.filter(team => team._id === match?.away?._id)

  return (
        <>

        <Row className='m-2 p-2 mx-auto'>
          <Col md={5} className='border rounded mx-auto mt-2 p-3 fs-6'>
          <h5 className="h5">LineUp Local</h5>
            <TeamSettings match={match} handleRemoveLineUp={handleRemoveLineUp} type={'local'}/>
          </Col>
          <Col md={5} className='border rounded mx-auto mt-2 p-3 fs-6'>
          <h5 className="h5">LineUp Away</h5>
            <TeamSettings match={match} handleRemoveLineUp={handleRemoveLineUp} type={'away'}/>
          </Col>
            </Row>
            <Row className='m-2 p-2 mx-auto'>
            <Col md={5} className='border rounded mx-auto mt-1 p-3 fs-6' >

           <h5 className="h5">Roster</h5>
           <Roster match={match} roster={rostLocal} handleAddLineUp={handleAddLineUp} type={'local'}/>
            </Col >
            <Col md={5}className='border rounded mx-auto mt-1 sp-3 fs-6' >
            <h5 className="h5">Roster</h5>
            <Roster match={match} roster={rostAway} handleAddLineUp={handleAddLineUp} type={'away'}/>
            </Col>
            </Row>

        </>
  )
}

export default MatchSettings
