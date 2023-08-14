import React from 'react'
import { Table, ButtonGroup } from 'react-bootstrap'
import DetailsButton from '../../comuncomponents/DetailsButton'
import EditButton from '../../comuncomponents/EditButton'
import DeleteButton from '../../comuncomponents/DeleteButton'

const TableSports = ({ sports, handleUpdate, handleDelete }) => {
    return (
        <>
            <div className="data-tables bg-light rounded p-1 my-1">
                <Table responsive size="sm" borderless variant="light" hover>
                    <thead className="border-bottom">
                        <tr>
                            <th>Deporte</th>
                            <th>Description</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sports?.map((sport) => (
                            <tr key={sport?._id}>
                                <td>
                                    <img
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            marginRight: '2px',
                                        }}
                                        src={sport?.poster}
                                        alt={sport?.sport}
                                    />
                                    {sport?.sport}
                                </td>
                                <td>{sport?.description}</td>
                                <td>
                                    <ButtonGroup>
                                        <DetailsButton
                                            route={`./${sport?._id}`}
                                        />
                                        <EditButton
                                            data={sport}
                                            handleUpdate={handleUpdate}
                                        />
                                        <DeleteButton
                                            data={sport?._id}
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

export default TableSports
