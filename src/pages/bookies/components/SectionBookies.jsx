import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, ButtonGroup, FormControl } from 'react-bootstrap'
import { useUpdateBookie, useDeleteBookie } from '../../../features/bookies.features'
import ModalBookies from './ModalBookies'

const SectionBookies = ({ bookies }) => {
  const updateBookie = useUpdateBookie()
  const deleteBookie = useDeleteBookie()
  const [dataFilter, setDataFilter] = useState('')

  const [modalShow, setModalShow] = useState(false)
  const [bookie, setBookie] = useState([])

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Want to delete?')
    if (sure) return deleteBookie.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setBookie(data)
  }

  const filter = bookies?.filter(bookie => {
    if (dataFilter) return bookie?.fullName?.toLowerCase().includes(dataFilter.toLowerCase()) || bookie?.email?.toLowerCase().includes(dataFilter.toLowerCase()) || bookie?.username?.toLowerCase().includes(dataFilter.toLowerCase())
    else return bookie
  })
  return (
        <>
        <section>
        <h5 className="h7 ">Bookies</h5>
        <div className='mx-2'>
        <FormControl className="mb-3" style={{ fontSize: '13px' }} placeholder='Search Bookie...' id='bookie' name='bookie' value={dataFilter} onChange={(event) => setDataFilter(event.target.value)} />
        </div>
        <ModalBookies bookie={bookie} modalShow={modalShow} handleClose={handleClose} action={updateBookie} />
        { filter?.length > 0
          ? <Table responsive variant='dark table-sm table-borderless' hover>
            <thead>
                <tr>
                    <th>Fullname</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {filter?.map(bookie => (
                    <tr key={bookie?._id}>
                        <td>{bookie?.fullName}</td>
                        <td>{bookie?.email}</td>
                        <td>{bookie?.username}</td>
                        <td>
                        <ButtonGroup>
                        <Link className='btn btn-secondary btn-sm mx-1 rounded ' to={`./${bookie?._id}`}>Details</Link>
                            <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(bookie)}>Edit</Button>
                            <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(bookie?._id)}>Delete</Button>
                        </ButtonGroup>
                        </td>
                    </tr>
                ))}
            </tbody>
            <caption>Total members: {bookies.length}</caption>
        </Table>
          : <Alert variant='warning'>There is no information to show!</Alert>
        }
        </section>
        </>
  )
}

export default SectionBookies