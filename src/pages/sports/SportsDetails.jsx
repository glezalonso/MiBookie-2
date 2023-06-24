import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import toast, { Toaster } from 'react-hot-toast'
import Loading from '../../ui/Loading'
import SectionLeagues from './components/SectionLeagues'
import { useGetSport } from '../../features/sports.features'

const SportDetails = () => {
  const { id } = useParams()
  const { data: sport, isLoading, isError } = useGetSport(id)

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid >
          <Row className='m-1 rounded' >
          <Breadcrumb className='mx-1 mt-2'>
          <Breadcrumb.Item className='text-secondary' active>{sport?.sport}</Breadcrumb.Item>
          </Breadcrumb>
            <Col lg={12} className='p-2' >
            <SectionLeagues sport={sport} />
            </Col>
          </Row>
        </Container>

        </>
  )
}

export default SportDetails
