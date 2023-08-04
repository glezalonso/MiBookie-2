import React from 'react'
import { Table, Button } from 'react-bootstrap'

const TableRemovePlayer = ({ team, players, handleRemove }) => {
    return (
        <>
            <div className="data-tables bg-light rounded p-1 my-1">
                <Table responsive size="sm" borderless variant="light" hover>
                    <thead className="border-bottom">
                        <tr>
                            <th>Jugador</th>
                            <th>Posición</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players?.map((player) => (
                            <tr key={player?.playerId?._id}>
                                <td>{player?.playerId?.fullName}</td>
                                <td>{player?.playerId?.position}</td>
                                <td>
                                    <Button
                                        style={{ fontSize: '13px' }}
                                        variant="danger btn-sm p-1"
                                        onClick={() =>
                                            handleRemove(
                                                team?._id,
                                                player?.playerId?._id
                                            )
                                        }
                                    >
                                        Remover
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableRemovePlayer
