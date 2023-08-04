import React from 'react'
import { Button, Table, Alert } from 'react-bootstrap'

const AwayLineUp = ({ match, handleRemoveLineUp }) => {
    return (
        <>
            <section>
                <h5>{match?.away?.name} alineación</h5>
                {match?.lineup?.length > 0 ? (
                    <div className="bg-light rounded p-1 my-1">
                        <Table
                            responsive
                            variant="light my-1 table-sm table-borderless"
                            hover
                        >
                            <thead className="border-bottom">
                                <tr>
                                    <th>Jugador</th>
                                    <th>Posición</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {match?.lineup?.map((away) =>
                                    away?.away?.map((player) => (
                                        <tr key={player?.playerId?._id}>
                                            <td>
                                                {player?.playerId?.fullName}
                                            </td>
                                            <td>
                                                {player?.playerId?.position}
                                            </td>
                                            <td>
                                                <Button
                                                    style={{ fontSize: '13px' }}
                                                    variant="danger btn-sm"
                                                    onClick={() =>
                                                        handleRemoveLineUp(
                                                            match?._id,
                                                            player?.playerId,
                                                            player?._id,
                                                            'away'
                                                        )
                                                    }
                                                >
                                                    Remover
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <Alert variant="warning">
                        {' '}
                        No hay jugadores para mostrar!
                    </Alert>
                )}
            </section>
        </>
    )
}

export default AwayLineUp
