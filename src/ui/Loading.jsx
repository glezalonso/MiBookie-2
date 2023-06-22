import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
            <>
            <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="warning d-flex justify-content-center" />
            </div>
            </>

  )
}

export default Loading
