import React from 'react'
import { Table, ButtonGroup } from 'react-bootstrap'
import DetailsButton from '../../comuncomponents/DetailsButton'
import EditButton from '../../comuncomponents/EditButton'
import DeleteButton from '../../comuncomponents/DeleteButton'

const TableRounds = ({ rounds, handleUpdate, handleDelete }) => {
    return (
        <>
            <div className="data-tables bg-light rounded p-1 my-1">
                <Table responsive size="sm" borderless variant="light" hover>
                    <thead className="border-bottom">
                        <tr>
                            <th>Jornada</th>
                            <th>Estatus</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rounds?.map((round) => (
                            <tr key={round?._id}>
                                <td>{round?.round}</td>
                                <td>
                                    {round?.status ? (
                                        <span className="text-success">
                                            Activo!
                                        </span>
                                    ) : (
                                        <span className="text-danger">
                                            Inactivo!
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <DetailsButton
                                            route={`../rounds/${round?._id}`}
                                        />
                                        <EditButton
                                            data={round}
                                            handleUpdate={handleUpdate}
                                        />
                                        <DeleteButton
                                            data={round?._id}
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

export default TableRounds
