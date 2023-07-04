import React, { useState } from 'react'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import { useCreateSeason, useDeleteSeason, useGetSeasons, useUpdateSeason } from '../../../features/seasons.features'
import ModalSeasons from './ModalSeasons'
import { Link } from 'react-router-dom'

const SectionSeasons = ({ league }) => {
  const { data: seasons } = useGetSeasons()
  const createSeason = useCreateSeason()
  const updateSeason = useUpdateSeason()
  const deleteSeason = useDeleteSeason()

  const [modalShow, setModalShow] = useState(false)
  const [season, setSeason] = useState([])
  const [update, setUpdate] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Want to delete?')
    if (sure) return deleteSeason.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setSeason(data)
    setUpdate(true)
  }

  const seasonByLeague = seasons?.filter(season => season?.league?._id === league?._id)
  return (
        <>

        <Button variant="warning mb-2 btn-sm" onClick={handleShow}>Create Season</Button>
        {(!update)
          ? <ModalSeasons league={league} modalShow={modalShow} handleClose={handleClose} action={createSeason} type={'Create'} setUpdate={setUpdate} />
          : <ModalSeasons league={league} season={season} modalShow={modalShow} handleClose={handleClose} action={updateSeason} type={'Edit'} setUpdate={setUpdate} /> }

        {(seasonByLeague?.length > 0)
          ? <div className='table-wrapper-scroll-y my-custom-scrollbar rounded'><Table variant='dark table-sm' responsive hover>
            <thead>
                <tr>
                    <th>Season</th>
                    <th>League</th>
                    <th>Sport</th>
                    <th>Status</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {seasonByLeague?.map(season => (
                    <tr key={season?._id}>
                        <td>{season?.season}</td>
                        <td>{season?.league?.league}</td>
                        <td>{season?.sport?.sport}</td>
                        <td>{(season?.status)
                          ? <span className='text-success'>Open!</span>
                          : <span className='text-danger'>Closed!</span>}</td>
                        <td>
                        <ButtonGroup>
                        <Link className='btn btn-secondary btn-sm mx-1 rounded ' to={`../seasons/${season?._id}`}>Details</Link>
                        <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(season)}>Edit</Button>
                        <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(season?._id)}>Delete</Button>
                        </ButtonGroup>
                        </td>
                    </tr>
                ))}
            </tbody>

          </Table>
          </div>
          : <Alert variant='warning'>There is no information to show!</Alert>}
        </>
  )
}
export default SectionSeasons
