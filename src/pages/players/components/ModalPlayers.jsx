import React, { useState } from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { useGetSports } from '../../../features/sports.features'
import { useFormik } from 'formik'
import { convertToBase64 } from '../../../helpers/converters'
import { validatePlayer } from '../../../helpers/validations'

const ModalPlayers = ({ player, modalShow, handleClose, action, type, setUpdate }) => {
  const { data: sports } = useGetSports()
  const [file, setFile] = useState()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: player?.fullName || '',
      position: player?.position || '',
      sport: player?.sport?._id || '',
      status: player?.status || '',
      team: ''
    },
    validate: validatePlayer,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      values = Object.assign(values, { photo: player?.photo || file || '' })
      action.mutate((!player?._id) ? values : { id: player?._id, body: values })
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
                <Modal.Title>{type} player</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>Fullname</Form.Label>
                        <FormControl {...formik.getFieldProps('fullName')} type="text" id="fullName" name="fullName"></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Position</Form.Label>
                        <FormControl {...formik.getFieldProps('position')} type="text" id="position" name="position"></FormControl>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Photo</Form.Label>
                        <FormControl type="file" id="photo" name="photo" onChange={onUpload}></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Sport:</Form.Label>
                        <Form.Select id="sport" name="sport" {...formik.getFieldProps('sport')}>
                            <option value={false}>Select sport</option>
                        {sports?.map(sport => (
                            <option key={sport?._id} value={sport?._id}>{sport?.sport}</option>

                        ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select id="status" name="status"{...formik.getFieldProps('status')} >
                            <option >Select status</option>
                            <option value={true}>Active</option>
                            <option value={false}>Desactivate</option>
                        </Form.Select>
                    </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={handleCloseUpdate}>Close</Button>
                <Button variant="warning" type="submit">{type} player</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalPlayers
