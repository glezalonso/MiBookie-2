import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetPassword } from '../../services/users'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { validateResetPassword } from '../../helpers/validations'
import { useRecovery } from '../../store/recovery'

const ResetPassword = () => {
  const { OTP } = useRecovery(state => state.OTP)
  const { email } = useRecovery(state => state.email)
  const empty = useRecovery(state => state.setEmpty)

  const navigate = useNavigate()

  const mutationOTP = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Reseted successfully')
      empty()
      navigate('/')
    },
    onError: () => toast.error('Failed to reset password!')
  })

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: validateResetPassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      values = Object.assign(values, { OTP, email })
      mutationOTP.mutate(values)
    }
  })

  return (
        <>
    <Toaster position="top-center" reverseOrder={false}></Toaster>
       <Container className="mt-5 w-50 h-50 bg-dark text-light rounded p-4" >
            <h1 className='text-center'>Reset password</h1>
            <Form className=" m-1 w-100" onSubmit={formik.handleSubmit}>
            <Form.Group>
            <Form.Label className='mt-1' htmlFor="password">Password</Form.Label>
            <Form.Control {...formik.getFieldProps('password')} type="password" name="password" id="password" placeholder='Password'/>
            </Form.Group>
            <Form.Group>
            <Form.Label className='mt-1' htmlFor="confirmPassword">Confirm Password</Form.Label>
            <Form.Control {...formik.getFieldProps('confirmPassword')} type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm password'/>
            </Form.Group>
            <Button variant="warning mt-2 float-right" type='submit'>Reset Password</Button>
            </Form>
        </Container>
       </>
  )
}
export default ResetPassword
