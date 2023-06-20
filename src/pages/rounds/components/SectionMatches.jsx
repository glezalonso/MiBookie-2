import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import React, { useState } from 'react'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import { getMatches, createMatch, updateMatch, deleteMatch } from '../../../services/matches'
import ModalMatches from './ModalMatches'
import { Link } from 'react-router-dom'

const SectionMatches = ({ round }) => {
  const queryClient = useQueryClient()
  const { data: matches } = useQuery({ queryKey: ['matches'], queryFn: getMatches })

  const [modalShow, setModalShow] = useState(false)
  const [match, setMatch] = useState([])
  const [update, setUpdate] = useState(false)

  const mutationDelete = useMutation({
    mutationFn: deleteMatch,
    onSuccess: () => {
      toast.success('deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['matches'] })
    }
  })

  const mutationCreate = useMutation({
    mutationFn: createMatch,
    onSuccess: () => {
      toast.success('created successfully!')
      queryClient.invalidateQueries({ queryKey: ['matches'] })
    }
  })

  const mutationUpdate = useMutation({
    mutationFn: updateMatch,
    onSuccess: data => {
      toast.success('updated successfully !')
      queryClient.invalidateQueries({ queryKey: ['matches'] })
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
    setMatch(data)
    setUpdate(true)
  }

  const matchByRound = matches?.filter(match => match?.round?._id === round?._id)

  return (
        <>

        <Button variant="warning mb-2" onClick={handleShow}>Create match</Button>
        {(!update)
          ? <ModalMatches round={round} match={match} modalShow={modalShow} handleClose={handleClose} action={mutationCreate} type={'Create'} setUpdate={setUpdate} />
          : <ModalMatches round={round} match={match} modalShow={modalShow} handleClose={handleClose} action={mutationUpdate} type={'Edit'} setUpdate={setUpdate} /> }

        <h4 className='h4'>Matches</h4>
        {(matchByRound?.length > 0)
          ? <div className='table-wrapper-scroll-y my-custom-scrollbar'><Table variant='light my-2' responsive striped hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Round</th>
                    <th>Season</th>
                    <th>League</th>
                    <th>Local</th>
                    <th>Away</th>
                    <th>Status</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {matchByRound?.map(match => (
                    <tr key={match?._id}>
                        <td>{match?.date}</td>
                        <td>{match?.round?.round}</td>
                        <td>{match?.season?.season}</td>
                        <td>{match?.league?.league}</td>
                        <td>{`${match?.local?.name} ${match?.score?.map(score => score?.local)}`}</td>
                        <td>{`${match?.away?.name} ${match?.score?.map(score => score?.away)}`}</td>
                        <td>{(match?.status)
                          ? <span>Open</span>
                          : <span>Close</span>}</td>
                        <td>
                        <ButtonGroup>
                        <Link className='btn btn-info btn-sm mx-1 rounded ' to={`../matches/${match?._id}`}>Details</Link>
                        <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(match)}>Edit</Button>
                        <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(match?._id)}>Delete</Button>
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
export default SectionMatches
