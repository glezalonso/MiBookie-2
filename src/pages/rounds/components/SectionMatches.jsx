import React, { useState } from 'react'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import ModalMatches from './ModalMatches'
import { Link } from 'react-router-dom'
import { useCreateMatch, useDeleteMatch, useGetMatches, useUpdateMatch } from '../../../features/matches.features'

const SectionMatches = ({ round }) => {
  const { data: matches } = useGetMatches()
  const createMatch = useCreateMatch()
  const updateMatch = useUpdateMatch()
  const deleteMatch = useDeleteMatch()

  const [modalShow, setModalShow] = useState(false)
  const [match, setMatch] = useState([])
  const [update, setUpdate] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Want to delete?')
    if (sure) return deleteMatch.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setMatch(data)
    setUpdate(true)
  }

  const matchByRound = matches?.filter(match => match?.round?._id === round?._id)

  return (
        <>

        <Button variant="warning mb-2 btn-sm" onClick={handleShow}>Create match</Button>
        {(!update)
          ? <ModalMatches round={round} modalShow={modalShow} handleClose={handleClose} action={createMatch} type={'Create'} setUpdate={setUpdate} />
          : <ModalMatches round={round} match={match} modalShow={modalShow} handleClose={handleClose} action={updateMatch} type={'Edit'} setUpdate={setUpdate} /> }

        {(matchByRound?.length > 0)
          ? <div className='table-wrapper-scroll-y my-custom-scrollbar'><Table variant='dark table-sm' responsive hover >
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
                        <td>{match?.local?.name} <strong> {match?.score?.map(score => score?.local)}</strong></td>
                        <td>{match?.away?.name} <strong> {match?.score?.map(score => score?.away)}</strong></td>
                        <td>{(match?.status)
                          ? <span className='text-success'>Open!</span>
                          : <span className='text-danger'>Closed!</span>}</td>
                        <td>
                        <ButtonGroup>
                        <Link className='btn btn-secondary btn-sm mx-1 rounded ' to={`../matches/${match?._id}`}>Details</Link>
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
