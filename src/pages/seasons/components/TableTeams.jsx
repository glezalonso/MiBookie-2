import React from 'react'
import { Table, Button } from 'react-bootstrap'

const TableTeams = ({ season, teams, handleAdd }) => {
    return (
        <>
            <div className="data-tables bg-light rounded p-1 my-1">
                <Table responsive size="sm" borderless variant="light" hover>
                    <thead className="border-bottom">
                        <tr>
                            <th>Equipo</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams?.map((team) => (
                            <tr key={team?._id}>
                                <td>{team?.name}</td>
                                <td>
                                    {' '}
                                    <Button
                                        style={{ fontSize: '13px' }}
                                        variant="warning btn-sm"
                                        onClick={() =>
                                            handleAdd(season?._id, team?._id)
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

export default TableTeams
