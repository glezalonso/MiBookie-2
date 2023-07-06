import React from 'react'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { verifyLogin } from '../helpers/validations'
import { useLogin } from '../features/users.features'

const Login = () => {
  const login = useLogin()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: verifyLogin,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      login.mutate(values)
    }

  })

  return (
        <>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
            <Container className=' w-75 h-75 mt-5 rounded'>
              <Row >
                <Col className="col-lg-6 col-xs-12 bg-dark text-light  mx-auto p-4 border rounded">
                <h1 className="h1 pt-3 text-center">Mi Bookie Panel</h1>
                      <Form className='p-3' onSubmit={formik.handleSubmit}>
                      <Form.Group>
                      <Form.Label htmlFor="username">Username: </Form.Label>
                      <Form.Control {...formik.getFieldProps('username')} type="text" name="username" id="username" placeholder='Enter username' />
                      </Form.Group>
                      <Form.Group>
                      <Form.Label htmlFor="password" >Password: </Form.Label>
                      <Form.Control {...formik.getFieldProps('password')} type="password" name="password" id="password" placeholder='Enter password' />
                      </Form.Group>
                      <Form.Label />
                      <Form.Label className='mt-1' ><Link to={'recovery'}>Forget your password?</Link></Form.Label>
                      <Button type='submit' variant='warning d-flex '>Log In</Button>
                       </Form>
                </Col>
              </Row>

            </Container>
        </>
  )
}
export default Login
