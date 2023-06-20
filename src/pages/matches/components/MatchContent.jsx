import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Row, Button, Alert, Table } from 'react-bootstrap'
import { addLineUp, removeLineUp } from '../../../services/matches'
import toast from 'react-hot-toast'
import MatchSettings from './MatchSettings'
import ModalScore from './ModalScore'

const MatchContent = ({ match }) => {
  const queryClient = useQueryClient()
  const [modalShow, setModalShow] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const mutationDelete = useMutation({
    mutationFn: removeLineUp,
    onSuccess: () => {
      toast.success('Remove successfully!')
      queryClient.invalidateQueries({ queryKey: ['match'] })
    }
  })

  const mutationCreate = useMutation({
    mutationFn: addLineUp,
    onSuccess: () => {
      toast.success('Added successfully!')
      queryClient.invalidateQueries({ queryKey: ['match'] })
    }
  })

  const handleAddLineUp = (id, playerId, player, type) => {
    mutationCreate.mutate({ id, body: { playerId, player, type } })
  }

  const handleRemoveLineUp = (id, playerId, player, lineId, type) => {
    mutationDelete.mutate({ id, data: { playerId, player, lineId, type } })
  }

  return (
        <>

          <h3 className='h3 mt-2'>Match Details</h3>
           <Table responsive variant="light " hover striped >
            <tbody>
            <tr><td>Date</td><td>{match?.date}</td></tr>
            <tr><td>League </td><td>{match?.league?.league}</td></tr>
            <tr><td>Season</td><td>{match?.season?.season}</td></tr>
            <tr><td>Round</td><td>{match?.round?.round}</td></tr>
            <tr><td>Status</td><td>{(match?.status.toString()) ? <Alert variant="success p-2 mx-1">Abierto</Alert> : <Alert variant="danger ">Cerrado</Alert>}</td></tr>
            <tr><td>Stadium</td><td>{match?.local?.stadium}</td></tr>
            <tr>
                <td><strong>Local </strong>{match?.local?.name}</td><td><strong>{match?.score?.map(score => score?.local)}</strong></td>
             </tr>
             <tr>
                <td><strong>Away </strong>{match?.away?.name}</td><td><strong>{match?.score?.map(score => score?.away)}</strong></td>
             </tr>
            </tbody>
             </Table>
             {(match?.status) && <Button variant='warning mb-2' onClick={() => handleShow()}>Place score</Button> }
            <ModalScore match={match} modalShow={modalShow} handleClose={handleClose} />
            <Row>
            {(match?.status) && <MatchSettings match={match} handleRemoveLineUp={handleRemoveLineUp} handleAddLineUp={handleAddLineUp} /> }
            </Row>

        </>
  )
}
export default MatchContent
