import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Alert } from 'react-bootstrap'
const SectionTodayMatches = ({ matchesToday }) => {
  return (
            <>
               <h3 className="h3 m-2">Matches Today</h3>
          {(matchesToday?.length > 0)
            ? <div className='table-wrapper-scroll-y my-custom-scrollbar'>
            <Table responsive variant="light" hover striped>
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
              {matchesToday?.map(match => (
                <tr key={match?._id}>
                  <td>{match?.date}</td>
                  <td>{match?.league?.league}</td>
                  <td>{match?.season?.season}</td>
                  <td>{match?.round?.round}</td>
                  <td>{match?.local.name}<strong> {match?.score?.map(score => score?.local)}</strong></td>
                  <td> {match?.away?.name}<strong> {match?.score?.map(score => score?.away)}</strong></td>
                  <td>{(match?.status) ? <span className='text-success'>Abierto</span> : <span className='text-danger'>Cerrado</span>}</td>
                  <td><Link className='btn btn-info p-2' to={`../matches/${match?._id}`}>Details</Link></td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
            : <Alert variant="info">There is no information to show!</Alert>}
            </>
  )
}
export default SectionTodayMatches
