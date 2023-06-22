import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLeagues } from '../../../services/leagues'
import { Table, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SectionLeagues = () => {
  const { data: leagues } = useQuery({ queryKey: ['leagues'], queryFn: getLeagues })
  return (
        <>
        <h5 className="h5">Leagues</h5>
         {(leagues?.length > 0)
           ? <div className='table-wrapper-scroll-y my-custom-scrollbar'>
             <Table responsive variant="light" hover striped>
            <thead>
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
                       <td><Link to={`../leagues/${league?._id}`} className='btn btn-sm btn-info'>Details</Link></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
           : <Alert variant="info">There is no information to show!</Alert>}
        </>
  )
}

export default SectionLeagues
