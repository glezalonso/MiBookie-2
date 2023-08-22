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
            <Container fluid className="p-0">
                <Row className="my-2 mx-auto ">
                    <Col xs={12} lg={8} className=" mx-auto">
                        <Breadcrumb className=" p-2">
                            <div className="breadcrumb-item">
                                <Link
                                    className="text-decoration-none"
                                    to={`../sports/${round?.sport?._id}`}
                                >
                                    <img
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            marginBottom: '2px',
                                        }}
                                        src={round?.sport?.poster}
                                        alt={round?.sport?.sport}
                                    />{' '}
                                    {round?.sport?.sport}
                                </Link>
                            </div>
                            <div className="breadcrumb-item">
                                <Link
                                    className="text-decoration-none"
                                    to={`../leagues/${round?.league?._id}`}
                                >
                                    <img
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            marginBottom: '2px',
                                        }}
                                        src={round?.league?.poster}
                                        alt={round?.league?.league}
                                    />{' '}
                                    {round?.league?.league}
                                </Link>
                            </div>
                            <div className="breadcrumb-item">
                                <Link
                                    className="text-decoration-none"
                                    to={`../seasons/${round?.season?._id}`}
                                >
                                    {round?.season?.season}
                                </Link>
                            </div>
                            <Breadcrumb.Item active>
                                {round?.round}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col xs={12} lg={8} className="mx-auto my-1">
                        <SectionMatches round={round} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Rounds
