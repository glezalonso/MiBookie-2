import React, { useState } from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { useFormik } from 'formik'
import { getSports } from '../../../services/sports'
import { convertToBase64 } from '../../../helpers/converters'
import { validateLeague } from '../../../helpers/validations'
import { useQuery } from '@tanstack/react-query'

const ModalLeagues = ({ league, sportId, modalShow, handleClose, action, type, setUpdate }) => {
  const { data: sports } = useQuery({ queryKey: ['sports'], queryFn: getSports })
  const [file, setFile] = useState()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      league: league?.league || '',
      description: league?.description || '',
      sport: sportId
    },
    validate: validateLeague,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      values = Object.assign(values, { poster: league?.poster || file || '' })
      action.mutate((!league?._id) ? values : { id: league?._id, body: values })
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
        <Modal className ="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{type} league</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>League</Form.Label>
                        <FormControl {...formik.getFieldProps('league')} type="text" id="league" name="league"></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <FormControl {...formik.getFieldProps('description')} type="text" id="description" name="description"></FormControl>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Poster</Form.Label>
                        <FormControl type="file" id="poster" name="poster" onChange={onUpload}></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Sport:</Form.Label>
                        <Form.Select id="sport" name="sport" {...formik.getFieldProps('sport')}>
                            <option value={false} >Select sport</option>
                        {sports?.map(sport => (
                            <option key={sport?._id} value={sport?._id}>{sport?.sport}</option>

                        ))}
                        </Form.Select>
                    </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>Close</Button>
                <Button variant="primary" type="submit">{type} league</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalLeagues
