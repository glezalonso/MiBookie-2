import React, { useState } from 'react'
import { useFormik } from 'formik'
import { convertToBase64 } from '../../../helpers/converters'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { validateTeam } from '../../../helpers/validations'
import { useGetSports } from '../../../features/sports.features'

const ModalTeams = ({ team, modalShow, handleClose, action, type, setUpdate }) => {
  const { data: sports } = useGetSports()
  const [file, setFile] = useState()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: team?.name || '',
      stadium: team?.stadium || '',
      status: team?.status || '',
      sport: team?.sport?._id || ''
    },
    validate: validateTeam,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      values = Object.assign(values, { poster: team?.poster || file || '' })
      action.mutate((!team?._id) ? values : { id: team?._id, body: values })
      formik.resetForm()
      handleClose()
      setUpdate(false)
    }
  })

  const onUpload = async event => {
    const base64 = await convertToBase64(event.target.files[0])
    setFile(base64)
  }

  const handleCloseUpdate = () => {
    formik.resetForm()
    setUpdate(false)
    handleClose()
  }

  return (
        <>
        <Modal className="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header >
                <Modal.Title>{type} equipo</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <FormControl {...formik.getFieldProps('name')} type="text" id="name" name="name"></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Estadio</Form.Label>
                        <FormControl {...formik.getFieldProps('stadium')} type="text" id="stadium" name="stadium"></FormControl>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Escudo</Form.Label>
                        <FormControl type="file" id="poster" name="poster" onChange={onUpload}></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Deporte:</Form.Label>
                        <Form.Select id="sport" name="sport" {...formik.getFieldProps('sport')}>
                            <option value={false} >Selecciona el deporte al que pertenece</option>
                        {sports?.map(sport => (
                            <option key={sport?._id} value={sport?._id}>{sport?.sport}</option>

                        ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Estatus</Form.Label>
                        <Form.Select id="status" name="status"{...formik.getFieldProps('status')} >
                            <option >Selecciona el estatus</option>
                            <option value={true}>Activo</option>
                            <option value={false}>Inactivo</option>
                        </Form.Select>
                    </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={() => handleCloseUpdate()}>Cerrar</Button>
                <Button variant="dark" type="submit">{type} equipo</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalTeams
