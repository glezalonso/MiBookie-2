import React from 'react'
import { Table, ButtonGroup } from 'react-bootstrap'
import DetailsButton from './DetailsButton'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'

const TableSeasons = ({ seasons, handleUpdate, handleDelete }) => {
    return (
        <>
            <div className="data-tables bg-light p-1 my-1 rounded">
                <Table size="sm" responsive variant="light" hover borderless>
                    <thead className="border-bottom">
                        <tr>
                            <th>Temporada</th>
                            <th>Liga</th>
                            <th>Deporte</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seasons?.map((season) => (
                            <tr key={season?._id}>
                                <td>{season?.season}</td>
                                <td>
                                    <img
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                        }}
                                        src={season?.league?.poster}
                                        alt={season?.league?.league}
                                    />
                                    {season?.league?.league}
                                </td>
                                <td>
                                    <img
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                        }}
                                        src={season?.sport?.poster}
                                        alt={season?.sport?.sport}
                                    />
                                    {season?.sport?.sport}
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <DetailsButton
                                            route={`../seasons/${season?._id}`}
                                        />
                                        {handleUpdate ? (
                                            <EditButton
                                                data={season}
                                                handleUpdate={handleUpdate}
                                            />
                                        ) : null}
                                        {handleDelete ? (
                                            <DeleteButton
                                                data={season?._id}
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

export default TableSeasons
