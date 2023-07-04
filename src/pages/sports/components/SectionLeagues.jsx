import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import ModalLeagues from './ModalLeagues'
import { useCreateLeague, useDeleteLeague, useGetLeagues, useUpdateLeague } from '../../../features/leagues.features'

const SectionLeagues = ({ sport }) => {
  const { data: leagues } = useGetLeagues()
  const createLeague = useCreateLeague()
  const updateLeague = useUpdateLeague()
  const deleteLeague = useDeleteLeague()

  const [modalShow, setModalShow] = useState(false)
  const [league, setLeague] = useState([])
  const [update, setUpdate] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Want to delete?')
    if (sure) return deleteLeague.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setLeague(data)
    setUpdate(true)
  }

  const leaguesBySport = leagues?.filter(league => league?.sport?._id === sport?._id)

  return (
    <>
              <Button variant="warning mb-2 btn-sm" onClick={handleShow}>Create league</Button>
        {(!update)
          ? <ModalLeagues sportId={sport?._id} modalShow={modalShow} handleClose={handleClose} action={createLeague} type={'Create'} setUpdate={setUpdate} />
          : <ModalLeagues league={league} sportId={sport?._id} modalShow={modalShow} handleClose={handleClose} action={updateLeague} type={'Edit'} setUpdate={setUpdate} /> }

    {(leaguesBySport?.length > 0)
      ? <div className='table-wrapper-scroll-y my-custom-scrollbar rounded'><Table variant='dark table-sm' responsive hover>
        <thead>
            <tr>
                <th>
                    League
                </th>
                <th>
                    Description
                </th>
                <th>
                    Options
                </th>
            </tr>
        </thead>
     <tbody>
        {leaguesBySport?.map(league => (
            <tr key={league._id}>
                <td>{league?.league}</td>
                <td>{league?.description}</td>
                <td>
                <ButtonGroup>
                    <Link className='btn btn-secondary btn-sm mx-1 rounded ' to={`../leagues/${league?._id}`}>Details</Link>
                    <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(league)}>Edit</Button>
                    <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(league?._id)}>Delete</Button>
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
export default SectionLeagues
