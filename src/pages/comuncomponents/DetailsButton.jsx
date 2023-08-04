import React from 'react'
import { Link } from 'react-router-dom'

const DetailsButton = ({ route }) => {
    return (
        <>
            <Link
                style={{ fontSize: '13px' }}
                className="btn  btn-dark btn-sm w-100 "
                to={route}
            >
                Detalles
            </Link>
        </>
    )
}

export default DetailsButton
