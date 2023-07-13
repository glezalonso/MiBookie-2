import React from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { verifyOTP } from '../../services/users'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Col, Row } from 'react-bootstrap'
import { validateOTP } from '../../helpers/validations'
import { useMutation } from '@tanstack/react-query'
import { useRecovery } from '../../store/recovery'

const VerifyOTP = () => {
    const { email } = useRecovery((state) => state)
    const setOTP = useRecovery((state) => state.setOTP)
    const navigate = useNavigate()

    const mutationOTP = useMutation({
        mutationFn: verifyOTP,
        onSuccess: (data) => {
            toast.success('Code Correct!!')
            console.log(data.data)
            setOTP(data.data)
            setTimeout(() => {
                navigate('../reset')
            }, 3000)
        },
        onError: () => toast.error('Incorrect code!'),
    })
    const formik = useFormik({
        initialValues: {
            OTP: '',
        },
        validate: validateOTP,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            values = Object.assign(values, { email })
            mutationOTP.mutate(values)
        },
    })

    return (
        <>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <Container className=" w-75 h-75 mt-5 rounded">
                <Row>
                    <Col className="col-lg-6 col-xs-12 bg-dark text-light  mx-auto p-4 border rounded">
                        <h1 className="pt-3 text-center">Verify Code</h1>
                        <Form
                            className=" m-1 w-100"
                            onSubmit={formik.handleSubmit}
                        >
                            <Form.Group>
                                <Form.Label className="mt-1" htmlFor="OTP">
                                    Code OTP
                                </Form.Label>
                                <Form.Control
                                    {...formik.getFieldProps('OTP')}
                                    type="text"
                                    name="OTP"
                                    id="OTP"
                                    placeholder="Code OTP"
                                />
                            </Form.Group>
                            <Button variant="warning mt-2" type="submit">
                                Check code
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default VerifyOTP
