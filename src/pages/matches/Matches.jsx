import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import { getMatch } from '../../services/matches'
import MatchContent from './components/MatchContent'
import Loading from '../../ui/Loading'

const Matches = () => {
  const { id } = useParams()
  const { data: match, isLoading, isError } = useQuery({ queryKey: ['match', id], queryFn: () => getMatch(id) })

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container >
         <Row >
         <Breadcrumb className='mt-3 p-2'>
         <div className='breadcrumb-item'><Link to={`../leagues/${match?.league?._id}`}>{match?.league?.league}</Link></div>
         <div className='breadcrumb-item'><Link to={`../seasons/${match?.season?._id}`}>{match?.season?.season}</Link></div>
         <div className='breadcrumb-item'><Link to={`../rounds/${match?.round?._id}`}>{match?.round?.round}</Link></div>
          <Breadcrumb.Item active>{match?.local?.name} vs {match?.away?.name}</Breadcrumb.Item>
          </Breadcrumb>
            <Col >

                <MatchContent match={match} />
            </Col>
          </Row>

         </Container>
        </>
  )
}

export default Matches
