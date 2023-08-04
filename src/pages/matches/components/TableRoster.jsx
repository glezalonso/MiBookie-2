import React from 'react'
import { Table, Button } from 'react-bootstrap'

const TableRoster = ({ match, type, players, handleAddLineUp }) => {
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
                        {players?.map((players) =>
                            players?.map((player) => (
                                <tr key={player?._id}>
                                    <td>{player?.fullName}</td>
                                    <td>{player?.position}</td>
                                    <td>
                                        <Button
                                            style={{ fontSize: '13px' }}
                                            variant="warning btn-sm"
                                            onClick={() =>
                                                handleAddLineUp(
                                                    match?._id,
                                                    player?._id,
                                                    type
                                                )
                                            }
                                        >
                                            Agregar
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableRoster
