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
    const sure = confirm('Esta seguro que desea borrar?')
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
    <section>
    <h5 className="h7 ">Ligas <Button variant="warning mx-2 btn-sm" onClick={handleShow}>Crear liga</Button></h5>
        {(!update)
          ? <ModalLeagues sportId={sport?._id} modalShow={modalShow} handleClose={handleClose} action={createLeague} type={'Crear'} setUpdate={setUpdate} />
          : <ModalLeagues league={league} sportId={sport?._id} modalShow={modalShow} handleClose={handleClose} action={updateLeague} type={'Editar'} setUpdate={setUpdate} /> }

    {(leaguesBySport?.length > 0)
      ? <div className='table-wrapper-scroll-y my-custom-scrollbar rounded my-1'>
        <Table variant='dark table-sm table-borderless' responsive hover>
        <thead className='border-bottom'>
            <tr>
                <th>
                   Liga
                </th>
                <th>
                   Descripción
                </th>
                <th>
                    Opciones
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
                    <Link className='btn btn-secondary btn-sm mx-1 rounded ' to={`../leagues/${league?._id}`}>Detalles</Link>
                    <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(league)}>Edita</Button>
                    <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(league?._id)}>Borrar</Button>
                </ButtonGroup>
                </td>
            </tr>
        ))}

    </tbody>
    </Table>
    </div>
      : <Alert variant='warning'>There is no information to show!</Alert>}
      </section>
    </>
  )
}
export default SectionLeagues
