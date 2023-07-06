import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Alert, FormControl } from 'react-bootstrap'
const SectionTodayMatches = ({ matchesToday }) => {
  const [dataFilter, setDataFilter] = useState('')

  const filter = matchesToday?.filter(team => {
    if (dataFilter) return team?.local?.name?.toLowerCase().includes(dataFilter.toLowerCase()) || team?.away?.name?.toLowerCase().includes(dataFilter.toLowerCase())
    else return team
  })
  filter?.sort((a, b) => b.status - a.status)
  return (
            <>
             <div className='mx-2 mt-2'>
              <FormControl className="mb-3"placeholder='Search Team...' id='team' name='team' value={dataFilter} onChange={(event) => setDataFilter(event.target.value)} />
              </div>
               {(filter?.length > 0)
                 ? <div className='table-wrapper-scroll-y my-custom-scrollbar p-1'>
              <Table responsive variant="dark table-sm table-borderless ">
              <caption className='m-1'>Total: {filter?.length} matches</caption>
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
                <tr key={match?._id}>
                  <td>{match?.date?.split('T', 3).join(' ')}</td>
                  <td>{match?.league?.league}</td>
                  <td>{match?.season?.season}</td>
                  <td>{match?.round?.round}</td>
                  <td>{match?.local.name}<strong> {match?.score?.map(score => score?.local)}</strong></td>
                  <td> {match?.away?.name}<strong> {match?.score?.map(score => score?.away)}</strong></td>
                  <td>{(match?.status) ? <span className='text-success'>Open!</span> : <span className='text-danger'>Closed!</span>}</td>
                  <td><Link style={{ fontSize: '13px' }} className='btn  btn-warning btn-sm w-100 ' to={`../matches/${match?._id}`}>Details</Link></td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
                 : <Alert variant="warning">There is no information to show!</Alert>}
            </>
  )
}
export default SectionTodayMatches
