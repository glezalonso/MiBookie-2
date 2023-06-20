import React from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { verifyOTP } from '../../services/users'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { validateOTP } from '../../helpers/validations'
import { useMutation } from '@tanstack/react-query'
import { useRecovery } from '../../store/recovery'

const VerifyOTP = () => {
  const { email } = useRecovery(state => state.email)
  const OTP = useRecovery(state => state.setOTP)
  const navigate = useNavigate()

  const mutationOTP = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      toast.success('Code Correct!!')
      OTP(data.data)
      navigate('../reset')
    },
    onError: () => toast.error('Incorrect code!')
  })
  const formik = useFormik({
    initialValues: {
      OTP: ''
    },
    validate: validateOTP,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      values = Object.assign(values, { email })
      mutationOTP.mutate(values)
    }
  })

  return (
        <>
    <Toaster position="top-center" reverseOrder={false}></Toaster>
       <Container className="mt-5 w-50 h-50 bg-dark text-light rounded p-4" >
            <h1 className='text-center'>Verify Code</h1>
            <Form className=" m-1 w-100" onSubmit={formik.handleSubmit}>
            <Form.Group>
            <Form.Label className='mt-1' htmlFor="OTP">Code OTP</Form.Label>
            <Form.Control {...formik.getFieldProps('OTP')} type="text" name="OTP" id="OTP" placeholder='Code OTP'/>
            </Form.Group>
            <Button variant="warning mt-2 float-right" type='submit'>Check code</Button>
            </Form>
        </Container>
       </>
  )
}
export default VerifyOTP
