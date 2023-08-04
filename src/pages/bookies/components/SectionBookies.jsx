import React, { useState } from 'react'
import {
    useUpdateBookie,
    useDeleteBookie,
} from '../../../features/bookies.features'

import { Alert } from 'react-bootstrap'
import ModalBookies from './ModalBookies'
import FormFilter from '../../comuncomponents/FormFilter'
import TableBookies from './TableBookies'

const SectionBookies = ({ bookies }) => {
    const updateBookie = useUpdateBookie()
    const deleteBookie = useDeleteBookie()
    const [dataFilter, setDataFilter] = useState('')

    const [modalShow, setModalShow] = useState(false)
    const [bookie, setBookie] = useState([])

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    const handleDelete = (id) => {
        const sure = confirm('Estas seguro que deseas borrar?')
        if (sure) return deleteBookie.mutate(id)
    }

    const handleUpdate = (data) => {
        handleShow()
        setBookie(data)
    }

    const filter = bookies?.filter((bookie) => {
        if (dataFilter)
            return (
                bookie?.fullName
                    ?.toLowerCase()
                    .includes(dataFilter.toLowerCase()) ||
                bookie?.email
                    ?.toLowerCase()
                    .includes(dataFilter.toLowerCase()) ||
                bookie?.username
                    ?.toLowerCase()
                    .includes(dataFilter.toLowerCase())
            )
        else return bookie
    })
    return (
        <>
            <section>
                <h5>Bookies</h5>
                <FormFilter
                    name={'bookie'}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                />
                <ModalBookies
                    bookie={bookie}
                    modalShow={modalShow}
                    handleClose={handleClose}
                    action={updateBookie}
                />
                {filter?.length > 0 ? (
                    <TableBookies
                        bookies={filter}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
                ) : (
                    <Alert variant="warning">No hay bookies para mostar!</Alert>
                )}
            </section>
        </>
    )
}

export default SectionBookies
