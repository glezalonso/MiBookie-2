import React from 'react'
import { Card, Button, ButtonGroup } from 'react-bootstrap'

const CardNew = ({ content, handleDelete, handleUpdate }) => {
    return (
        <>
            <section>
                <Card key={content?._id} bg="light">
                    <Card.Header>
                        <Card.Title>{content?.title}</Card.Title>
                        <Card.Subtitle>{content?.sport?.sport}</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>{content?.content}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <p>
                            {content?.date?.split('T', 3).reverse().join(' ')}
                            <span>
                                <strong> Escrito por: </strong>{' '}
                                {content?.author}
                            </span>
                        </p>
                        <ButtonGroup>
                            <Button
                                className="btn btn-warning btn-sm mx-1 rounded"
                                onClick={() => handleUpdate(content)}
                            >
                                Editar
                            </Button>
                            <Button
                                className="btn btn-danger btn-sm  mx-1 rounded"
                                onClick={() => handleDelete(content?._id)}
                            >
                                Borrar
                            </Button>
                        </ButtonGroup>
                    </Card.Footer>
                </Card>
            </section>
        </>
    )
}

export default CardNew
