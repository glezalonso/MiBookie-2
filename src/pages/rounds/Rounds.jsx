import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import toast from 'react-hot-toast'
import SectionMatches from './components/SectionMatches'
import Loading from '../../ui/Loading'
import { useGetRound } from '../../features/rounds.features'

const Rounds = () => {
    const { id } = useParams()
    const { data: round, isLoading, isError } = useGetRound(id)

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar la jornada!')

    return (
        <>
            <Navigate />
            <Container fluid>
                <Row className="my-2  mx-auto">
                    <Col xs={12} lg={8} className=" mx-auto">
                        <Breadcrumb className=" p-2">
                            <div className="breadcrumb-item">
                                <Link to={`../sports/${round?.sport?._id}`}>
                                    {round?.sport?.sport}
                                </Link>
                            </div>
                            <div className="breadcrumb-item">
                                <Link to={`../leagues/${round?.league?._id}`}>
                                    {round?.league?.league}
                                </Link>
                            </div>
                            <div className="breadcrumb-item">
                                <Link to={`../seasons/${round?.season?._id}`}>
                                    {round?.season?.season}
                                </Link>
                            </div>
                            <Breadcrumb.Item active>
                                {round?.round}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col
                        xs={12}
                        lg={8}
                        className="bg-dark text-light rounded mx-auto"
                    >
                        <SectionMatches round={round} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Rounds
