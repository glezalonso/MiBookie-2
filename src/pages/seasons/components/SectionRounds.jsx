import React, { useState } from 'react'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import ModalRounds from './ModalRounds'
import { Link } from 'react-router-dom'
import { useCreateRound, useDeleteRound, useGetRounds, useUpdateRound } from '../../../features/rounds.features'

const SectionRounds = ({ season }) => {
  const { data: rounds } = useGetRounds()
  const createRound = useCreateRound()
  const updateRound = useUpdateRound()
  const deleteRound = useDeleteRound()

  const [modalShow, setModalShow] = useState(false)
  const [round, setRound] = useState([])
  const [update, setUpdate] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Want to delete?')
    if (sure) return deleteRound.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setRound(data)
    setUpdate(true)
  }

  const roundsbySeason = rounds?.filter(round => round?.season?._id === season._id)
  return (
        <>
        <Button variant="warning mb-2 btn-sm" onClick={handleShow}>Create Round</Button>
        {(!update)
          ? <ModalRounds season={season} modalShow={modalShow} handleClose={handleClose} action={createRound} type={'Create'} setUpdate={setUpdate} />
          : <ModalRounds round={round} season={season} modalShow={modalShow} handleClose={handleClose} action={updateRound} type={'Edit'} setUpdate={setUpdate} /> }
       {(roundsbySeason?.length > 0)
         ? <div className='table-wrapper-scroll-y my-custom-scrollbar'><Table variant='dark table-sm table-borderless' responsive hover>
           <thead>
               <tr>
                    <th>Round</th>
                   <th>Season</th>
                   <th>League</th>
                   <th>Sport</th>
                   <th>Status</th>
                   <th>Options</th>
               </tr>
           </thead>
           <tbody>
               {roundsbySeason?.map(round => (
                   <tr key={round?._id}>
                       <td>{round?.round}</td>
                       <td>{round?.season?.season}</td>
                       <td>{round?.league?.league}</td>
                       <td>{round?.sport?.sport}</td>
                       <td>{(round?.status)
                         ? <span className='text-success'>Open!</span>
                         : <span className='text-danger'>Closed!</span>}</td>
                       <td>
                       <ButtonGroup>
                       <Link className='btn btn-secondary btn-sm mx-1 rounded ' to={`../rounds/${round?._id}`}>Details</Link>
                       <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(round)}>Edit</Button>
                       <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(round?._id)}>Delete</Button>
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
export default SectionRounds
