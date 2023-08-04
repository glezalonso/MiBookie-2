import React from 'react'
import { Table, ButtonGroup } from 'react-bootstrap'
import EditButton from '../../comuncomponents/EditButton'
import DetailsButton from '../../comuncomponents/DetailsButton'
import DeleteButton from '../../comuncomponents/DeleteButton'

const TablePlayers = ({ players, handleUpdate, handleDelete }) => {
    return (
        <>
            <div className="data-tables bg-light rounded p-1 my-1">
                <Table responsive size="sm" borderless variant="light" hover>
                    <thead className="border-bottom">
                        <tr>
                            <th>Nombre</th>
                            <th>Posición</th>
                            <th>Deporte</th>
                            <th>Equipo</th>
                            <th>Estatus</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players?.map((player) => (
                            <tr key={player?._id}>
                                <td>{player?.fullName}</td>
                                <td>{player?.position}</td>
                                <td>{player?.sport?.sport}</td>
                                <td>{player?.team?.name}</td>
                                <td>
                                    {player?.status ? (
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
                                            route={`./${player?._id}`}
                                        />
                                        <EditButton
                                            data={player}
                                            handleUpdate={handleUpdate}
                                        />
                                        <DeleteButton
                                            data={player?._id}
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

export default TablePlayers
