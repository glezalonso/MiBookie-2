import React from 'react'
import { Button } from 'react-bootstrap'

const SectionClose = ({ handleShow }) => {
    return (
        <>
            <div className="d-flex justify-content-center my-1">
                <Button
                    variant="warning my-2 btn-sm"
                    onClick={() => handleShow()}
                >
                    Colocar marcador
                </Button>
            </div>
        </>
    )
}

export default SectionClose
