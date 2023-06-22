import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import React, { useState } from 'react'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import { getSeasons, createSeason, updateSeason, deleteSeason } from '../../../services/seasons'
import ModalSeasons from './ModalSeasons'
import { Link } from 'react-router-dom'

const SectionSeasons = ({ league }) => {
  const queryClient = useQueryClient()
  const { data: seasons } = useQuery({ queryKey: ['seasons'], queryFn: getSeasons })

  const [modalShow, setModalShow] = useState(false)
  const [season, setSeason] = useState([])
  const [update, setUpdate] = useState(false)

  const mutationDelete = useMutation({
    mutationFn: deleteSeason,
    onSuccess: () => {
      toast.success('deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['seasons'] })
    }
  })

  const mutationCreate = useMutation({
    mutationFn: createSeason,
    onSuccess: () => {
      toast.success('created successfully!')
      queryClient.invalidateQueries({ queryKey: ['seasons'] })
    }
  })

  const mutationUpdate = useMutation({
    mutationFn: updateSeason,
    onSuccess: data => {
      toast.success('updated successfully !')
      queryClient.invalidateQueries({ queryKey: ['seasons'] })
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
    setSeason(data)
    setUpdate(true)
  }

  const seasonByLeague = seasons?.filter(season => season?.league?._id === league?._id)
  return (
        <>

        <Button variant="warning mb-2" onClick={handleShow}>Create Season</Button>
        {(!update)
          ? <ModalSeasons league={league} modalShow={modalShow} handleClose={handleClose} action={mutationCreate} type={'Create'} setUpdate={setUpdate} />
          : <ModalSeasons league={league} season={season} modalShow={modalShow} handleClose={handleClose} action={mutationUpdate} type={'Edit'} setUpdate={setUpdate} /> }

        <h4 className='h4'>Seasons</h4>
        {(seasonByLeague?.length > 0)
          ? <div className='table-wrapper-scroll-y my-custom-scrollbar'><Table variant='light my-2' responsive striped hover>
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
                        <Link className='btn btn-info btn-sm mx-1 rounded ' to={`../seasons/${season?._id}`}>Details</Link>
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
