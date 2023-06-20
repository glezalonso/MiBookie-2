import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Col } from 'react-bootstrap'
import { getTeams } from '../../../services/teams'

import TeamSettings from './TeamSettings'
import Roaster from './Roaster'

const MatchSettings = ({ match, handleRemoveLineUp, handleAddLineUp, setLoading }) => {
  const { data: teams } = useQuery({ queryKey: ['teams'], queryFn: getTeams })

  const rostLocal = teams?.filter(team => team._id === match?.local?._id)
  const rostAway = teams?.filter(team => team._id === match?.away?._id)

  return (
        <>

            <Col className="border border-secondary">
            <h3><center><strong>Local team settings</strong></center></h3>
            <br />
            <h5 className="h5">LineUp</h5>
           <TeamSettings match={match} handleRemoveLineUp={handleRemoveLineUp} type={'local'}/>
           <h5 className="h5">Roster</h5>
           <Roaster match={match} roster={rostLocal} handleAddLineUp={handleAddLineUp} type={'local'}/>
            </Col>
            <Col className="border border-secondary">
            <h3><center><strong>Away team settings</strong></center></h3>
            <br />
            <h5 className="h5">LineUp</h5>
            <TeamSettings match={match} handleRemoveLineUp={handleRemoveLineUp} type={'away'}/>
            <h5 className="h5">Roster</h5>
            <Roaster match={match} roster={rostAway} handleAddLineUp={handleAddLineUp} type={'away'}/>
            </Col>

        </>
  )
}

export default MatchSettings
