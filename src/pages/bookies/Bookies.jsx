import React from 'react'
import { useGetBookies } from '../../features/bookies.features'
import { toast } from 'react-hot-toast'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import Loading from '../../ui/Loading'
import SectionBookies from './components/SectionBookies'

const Bookies = () => {
    const { data: bookies, isLoading, isError } = useGetBookies()

    if (isLoading) return <Loading />
    if (isError) return toast.error('failed to load!')

    return (
        <>
            <Navigate />
            <Container fluid>
                <Row className="my-2  mx-auto">
                    <Col xs={12} lg={8} className=" mx-auto my-1">
                        <SectionBookies bookies={bookies} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Bookies
