import React from 'react'
import { getMatches } from '../../../services/matches'
import { Table, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const SectionNextMatches = ({ team }) => {
  const { data: matches } = useQuery({ queryKey: ['matches'], queryFn: getMatches })
  const filterMatches = matches?.filter(match => match?.local?._id === team?._id || match?.away?._id === team?._id)
  const nextMatches = filterMatches?.filter(match => match?.status !== false)
  return (
        <>
        <h5>Next Matches</h5>
        {(nextMatches?.length > 0)
          ? <div className='table-wrapper-scroll-y my-custom-scrollbar'> <Table responsive variant="light" hover striped >
            <thead>
                <tr>
                    <th>Date</th>
                    <th>League</th>
                    <th>Season</th>
                    <th>Round</th>
                    <th>Status</th>
                    <th>Local</th>
                    <th>Away</th>
                    <th>Options</th>

                </tr>
            </thead>
            <tbody>
            {nextMatches?.map(match => (
            <tr key={match._id} >
             <td>{match?.date?.split('T')[0]}</td>
             <td>{match?.league?.league}</td>
             <td>{match?.season?.season}</td>
             <td>{match?.round?.round}</td>
             <td>{(match?.status)
               ? <span className='text-success'>Open!</span>
               : <span className='text-danger'>Closed!</span>}</td>
             <td>{match?.local?.name} <strong> {match?.score?.map(score => score.local)}</strong></td>
             <td>{match?.away?.name} <strong> {match?.score?.map(score => score.away)}</strong></td>
            <td><Link className="btn btn-info" to={`/matches/${match?._id}`}>Details</Link></td>
            </tr>
            ))}
              </tbody>
            </Table>
            </div>
          : <Alert variant='warning'>There is no information to show!</Alert>}

        </>
  )
}

export default SectionNextMatches
