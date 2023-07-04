import React from 'react'
import { useParams, Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import Loading from '../../ui/Loading'
import SectionSeasons from './components/SectionSeasons'
import { useGetLeague } from '../../features/leagues.features'

const Leagues = () => {
  const { id } = useParams()
  const { data: league, isLoading, isError } = useGetLeague(id)

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid >
         <Row className='m-2 p-2 mx-auto' >
            <Col xs={12} className='border rounded mx-auto  fs-6' >
         <Breadcrumb className='mx-1 mt-2'>
         <div className='breadcrumb-item'><Link to={`../sports/${league?.sport?._id}`}>{league?.sport?.sport}</Link></div>
          <Breadcrumb.Item className='text-secondary' active>{league?.league}</Breadcrumb.Item>
          </Breadcrumb>
          </Col>
            <Col xs={12} className='border rounded mt-2 p-3 mx-auto  fs-6'>
            <h5 className="h7 ">Seasons</h5>
            <SectionSeasons league={league} />
            </Col>
          </Row>

         </Container>

        </>
  )
}

export default Leagues
