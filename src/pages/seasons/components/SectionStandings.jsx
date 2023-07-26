import React from 'react'
import { Alert, Table } from 'react-bootstrap'

const SectionStandings = ({ season }) => {
    // counter
    let i = 1

    // SoccerID
    const ID_SOCCER = '648f71dea4ba8860dfe3830f'

    const sort = season?.standings?.sort((a, b) => {
        if (b.wins !== a.wins) {
            return b.wins - a.wins
        } else {
            return b.draws - a.draws
        }
    })

    return (
        <>
            <section>
                <h5>Posiciones</h5>
                {sort?.length > 0 ? (
                    <div className="data-tables bg-dark rounded p-1 my-1">
                        <Table
                            responsive
                            size="sm"
                            borderless
                            variant="dark"
                            hover
                        >
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
                                {sort?.map((team) => (
                                    <tr key={team?.team?._id}>
                                        <td>{i++}</td>
                                        <td>{team?.team?.name}</td>
                                        <td>{team?.wins}</td>
                                        <td>{team?.draws}</td>
                                        <td>{team?.loses}</td>
                                        {season?.sport?._id === ID_SOCCER ? (
                                            <td>
                                                {season?.sport?._id ===
                                                ID_SOCCER
                                                    ? team?.wins * 3 +
                                                      team?.draws
                                                    : null}
                                            </td>
                                        ) : null}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <Alert variant="warning">No hay participantes!</Alert>
                )}
            </section>
        </>
    )
}

export default SectionStandings
