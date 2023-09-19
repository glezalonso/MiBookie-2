import React from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useGetSeasons } from '../../../features/seasons.features'
import { useGetBookies } from '../../../features/bookies.features'

const ModalTournament = ({
    tournament,
    modalShow,
    handleClose,
    action,
    type,
    setUpdate,
}) => {
    const { data: seasons } = useGetSeasons()
    const { data: bookies } = useGetBookies()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            season: tournament?.season?._id || '',
            status: tournament?.status || '',
            minimum: tournament?.minimum || '',
            bookie: tournament?.bookie || '',
            votes: tournament?.votes || '',
            success: tournament?.success || '',
        },
        validate: false,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            action.mutate(
                !tournament?._id
                    ? values
                    : { id: tournament?._id, body: values }
            )
            formik.resetForm()
            handleClose()
        },
    })

    const handleCloseUpdate = () => {
        formik.resetForm()
        setUpdate(false)
        handleClose()
    }

    return (
        <>
            <Modal
                className="text-dark"
                show={modalShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>{type} Torneo</Modal.Title>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Temporada</Form.Label>
                            <Form.Select
                                id="season"
                                name="season"
                                {...formik.getFieldProps('season')}
                            >
                                <option>Selecciona la Temporadas</option>
                                {seasons?.map((season) => (
                                    <option
                                        key={season?._id}
                                        value={season?._id}
                                    >
                                        {season?.season}-{' '}
                                        {season?.league?.league}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Estatus</Form.Label>
                            <Form.Select
                                id="status"
                                name="status"
                                {...formik.getFieldProps('status')}
                            >
                                <option>Selecciona el Estatus</option>
                                <option value={true}>Activo</option>
                                <option value={false}>Inactivo</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mínimo</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('minimum')}
                                type="number"
                                id="minimum"
                                name="minimum"
                            ></FormControl>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Bookie</Form.Label>
                            <Form.Select
                                id="bookie"
                                name="bookie"
                                {...formik.getFieldProps('bookie')}
                            >
                                <option value={' '}>
                                    Selecciona al ganador
                                </option>
                                {bookies?.map?.((user) => (
                                    <option key={user?._id} value={user?._id}>
                                        {user?.username}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Votos</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('votes')}
                                type="number"
                                id="votes"
                                name="votes"
                            ></FormControl>
                        </Form.Group>
                        <Form.Label>Aciertos</Form.Label>
                        <FormControl
                            {...formik.getFieldProps('success')}
                            type="number"
                            id="success"
                            name="success"
                        ></FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={handleCloseUpdate}>
                            Cerrar
                        </Button>
                        <Button variant="warning" type="submit">
                            {type} Torneo
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalTournament
