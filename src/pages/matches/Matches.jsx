import React from 'react'
import { useParams, Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import MatchContent from './components/MatchContent'
import Loading from '../../ui/Loading'
import { useGetMatch } from '../../features/matches.features'

const Matches = () => {
  const { id } = useParams()
  const { data: match, isLoading, isError } = useGetMatch(id)

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid >
         <Row className='mx-1 mt-2'>
         <Breadcrumb className='mx-1 mt-2'>
         <div className='breadcrumb-item'><Link to={`../leagues/${match?.league?._id}`}>{match?.league?.league}</Link></div>
         <div className='breadcrumb-item'><Link to={`../seasons/${match?.season?._id}`}>{match?.season?.season}</Link></div>
         <div className='breadcrumb-item'><Link to={`../rounds/${match?.round?._id}`}>{match?.round?.round}</Link></div>
          <Breadcrumb.Item className='text-secondary' active>{match?.local?.name} vs {match?.away?.name}</Breadcrumb.Item>
          </Breadcrumb>
            <Col lg={12} className='p-2' >

                <MatchContent match={match} />
            </Col>
          </Row>

         </Container>
        </>
  )
}

export default Matches
