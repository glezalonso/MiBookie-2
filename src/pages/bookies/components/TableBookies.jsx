import React from 'react'
import { Table, ButtonGroup } from 'react-bootstrap'
import DetailsButton from '../../comuncomponents/DetailsButton'
import EditButton from '../../comuncomponents/EditButton'
import DeleteButton from '../../comuncomponents/DeleteButton'

const TableBookies = ({ bookies, handleUpdate, handleDelete }) => {
    return (
        <>
            <div className="data-tables bg-light rounded p-1 my-1">
                <Table responsive size="sm" borderless variant="light" hover>
                    <thead className="border-bottom">
                        <tr>
                            <th>Nombre completo</th>
                            <th>Email</th>
                            <th>Usuario</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookies?.map((bookie) => (
                            <tr key={bookie?._id}>
                                <td>{bookie?.fullName}</td>
                                <td>{bookie?.email}</td>
                                <td>{bookie?.username}</td>
                                <td>
                                    <ButtonGroup>
                                        <DetailsButton
                                            route={`./${bookie?._id}`}
                                        />
                                        <EditButton
                                            data={bookie}
                                            handleUpdate={handleUpdate}
                                        />
                                        <DeleteButton
                                            data={bookie?._id}
                                            handleDelete={handleDelete}
                                        />
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <caption className="m-1">
                        Total de miembros: {bookies.length}
                    </caption>
                </Table>
            </div>
        </>
    )
}

export default TableBookies
