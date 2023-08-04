import React from 'react'
import { Button } from 'react-bootstrap'

const EditButton = ({ data, handleUpdate }) => {
    return (
        <>
            <Button
                className="btn btn-warning btn-sm "
                onClick={() => handleUpdate(data)}
            >
                Editar
            </Button>
        </>
    )
}

export default EditButton
