import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import SectionMatches from './components/SectionMatches'
import Loading from '../../ui/Loading'
import { useGetRound } from '../../features/rounds.features'

const Rounds = () => {
  const { id } = useParams()
  const { data: round, isLoading, isError } = useGetRound(id)

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (

         <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid>
         <Row className='m-2 p-2 mx-auto' >
            <Col xs={12} md={11} className='border rounded mx-auto  fs-6' >
         <Breadcrumb className='mx-1 mt-2'>
         <div className='breadcrumb-item'><Link to={`../sports/${round?.sport?._id}`}>{round?.sport?.sport}</Link></div>
         <div className='breadcrumb-item'><Link to={`../leagues/${round?.league?._id}`}>{round?.league?.league}</Link></div>
         <div className='breadcrumb-item'><Link to={`../seasons/${round?.season?._id}`}>{round?.season?.season}</Link></div>
          <Breadcrumb.Item className='text-secondary' active>{round?.round}</Breadcrumb.Item>
          </Breadcrumb>
          </Col>
            <Col xs={12} md={11} className='border rounded mx-auto mt-2 p-3 fs-6' >
            <h5 className="h7 ">Matches</h5>
            <SectionMatches round={round}/>
            </Col>
          </Row>

         </Container>

        </>
  )
}

export default Rounds
