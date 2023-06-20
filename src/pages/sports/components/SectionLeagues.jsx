import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getLeagues, deleteLeague, updateLeague, createLeague } from '../../../services/leagues'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import ModalLeagues from './ModalLeagues'

const SectionLeagues = ({ sport }) => {
  const queryClient = useQueryClient()
  const { data: leagues } = useQuery({ queryKey: ['leagues'], queryFn: getLeagues })

  const [modalShow, setModalShow] = useState(false)
  const [league, setLeague] = useState([])
  const [update, setUpdate] = useState(false)

  const mutationDelete = useMutation({
    mutationFn: deleteLeague,
    onSuccess: () => {
      toast.success('deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['leagues'] })
    }
  })

  const mutationCreate = useMutation({
    mutationFn: createLeague,
    onSuccess: () => {
      toast.success('created successfully!')
      queryClient.invalidateQueries({ queryKey: ['leagues'] })
    }
  })

  const mutationUpdate = useMutation({
    mutationFn: updateLeague,
    onSuccess: data => {
      toast.success('updated successfully !')
      queryClient.invalidateQueries({ queryKey: ['leagues'] })
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
    setLeague(data)
    setUpdate(true)
  }

  const leaguesBySport = leagues?.filter(league => league?.sport?._id === sport?._id)

  return (
    <>
              <Button variant="warning mb-2" onClick={handleShow}>Create league</Button>
        {(!update)
          ? <ModalLeagues league={league} sportId={sport?._id} modalShow={modalShow} handleClose={handleClose} action={mutationCreate} type={'Create'} setUpdate={setUpdate} />
          : <ModalLeagues league={league} sportId={sport?._id} modalShow={modalShow} handleClose={handleClose} action={mutationUpdate} type={'Edit'} setUpdate={setUpdate} /> }

    <h4 className='h4'>Leagues</h4>
    {(leaguesBySport?.length > 0)
      ? <div className='table-wrapper-scroll-y my-custom-scrollbar'><Table variant='light my-2' responsive striped hover>
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
                    <Link className='btn btn-info btn-sm mx-1 rounded ' to={`../leagues/${league?._id}`}>Details</Link>
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
