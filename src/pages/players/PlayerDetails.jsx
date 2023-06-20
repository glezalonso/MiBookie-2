import React from 'react'
import { useParams } from 'react-router-dom'
const PlayerDetails = () => {
  const { id } = useParams()
  return (
        <>{id}</>
  )
}

export default PlayerDetails
