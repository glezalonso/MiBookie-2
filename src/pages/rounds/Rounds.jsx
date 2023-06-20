import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col, Breadcrumb, Spinner } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import SectionMatches from './components/SectionMatches'
import { getRound } from '../../services/rounds'

const Rounds = () => {
  const { id } = useParams()
  const { data: round, isLoading, isError } = useQuery({ queryKey: ['round', id], queryFn: () => getRound(id) })

  if (isLoading) return <Spinner animation="border" variant="warning" />
  if (isError) return toast.error('failed to load!')

  return (

         <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container >
         <Row >
         <Breadcrumb>
         <div className='breadcrumb-item'><Link to={`../sports/${round?.sport?._id}`}>{round?.sport?.sport}</Link></div>
         <div className='breadcrumb-item'><Link to={`../leagues/${round?.league?._id}`}>{round?.league?.league}</Link></div>
         <div className='breadcrumb-item'><Link to={`../seasons/${round?.season?._id}`}>{round?.season?.season}</Link></div>
          <Breadcrumb.Item active>{round?.round}</Breadcrumb.Item>
          </Breadcrumb>
            <Col >
            <SectionMatches round={round}/>
            </Col>
          </Row>

         </Container>

        </>
  )
}

export default Rounds
