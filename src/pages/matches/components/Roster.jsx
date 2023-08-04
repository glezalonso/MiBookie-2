import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import FormFilter from '../../comuncomponents/FormFilter'
import TableRoster from './TableRoster'

const Roaster = ({ match, roster, handleAddLineUp, type }) => {
    const [dataFilter, setDataFilter] = useState('')

    const players = roster?.map((team) =>
        team?.players?.map((player) => player.playerId)
    )

    const filter = players?.map((players) =>
        players.filter((player) => {
            if (dataFilter)
                return player?.fullName
                    ?.toLowerCase()
                    .includes(dataFilter?.toLowerCase())
            else return player
        })
    )

    return (
        <>
            <section>
                <h5 className="h5">
                    {type === 'local' ? match?.local?.name : match?.away.name}{' '}
                    plantilla
                </h5>
                <FormFilter
                    name={'jugador'}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                />

                {filter?.length > 0 ? (
                    <TableRoster
                        match={match}
                        type={type}
                        players={filter}
                        handleAddLineUp={handleAddLineUp}
                    />
                ) : (
                    <Alert variant="warning">
                        No hay jugadores para mostar!
                    </Alert>
                )}
            </section>
        </>
    )
}

export default Roaster
