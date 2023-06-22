import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import React, { useState } from 'react'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import { getRounds, createRound, updateRound, deleteRound } from '../../../services/rounds'
import ModalRounds from './ModalRounds'
import { Link } from 'react-router-dom'

const SectionRounds = ({ season }) => {
  const queryClient = useQueryClient()
  const { data: rounds } = useQuery({ queryKey: ['rounds'], queryFn: getRounds })

  const [modalShow, setModalShow] = useState(false)
  const [round, setRound] = useState([])
  const [update, setUpdate] = useState(false)

  const mutationDelete = useMutation({
    mutationFn: deleteRound,
    onSuccess: () => {
      toast.success('deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['rounds'] })
    }
  })

  const mutationCreate = useMutation({
    mutationFn: createRound,
    onSuccess: () => {
      toast.success('created successfully!')
      queryClient.invalidateQueries({ queryKey: ['rounds'] })
    }
  })

  const mutationUpdate = useMutation({
    mutationFn: updateRound,
    onSuccess: data => {
      toast.success('updated successfully !')
      queryClient.invalidateQueries({ queryKey: ['rounds'] })
    }
  })

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Want to delete?')
    if (sure) return mutationDelete.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setRound(data)
    setUpdate(true)
  }

  const roundsbySeason = rounds?.filter(round => round?.season?._id === season._id)
  return (
        <>
        <Button variant="warning mb-2" onClick={handleShow}>Create Round</Button>
        {(!update)
          ? <ModalRounds season={season} modalShow={modalShow} handleClose={handleClose} action={mutationCreate} type={'Create'} setUpdate={setUpdate} />
          : <ModalRounds round={round} season={season} modalShow={modalShow} handleClose={handleClose} action={mutationUpdate} type={'Edit'} setUpdate={setUpdate} /> }

       <h4 className='h4'>Rounds</h4>
       {(roundsbySeason?.length > 0)
         ? <div className='table-wrapper-scroll-y my-custom-scrollbar'><Table variant='light my-2' responsive striped hover>
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
                       <Link className='btn btn-info btn-sm mx-1 rounded ' to={`../rounds/${round?._id}`}>Details</Link>
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
