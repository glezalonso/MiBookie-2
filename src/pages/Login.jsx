import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import { verifyLogin } from '../helpers/validations'
import { useLogin } from '../features/users.features'
import logo from '../assets/mibookie.png'

const Login = () => {
    const login = useLogin()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate: verifyLogin,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            login.mutate(values)
        },
    })

    return (
        <>
            <Container className="d-flex justify-content-center " fluid>
                <Row className=" my-5 vh-50 vw-50">
                    <Col
                        xs={12}
                        className="bg-dark text-light  mx-auto p-3 rounded "
                    >
                        <div className="d-flex justify-content-center">
                            <div className="mt-2">
                                <img
                                    style={{ width: '100px', height: '100px' }}
                                    src={logo}
                                    alt="Mi Bookie"
                                />
                            </div>
                            <div className="mt-5 mx-3">
                                <h1 className="text-center">Mi Bookie Panel</h1>
                            </div>
                        </div>

                        <Form className="p-2" onSubmit={formik.handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="username">
                                    Usuario:{' '}
                                </Form.Label>
                                <Form.Control
                                    {...formik.getFieldProps('username')}
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Usuario"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="password">
                                    Contraseña:{' '}
                                </Form.Label>
                                <Form.Control
                                    {...formik.getFieldProps('password')}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Contraseña"
                                />
                            </Form.Group>
                            {/* <Form.Label className='mt-1' ><Link to={'recovery'}>Forget your password?</Link></Form.Label> */}
                            <Button
                                type="submit"
                                variant="warning d-flex mt-2 "
                            >
                                Iniciar Sesión
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Login
