import React from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { useFormik } from 'formik'
import { validateRound } from '../../../helpers/validations'
import { useGetLeagues } from '../../../features/leagues.features'
import { useGetSeasons } from '../../../features/seasons.features'

const ModalRounds = ({
    round,
    season,
    modalShow,
    handleClose,
    action,
    type,
    setUpdate,
    seasonId,
}) => {
    const { data: leagues } = useGetLeagues()
    const { data: seasons } = useGetSeasons()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            round: round?.round || '',
            roundNumber: round?.roundNumber || '',
            status: round?.status || '',
            season: season?._id || '',
            league: season?.league?._id,
            sport: season?.sport?._id,
        },
        validate: validateRound,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            action.mutate(
                !round?._id ? values : { id: round?._id, body: values }
            )
            formik.resetForm()
            handleClose()
            setUpdate(false)
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
                    <Modal.Title>{type} jornada</Modal.Title>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Jornada</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('round')}
                                type="text"
                                id="round"
                                name="round"
                            ></FormControl>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Número de jornada</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('roundNumber')}
                                type="number"
                                id="roundNumber"
                                name="roundNumber"
                            ></FormControl>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Temporada</Form.Label>
                            <Form.Select
                                id="season"
                                name="season"
                                {...formik.getFieldProps('season')}
                                disabled
                            >
                                <option value={false}>
                                    Selecciona la temporada
                                </option>
                                {seasons?.map((season) => (
                                    <option
                                        key={season?._id}
                                        value={season?._id}
                                    >
                                        {season?.season}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Liga</Form.Label>
                            <Form.Select
                                id="league"
                                name="league"
                                {...formik.getFieldProps('league')}
                                disabled
                            >
                                <option value={false}>
                                    Selecciona la liga
                                </option>
                                {leagues?.map((league) => (
                                    <option
                                        key={league?._id}
                                        value={league?._id}
                                    >
                                        {league?.league}
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
                                <option>Selecciona el estatus</option>
                                <option value={true}>Activo</option>
                                <option value={false}>Inactivo</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={handleCloseUpdate}>
                            Cerrar
                        </Button>
                        <Button variant="warning" type="submit">
                            {type} jornada
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalRounds
