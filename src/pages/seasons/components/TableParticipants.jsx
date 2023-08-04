import React from 'react'
import { Table, Button } from 'react-bootstrap'

const TableParticipants = ({ season, teams, handleRemove }) => {
    return (
        <>
            <div className="data-tables bg-light rounded p-1 my-1">
                <Table responsive size="sm" borderless variant="light" hover>
                    <thead className="border-bottom">
                        <tr>
                            <th>Equipos</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams?.map((team) => (
                            <tr key={team?.team?._id}>
                                <td>{team?.team?.name}</td>
                                <td>
                                    <Button
                                        style={{ fontSize: '13px' }}
                                        variant="danger btn-sm"
                                        onClick={() =>
                                            handleRemove(season?._id, team?._id)
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

export default TableParticipants
