import React from 'react'
import { Alert } from 'react-bootstrap'
import TableStandings from '../../comuncomponents/TableStandings'

const SectionStandings = ({ season }) => {
    const standings = season?.standings?.sort((a, b) => {
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
                {standings?.length > 0 ? (
                    <TableStandings season={season} standings={standings} />
                ) : (
                    <Alert variant="warning">No hay participantes!</Alert>
                )}
            </section>
        </>
    )
}

export default SectionStandings
