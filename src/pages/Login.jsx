import React from 'react'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { verifyLogin } from '../helpers/validations'
import { useMutation } from '@tanstack/react-query'
import { login } from '../services/users'
import { useAuthStore } from '../store/auth'

const Login = () => {
  const auth = useAuthStore(state => state.setAuth)
  const profile = useAuthStore(state => state.setProfile)
  const isAdmin = useAuthStore(state => state.setIsAdmin)

  const getLogin = useMutation(
    {
      mutationFn: login,
      onSuccess: data => {
        toast.success('Logged in! ')
        auth(data.data.token)
        profile(data.data.username)
        isAdmin(data.data.isAdmin)
      },
      onError: () => toast.error('Failed to log in!')
    })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: verifyLogin,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      getLogin.mutate(values)
    }

  })

  return (
        <>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
            <Container className=' bg-dark w-75 h-75 mt-5'>
              <Row >
              <h1 className="h1 pt-3 text-center">Mi Bookie Panel</h1>
                <Col className="col-lg-12 col-xs-12 p-3">
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
