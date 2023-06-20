import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTeams } from '../../services/teams'
import Navigate from '../../ui/Navigate'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import { toast, Toaster } from 'react-hot-toast'
import TableTeams from './components/TableTeams'

const Teams = () => {
  const { data: teams, isLoading, isError } = useQuery({ queryKey: ['teams'], queryFn: getTeams })

  if (isLoading) return <Spinner animation="border" variant="warning" />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container >
          <Row >
            <Col >
            <TableTeams teams={teams}/>
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default Teams
