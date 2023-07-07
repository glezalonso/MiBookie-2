import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import ModalSports from './ModalSports'
import { useCreateSport, useDeleteSport, useUpdateSport } from '../../../features/sports.features'

const TableSport = ({ sports }) => {
  const createSport = useCreateSport()
  const updateSport = useUpdateSport()
  const deleteSport = useDeleteSport()

  const [modalShow, setModalShow] = useState(false)
  const [sport, setSport] = useState([])
  const [update, setUpdate] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Want to delete?')
    if (sure) return deleteSport.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setSport(data)
    setUpdate(true)
  }

  return (
        <>
        <section>
        <h5 className="h7 ">Sports</h5>
          <Button variant="warning m-1 btn-sm" onClick={handleShow}> Create sport</Button>
        {(!update)
          ? <ModalSports modalShow={modalShow} handleClose={handleClose} action={createSport} type={'Create'} setUpdate={setUpdate} />
          : <ModalSports sport={sport} modalShow={modalShow} handleClose={handleClose} action={updateSport} type={'Edit'} setUpdate={setUpdate} /> }
        {(sports?.length > 0)
          ? <Table variant='dark table-sm mt-2 table-borderless' responsive hover>
            <thead>
                <tr>
                    <th>
                       Sports
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
                            <Link className='btn btn-secondary btn-sm mx-1 rounded ' to={`./${sport?._id}`}>Details</Link>
                            <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(sport)}>Edit</Button>
                            <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(sport?._id)}>Delete</Button>
                            </ButtonGroup>
                        </td>
                        </tr>
                ))}
            </tbody>
        </Table>
          : <Alert variant='warning'>There is no information to show!</Alert>}
           </section>
        </>
  )
}

export default TableSport
