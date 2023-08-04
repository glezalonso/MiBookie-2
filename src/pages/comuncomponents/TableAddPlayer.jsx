import React from 'react'
import { Table, Button } from 'react-bootstrap'

const TableAddPlayer = ({ team, players, handleAdd }) => {
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
                            <tr key={player?._id}>
                                <td>{player?.fullName}</td>
                                <td>{player?.position}</td>
                                <td>
                                    <Button
                                        style={{ fontSize: '13px' }}
                                        variant="warning btn-sm p-1"
                                        onClick={() =>
                                            handleAdd(team?._id, player?._id)
                                        }
                                    >
                                        Agregar
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
export default TableAddPlayer
