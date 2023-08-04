import React from 'react'
import { Button } from 'react-bootstrap'

const DeleteButton = ({ data, handleDelete }) => {
    return (
        <>
            <Button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(data)}
            >
                Borrar
            </Button>
        </>
    )
}

export default DeleteButton
