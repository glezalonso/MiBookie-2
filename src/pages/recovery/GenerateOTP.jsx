import React from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { generateOTP } from '../../services/users'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { validateEmail } from '../../helpers/validations'
import { useMutation } from '@tanstack/react-query'
import { useRecovery } from '../../store/recovery'

const GenerateOTP = () => {
    const email = useRecovery((state) => state.setEmail)
    const navigate = useNavigate()

    const mutationOTP = useMutation({
        mutationFn: generateOTP,
        onSuccess: () => {
            toast.success('Email sended!')
            setTimeout(() => {
                navigate('../verify')
            }, 3000)
        },
        onError: () => toast.error('Email not valid!'),
    })
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: validateEmail,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            email(values.email)
            mutationOTP.mutate(values)
        },
    })

    return (
        <>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <Container className="bg-light w-75 h-75 mt-5 text-dark rounded">
                <Row>
                    <Col className="col-lg-6 col-xs-12 bg-dark text-light  mx-auto p-4 border rounded">
                        <h1 className="h1 pt-3 text-center">Reset Password</h1>
                        <Form
                            className=" m-1 w-100"
                            onSubmit={formik.handleSubmit}
                        >
                            <Form.Group>
                                <Form.Label className="mt-1" htmlFor="email">
                                    Email
                                </Form.Label>
                                <Form.Control
                                    className="w-100"
                                    {...formik.getFieldProps('email')}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Please enter you email to send a code"
                                />
                            </Form.Group>
                            <Button variant="warning d-flex mt-2" type="submit">
                                Send mail
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default GenerateOTP
