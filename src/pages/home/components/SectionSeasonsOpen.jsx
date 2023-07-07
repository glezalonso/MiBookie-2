import React from 'react'
import { Table, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useGetSeasons } from '../../../features/seasons.features'

const SectionSeasonsOpen = () => {
  const { data: seasons } = useGetSeasons()
  const SeasonsOpen = seasons?.filter(season => season?.status === true)
  return (
        <>
        <section>
        <h5 className="h5 m-2 ">Seasons Open</h5>
         {(SeasonsOpen?.length > 0)
           ? <div className='table-wrapper-scroll-y my-custom-scrollbar rounded'>
             <Table responsive variant="dark table-sm table-borderless" >
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
                       <td><Link to={`../seasons/${season?._id}`} className='btn btn-sm btn-warning'>Details</Link></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
           : <Alert variant="warning">There is no information to show!</Alert>}
        </section>
        </>
  )
}

export default SectionSeasonsOpen
