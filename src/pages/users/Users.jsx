import React from 'react'
import { useGetUsers } from '../../features/users.features'
import { toast } from 'react-hot-toast'
import { Container, Row, Col } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import TableUsers from './components/TableUsers'
import Loading from '../../ui/Loading'

const Users = () => {
    const { data: users, isLoading, isError } = useGetUsers()

    if (isLoading) return <Loading />
    if (isError) return toast.error('failed to load!')

    return (
        <>
            <Navigate />
            <Container fluid className="p-0 ">
                <Row className="my-2 mx-auto">
                    <Col xs={12} lg={8} className=" mx-auto my-1">
                        <TableUsers users={users} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Users
