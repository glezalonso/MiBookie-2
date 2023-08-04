import React from 'react'
import { Table, ButtonGroup } from 'react-bootstrap'
import DetailsButton from '../../comuncomponents/DetailsButton'
import EditButton from '../../comuncomponents/EditButton'
import DeleteButton from '../../comuncomponents/DeleteButton'

const TableTeams = ({ teams, handleUpdate, handleDelete }) => {
    return (
        <>
            <div className="data-tables bg-light  rounded p-1 my-1">
                <Table responsive size="sm" borderless variant="light" hover>
                    <thead className="border-bottom">
                        <tr>
                            <th>Equipo</th>
                            <th>Estadio</th>
                            <th>Deporte</th>
                            <th>Estatus</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams?.map((team) => (
                            <tr key={team?._id}>
                                <td>{team?.name}</td>
                                <td>{team?.stadium}</td>
                                <td>{team?.sport?.sport}</td>
                                <td>
                                    {team.status ? (
                                        <span className="text-success">
                                            Activo
                                        </span>
                                    ) : (
                                        <span className="text-danger">
                                            Inactivo
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <DetailsButton
                                            route={`./${team?._id}`}
                                        />
                                        <EditButton
                                            data={team}
                                            handleUpdate={handleUpdate}
                                        />
                                        <DeleteButton
                                            data={team?._id}
                                            handleDelete={handleDelete}
                                        />
                                    </ButtonGroup>
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
