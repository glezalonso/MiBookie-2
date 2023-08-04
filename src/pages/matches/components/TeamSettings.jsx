import React from 'react'
import LocalLineUp from './LocalLineUp'
import AwayLineUp from './AwayLineUp'

const TeamSettings = ({ match, handleRemoveLineUp, type }) => {
    return (
        <>
            {type === 'local' ? (
                <LocalLineUp
                    match={match}
                    handleRemoveLineUp={handleRemoveLineUp}
                />
            ) : (
                <AwayLineUp
                    match={match}
                    handleRemoveLineUp={handleRemoveLineUp}
                />
            )}
        </>
    )
}
export default TeamSettings
