import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import MatchSettings from './MatchSettings'
import ModalScore from './ModalScore'
import { useAddLineUp, useRemoveLineUp } from '../../../features/matches.features'

const MatchContent = ({ match }) => {
  const addLineUp = useAddLineUp()
  const removeLineUp = useRemoveLineUp()

  const [modalShow, setModalShow] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleAddLineUp = (id, playerId, type) => {
    addLineUp.mutate({ id, body: { playerId, type } })
  }

  const handleRemoveLineUp = (id, playerId, lineId, type) => {
    removeLineUp.mutate({ id, data: { playerId, lineId, type } })
  }

  return (
        <>

          <h5 className='h5 mt-3'>Match Details</h5>
           <Table responsive variant="dark eable-sm" hover >
            <tbody>
            <tr><td>Date</td><td>{match?.date}</td></tr>
            <tr><td>League </td><td>{match?.league?.league}</td></tr>
            <tr><td>Season</td><td>{match?.season?.season}</td></tr>
            <tr><td>Round</td><td>{match?.round?.round}</td></tr>
            <tr><td>Status</td><td>{(match?.status) ? <span className="text-success">Abierto</span> : <span className="text-danger ">Cerrado</span>}</td></tr>
            <tr><td>Stadium</td><td>{match?.local?.stadium}</td></tr>
            <tr>
                <td><strong>Local </strong>{match?.local?.name}</td><td><strong>{match?.score?.map(score => score?.local)}</strong></td>
             </tr>
             <tr>
                <td><strong>Away </strong>{match?.away?.name}</td><td><strong>{match?.score?.map(score => score?.away)}</strong></td>
             </tr>
            </tbody>
             </Table>
             {(match?.status) && <Button variant='warning mb-2 btn-sm' onClick={() => handleShow()}>Place score</Button> }
            <ModalScore match={match} modalShow={modalShow} handleClose={handleClose} />

            {(match?.status) && <MatchSettings match={match} handleRemoveLineUp={handleRemoveLineUp} handleAddLineUp={handleAddLineUp} /> }

        </>
  )
}
export default MatchContent
