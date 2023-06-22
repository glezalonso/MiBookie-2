import React from 'react'
import { Table, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getSeasons } from '../../../services/seasons'
import { useQuery } from '@tanstack/react-query'

const SectionSeasonsOpen = () => {
  const { data: seasons } = useQuery({ queryKey: ['seasons'], queryFn: getSeasons })
  const SeasonsOpen = seasons?.filter(season => season?.status === true)
  return (
        <>
        <h5 className="h5">Seasons Open</h5>
         {(SeasonsOpen?.length > 0)
           ? <div className='table-wrapper-scroll-y my-custom-scrollbar'>
             <Table responsive variant="light" hover striped>
            <thead>
                <tr>
                    <th>
                       Season
                    </th>
                    <th>
                        League
                    </th>
                        <th>
                        Sport
                        </th>
                    <th>
                        Options
                    </th>
                </tr>
            </thead>
            <tbody>
                {SeasonsOpen?.map(season => (
                    <tr key={season?._id}>
                       <td>{season?.season}</td>
                       <td>{season?.league?.league}</td>
                       <td>{season?.sport?.sport}</td>
                       <td><Link to={`../seasons/${season?._id}`} className='btn btn-sm btn-info'>Details</Link></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
           : <Alert variant="info">There is no information to show!</Alert>}

        </>
  )
}

export default SectionSeasonsOpen
