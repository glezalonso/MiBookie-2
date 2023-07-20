import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import MatchSettings from './MatchSettings'
import ModalScore from './ModalScore'
import {
    useAddLineUp,
    useRemoveLineUp,
} from '../../../features/matches.features'

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
            <section>
                <h5 className="h7 ">Datos del partido</h5>
                <div className="bg-light rounded p-1">
                    <Table
                        responsive
                        size="sm"
                        borderless
                        variant="light"
                        hover
                    >
                        <tbody>
                            <tr>
                                <td>Fecha</td>
                                <td>
                                    {match?.date
                                        ?.split('T', 3)
                                        .reverse()
                                        .join(' ')}
                                </td>
                            </tr>
                            <tr>
                                <td>Estatus</td>
                                <td>
                                    {match?.status ? (
                                        <span className="text-success">
                                            Activo
                                        </span>
                                    ) : (
                                        <span className="text-danger ">
                                            Inactivo
                                        </span>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Estadio</td>
                                <td>{match?.local?.stadium}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Local </strong>
                                    {match?.local?.name}
                                </td>
                                <td>
                                    <strong>
                                        {match?.score?.map(
                                            (score) => score?.local
                                        )}
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Visitante </strong>
                                    {match?.away?.name}
                                </td>
                                <td>
                                    <strong>
                                        {match?.score?.map(
                                            (score) => score?.away
                                        )}
                                    </strong>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                {match?.status && (
                    <div className="d-flex justify-content-center my-1">
                        <Button
                            variant="warning my-2 btn-sm"
                            onClick={() => handleShow()}
                        >
                            Colocar marcador
                        </Button>
                    </div>
                )}
                <ModalScore
                    match={match}
                    modalShow={modalShow}
                    handleClose={handleClose}
                />

                {match?.status && (
                    <MatchSettings
                        match={match}
                        handleRemoveLineUp={handleRemoveLineUp}
                        handleAddLineUp={handleAddLineUp}
                    />
                )}
            </section>
        </>
    )
}
export default MatchContent
