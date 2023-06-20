import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import { convertToBase64 } from '../../../helpers/converters'
import { validateSport } from '../../../helpers/validations'

const ModalSports = ({ sport, modalShow, handleClose, action, type, setUpdate }) => {
  const [file, setFile] = useState()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sport: sport?.sport || '',
      description: sport?.description || ''
    },
    validate: validateSport,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      values = Object.assign(values, { poster: sport?.poster || file || '' })
      action.mutate((!sport?._id) ? values : { id: sport?._id, body: values })
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
            <Modal.Header closeButton>
                <Modal.Title>{type} sport</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Sport</Form.Label>
                        <Form.Control {...formik.getFieldProps('sport')} type="text" id="sport" name="sport" ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                            <Form.Control {...formik.getFieldProps('description')} type="text" id="description" name="description"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Poster</Form.Label>
                        <Form.Control type="file" id="poster" name="poster" onChange={onUpload}></Form.Control>
                    </Form.Group>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>Close</Button>
                <Button variant="primary" type="submit">{type} sport</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalSports
