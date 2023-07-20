import React from 'react'
import { Button, Table, Alert } from 'react-bootstrap'

const TeamSettings = ({ match, handleRemoveLineUp, type }) => {
    return (
        <>
            {type === 'local' ? (
                match?.lineup?.length > 0 ? (
                    <Table responsive size="sm" borderless variant="dark" hover>
                        <thead className="border-bottom">
                            <tr>
                                <th>Jugador</th>
                                <th>Posición</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {match?.lineup?.map((local) =>
                                local?.local?.map((player) => (
                                    <tr key={player?.playerId?._id}>
                                        <td>{player?.playerId?.fullName}</td>
                                        <td>{player?.playerId?.position}</td>
                                        <td>
                                            <Button
                                                style={{ fontSize: '13px' }}
                                                variant="danger btn-sm"
                                                onClick={() =>
                                                    handleRemoveLineUp(
                                                        match?._id,
                                                        player?.playerId,
                                                        player?._id,
                                                        'local'
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
                ) : (
                    <Alert variant="warning">
                        No hay jugadores para mostrar!
                    </Alert>
                )
            ) : match?.lineup?.length > 0 ? (
                <Table
                    responsive
                    variant="dark my-1 table-sm table-borderless"
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
                                    <td>{player?.playerId?.fullName}</td>
                                    <td>{player?.playerId?.position}</td>
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
            ) : (
                <Alert variant="warning">No hay jugadores para mostrar!</Alert>
            )}
        </>
    )
}
export default TeamSettings
