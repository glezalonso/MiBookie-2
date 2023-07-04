import React, { useState } from 'react'
import { Table, Alert, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useGetMatches } from '../../../features/matches.features'

const SectionMatches = ({ team }) => {
  const { data: matches } = useGetMatches()

  const [dataFilter, setDataFilter] = useState('')

  // matches by team
  const filterMatches = matches?.filter(match => match?.local?._id === team?._id || match?.away?._id === team?._id)

  // filter match closed
  const lastMatches = filterMatches?.filter(match => match?.status !== true)

  // filter bu user
  const filter = lastMatches?.filter(match => {
    if (dataFilter) return match?.round?.round?.toLowerCase().includes(dataFilter.toLowerCase()) || match?.season?.season?.toLowerCase().includes(dataFilter.toLowerCase())
    else return match
  })
  return (
        <>
        <div className='mx-2 my-3'>
        <FormControl placeholder='Search round, season..' style={{ fontSize: '13px' }} id='player' name='player' value={dataFilter} onChange={(event) => setDataFilter(event.target.value)} />
        </div>
        {(filter?.length > 0)
          ? <div className='table-wrapper-scroll-y my-custom-scrollbar rounded'> <Table responsive variant='dark table-sm' hover >
            <thead>
                <tr>
                    <th>Date</th>
                    <th>League</th>
                    <th>Season</th>
                    <th>Round</th>
                    <th>Local</th>
                    <th>Away</th>
                    <th>Status</th>
                    <th>Options</th>

                </tr>
            </thead>
            <tbody>
            {filter?.map(match => (
            <tr key={match._id} >
             <td>{match?.date?.split('T')[0]}</td>
             <td>{match?.league?.league}</td>
             <td>{match?.season?.season}</td>
             <td>{match?.round?.round}</td>
             <td>{match?.local?.name} <strong> {match?.score?.map(score => score.local)}</strong></td>
             <td>{match?.away?.name} <strong> {match?.score?.map(score => score.away)}</strong></td>
             <td>{(match?.status)
               ? <span className='text-success'>Open!</span>
               : <span className='text-danger'>Closed!</span>}</td>
            <td><Link className="btn btn-warning btn-sm" to={`/matches/${match?._id}`}>Details</Link></td>
            </tr>
            ))}
              </tbody>
            </Table>
            </div>
          : <Alert variant='warning'>There is no information to show!</Alert>}

        </>
  )
}

export default SectionMatches
