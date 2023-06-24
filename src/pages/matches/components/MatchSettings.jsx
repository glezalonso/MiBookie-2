import React from 'react'
import { Col } from 'react-bootstrap'
import { useGetTeams } from '../../../features/teams.features'
import TeamSettings from './TeamSettings'
import Roster from './Roster'

const MatchSettings = ({ match, handleRemoveLineUp, handleAddLineUp }) => {
  const { data: teams } = useGetTeams()

  const rostLocal = teams?.filter(team => team._id === match?.local?._id)
  const rostAway = teams?.filter(team => team._id === match?.away?._id)

  return (
        <>

            <Col lg={6} className='p-2'>
            <h5 className='h5 mt-1'><center><strong>Local team settings</strong></center></h5 >
            <br />
            <h5 className="h5">LineUp</h5>
            <TeamSettings match={match} handleRemoveLineUp={handleRemoveLineUp} type={'local'}/>
           <h5 className="h5">Roster</h5>
           <Roster match={match} roster={rostLocal} handleAddLineUp={handleAddLineUp} type={'local'}/>
            </Col>
            <Col lg={6} className='p-2' >
            <h5 className='h5 mt-1'><center><strong>Away team settings</strong></center></h5 >
            <br />
            <h5 className="h5">LineUp</h5>
            <TeamSettings match={match} handleRemoveLineUp={handleRemoveLineUp} type={'away'}/>
            <h5 className="h5">Roster</h5>
            <Roster match={match} roster={rostAway} handleAddLineUp={handleAddLineUp} type={'away'}/>
            </Col>

        </>
  )
}

export default MatchSettings
