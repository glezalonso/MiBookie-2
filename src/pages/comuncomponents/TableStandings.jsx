import React from 'react'
import { Table } from 'react-bootstrap'
import { ID_SOCCER } from '../../const/const'

const TableStandings = ({ season, standings }) => {
    let i = 1
    return (
        <>
            <div className="data-tables bg-light rounded p-1 my-1">
                <Table responsive size="sm" borderless variant="light" hover>
                    <thead className="border-bottom">
                        <tr>
                            <th>Pos.</th>
                            <th>Equipo </th>
                            <th>Gan</th>
                            <th>Emp</th>
                            <th>Per</th>
                            {season?.sport?._id === ID_SOCCER ? (
                                <th>Pts</th>
                            ) : null}
                        </tr>
                    </thead>
                    <tbody>
                        {standings?.map((team) => (
                            <tr key={team?.team?._id}>
                                <td>{i++}</td>
                                <td>{team?.team?.name}</td>
                                <td>{team?.wins}</td>
                                <td>{team?.draws}</td>
                                <td>{team?.loses}</td>
                                {season?.sport?._id === ID_SOCCER ? (
                                    <td>
                                        {season?.sport?._id === ID_SOCCER
                                            ? team?.wins * 3 + team?.draws
                                            : null}
                                    </td>
                                ) : null}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}
export default TableStandings
