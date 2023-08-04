import React from 'react'
import { ButtonGroup, Table } from 'react-bootstrap'
import DetailsButton from '../comuncomponents/DetailsButton'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

const TableLeagues = ({ leagues, handleUpdate, handleDelete }) => {
    return (
        <>
            <div className="data-tables bg-light p-1 my-1 rounded">
                <Table
                    className="h-25"
                    size="sm"
                    responsive
                    variant="light"
                    hover
                    borderless
                >
                    <thead className="border-bottom">
                        <tr>
                            <th>Liga</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leagues?.map((league) => (
                            <tr key={league?._id}>
                                <td>{league?.league}</td>
                                <td>
                                    <ButtonGroup>
                                        <DetailsButton
                                            route={`../leagues/${league?._id}`}
                                        />
                                        {handleUpdate ? (
                                            <EditButton
                                                data={league}
                                                handleUpdate={handleUpdate}
                                            />
                                        ) : null}
                                        {handleDelete ? (
                                            <DeleteButton
                                                data={league?._id}
                                                handleDelete={handleDelete}
                                            />
                                        ) : null}
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

export default TableLeagues
