import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import Loading from '../../ui/Loading'
import { getLeague } from '../../services/leagues'
import SectionSeasons from './components/SectionSeasons'

const Leagues = () => {
  const { id } = useParams()
  const { data: league, isLoading, isError } = useQuery({ queryKey: ['league', id], queryFn: () => getLeague(id) })

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container >
         <Row >
         <Breadcrumb className='mt-3 p-2'>
         <div className='breadcrumb-item'><Link to={`../sports/${league?.sport?._id}`}>{league?.sport?.sport}</Link></div>
          <Breadcrumb.Item active>{league?.league}</Breadcrumb.Item>
          </Breadcrumb>
            <Col >
            <SectionSeasons league={league} />
            </Col>
          </Row>

         </Container>

        </>
  )
}

export default Leagues
