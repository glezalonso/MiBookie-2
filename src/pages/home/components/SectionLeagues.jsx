import React from 'react'
import { useGetLeagues } from '../../../features/leagues.features'
import { Table, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SectionLeagues = () => {
  const { data: leagues } = useGetLeagues()
  return (
        <>
        <h5 className="h5 m-2">Leagues</h5>
         {(leagues?.length > 0)
           ? <div className='table-wrapper-scroll-y my-custom-scrollbar rounded'>
             <Table responsive variant="dark table-sm">
            <thead >
                <tr>
                    <th>
                        League
                    </th>
                    <th>
                        Options
                    </th>
                </tr>
            </thead>
            <tbody>
                {leagues?.map(league => (
                    <tr key={league?._id}>
                       <td>{league?.league}</td>
                       <td><Link to={`../leagues/${league?._id}`} className='btn btn-sm btn-warning'>Details</Link></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
           : <Alert variant="warning">There is no information to show!</Alert>}
        </>
  )
}

export default SectionLeagues
