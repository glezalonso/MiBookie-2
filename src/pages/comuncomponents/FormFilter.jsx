import React from 'react'
import { FormControl } from 'react-bootstrap'

const FormFilter = ({ name, dataFilter, setDataFilter }) => {
    return (
        <>
            <div className="mx-auto my-3">
                <FormControl
                    size="sm"
                    className="mb-3"
                    placeholder={`Buscar ${name}...`}
                    name={name}
                    value={dataFilter}
                    onChange={(event) => setDataFilter(event.target.value)}
                />
            </div>
        </>
    )
}

export default FormFilter
