import React from 'react'
import { getMatches } from '../../../services/matches'
import { Table, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const SectionMatches = ({ team }) => {
  const { data: matches } = useQuery({ queryKey: ['matches'], queryFn: getMatches })
  const filterMatches = matches?.filter(match => match?.local?._id === team?._id || match?.away?._id === team?._id)

  return (
        <>
        <h4>Matches</h4>
        {(filterMatches?.length > 0)
          ? <Table responsive variant="dark" hoc striped >
            <thead>
                <tr>
                    <th>Date</th>
                    <th>League</th>
                    <th>Season</th>
                    <th>Round</th>
                    <th>Status</th>
                    <th>Teams</th>
                    <th>Options</th>

                </tr>
            </thead>
            <tbody>
            {filterMatches?.map(match => (
            <tr key={match._id} >
             <td>{match?.date?.split('T')[0]}</td>
             <td>{match?.league?.league}</td>
             <td>{match?.season?.season}</td>
             <td>{match?.round?.round}</td>
             <td>{(match?.status) ? 'Open' : 'Close'}</td>
             <td>{match?.local?.name} <strong> {match?.score?.map(score => score.local)}</strong> vs {match.away.name} <strong> {match?.score?.map(score => score.local)}</strong></td>
            <td><Link className="btn btn-info" to={`/matches/${match?._id}`}>Details</Link></td>
            </tr>
            ))}
              </tbody>
            </Table>
          : <Alert variant='warning'>There is no information to show!</Alert>}

        </>
  )
}

export default SectionMatches
