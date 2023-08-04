import React from 'react'
import { Table, ButtonGroup } from 'react-bootstrap'
import DetailsButton from './DetailsButton'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

const TableMatches = ({ match, handleUpdate, handleDelete }) => {
    return (
        <>
            <div className="data-tables bg-light p-1 my-1 rounded ">
                <Table
                    className="h-25"
                    responsive
                    size="sm"
                    borderless
                    variant="light"
                    hover
                >
                    <caption className="m-1 text-light">
                        Total: {match?.length} partidos
                    </caption>
                    <thead className="border-bottom">
                        <tr>
                            <th>Hora</th>
                            <th>Liga</th>
                            <th>Local</th>
                            <th>Visitante</th>
                            <th>Estatus</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {match?.map((match) => (
                            <tr key={match?._id}>
                                <td>
                                    {match?.date
                                        ?.split('T')
                                        .reverse()
                                        .join(' ')}
                                </td>
                                <td>{match?.league?.league}</td>

                                <td>
                                    {match?.local.name}
                                    <strong>
                                        {match?.score?.map(
                                            (score) => score?.local
                                        )}
                                    </strong>
                                </td>
                                <td>
                                    {match?.away?.name}
                                    <strong>
                                        {match?.score?.map(
                                            (score) => score?.away
                                        )}
                                    </strong>
                                </td>
                                <td>
                                    {match?.status ? (
                                        <span className="text-success">
                                            Abierto!
                                        </span>
                                    ) : (
                                        <span className="text-danger">
                                            Cerrado!
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <DetailsButton
                                            route={`../matches/${match?._id}`}
                                        />
                                        <EditButton
                                            data={match}
                                            handleUpdate={handleUpdate}
                                        />
                                        <DeleteButton
                                            data={match?._id}
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

export default TableMatches
