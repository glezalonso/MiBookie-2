import React, { useState } from 'react'
import {
    useAddLineUp,
    useRemoveLineUp,
} from '../../../features/matches.features'
import MatchDetail from './MatchDetail'
import MatchSettings from './MatchSettings'
import ModalScore from './ModalScore'
import SectionClose from './SectionClose'
import MatchVotes from './MatchVotes'

const MatchContent = ({ match }) => {
    const addLineUp = useAddLineUp()
    const removeLineUp = useRemoveLineUp()

    const [modalShow, setModalShow] = useState(false)

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    const handleAddLineUp = (id, playerId, type) => {
        addLineUp.mutate({ id, body: { playerId, type } })
    }

    const handleRemoveLineUp = (id, playerId, lineId, type) => {
        removeLineUp.mutate({ id, data: { playerId, lineId, type } })
    }

    return (
        <>
            <section>
                <h5>Datos del partido</h5>
                <MatchDetail match={match} />
                <MatchVotes match={match} />
                {match?.status && <SectionClose handleShow={handleShow} />}
                <ModalScore
                    match={match}
                    modalShow={modalShow}
                    handleClose={handleClose}
                />
                {match?.status && (
                    <MatchSettings
                        match={match}
                        handleRemoveLineUp={handleRemoveLineUp}
                        handleAddLineUp={handleAddLineUp}
                    />
                )}
            </section>
        </>
    )
}
export default MatchContent
