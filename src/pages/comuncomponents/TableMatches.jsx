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
                    responsive
                    size="sm"
                    borderless
                    variant="light"
                    className="my-1"
                    hover
                >
                    <thead className="border-bottom">
                        <tr>
                            <th>Hora</th>
                            <th>Liga</th>
                            <th>Equipos</th>
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
                                <td>
                                    <div>
                                        <img
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                            }}
                                            src={match?.league?.poster}
                                            alt={match?.league?.league}
                                        />
                                    </div>
                                    <div>{match?.league?.league}</div>
                                </td>

                                <td>
                                    <div>
                                        <img
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                            }}
                                            src={match?.local?.poster}
                                            alt={match?.local.name}
                                        />
                                        {match?.local.name}
                                        <strong className="mx-1">
                                            {match?.score?.map(
                                                (score) => score?.local
                                            )}
                                        </strong>
                                    </div>
                                    <div>
                                        <img
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                            }}
                                            src={match?.away?.poster}
                                            alt={match?.away?.name}
                                        />
                                        {match?.away?.name}
                                        <strong className="mx-1">
                                            {match?.score?.map(
                                                (score) => score?.away
                                            )}
                                        </strong>
                                    </div>
                                </td>

                                <td>
                                    <div>
                                        {match?.moreImportant !== undefined ? (
                                            match?.moreImportant ? (
                                                <span className="text-primary">
                                                    Importante
                                                </span>
                                            ) : (
                                                <span className="text-danger">
                                                    No importante
                                                </span>
                                            )
                                        ) : (
                                            <span className="text-warning">
                                                No asignado
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        {match?.status ? (
                                            <span className="text-success">
                                                Abierto!
                                            </span>
                                        ) : (
                                            <span className="text-danger">
                                                Cerrado!
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <DetailsButton
                                            route={`../matches/${match?._id}`}
                                        />
                                        {handleUpdate ? (
                                            <EditButton
                                                data={match}
                                                handleUpdate={handleUpdate}
                                            />
                                        ) : null}
                                        {handleDelete ? (
                                            <DeleteButton
                                                data={match?._id}
                                                handleDelete={handleDelete}
                                            />
                                        ) : null}
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <caption className="m-1">
                        Total: {match?.length} partidos
                    </caption>
                </Table>
            </div>
        </>
    )
}

export default TableMatches
