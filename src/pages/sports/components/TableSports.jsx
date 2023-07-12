import React, { useState } from 'react'
import { useCreateSport, useDeleteSport, useUpdateSport, useGetSports } from '../../../features/sports.features'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import ModalSports from './ModalSports'
import Loading from '../../../ui/Loading'

const TableSport = () => {
  const { data: sports, isLoading, isError } = useGetSports()
  const createSport = useCreateSport()
  const updateSport = useUpdateSport()
  const deleteSport = useDeleteSport()

  const [modalShow, setModalShow] = useState(false)
  const [sport, setSport] = useState([])
  const [update, setUpdate] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Esta seguro que desea borrar?')
    if (sure) return deleteSport.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setSport(data)
    setUpdate(true)
  }
  if (isLoading) return <Loading />
  if (isError) return toast.error('Hubo un error al cargar los deportes!')

  return (
        <>
        <section>
        <h5 className="h7 ">Deportes <Button variant="warning mx-1 btn-sm" onClick={handleShow}> Crear deporte</Button></h5>
        {(!update)
          ? <ModalSports modalShow={modalShow} handleClose={handleClose} action={createSport} type={'Crear'} setUpdate={setUpdate} />
          : <ModalSports sport={sport} modalShow={modalShow} handleClose={handleClose} action={updateSport} type={'Editar'} setUpdate={setUpdate} /> }
        {(sports?.length > 0)
          ? <Table variant='dark table-sm my-2 mx-auto table-borderless' responsive hover>
            <thead className='border-bottom'>
                <tr>
                    <th>
                       Deporte
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
                {sports?.map(sport => (
                    <tr key={sport?._id}>
                        <td>{sport?.sport}</td>
                        <td>{sport?.description}</td>
                        <td>
                            <ButtonGroup>
                            <Link className='btn btn-secondary btn-sm mx-1 rounded ' to={`./${sport?._id}`}>Detalles</Link>
                            <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(sport)}>Editar</Button>
                            <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(sport?._id)}>Borrar</Button>
                            </ButtonGroup>
                        </td>
                        </tr>
                ))}
            </tbody>
        </Table>
          : <Alert variant='warning'>No hay deportes para mostrar!</Alert>}
           </section>
        </>
  )
}

export default TableSport
