import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import { Yes } from './Yes';
import { No } from './No';

function RequestCard(props)
{
    return (
        <Stack className='border-darkblue'>
            <Row className='mt-3 mx-3'>
                <Col xl={2} lg={2} className='mb-3'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="Преподаватель"/>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} className='mb-3'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="Преподаватель"/>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} className='mb-3'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="Преподаватель"/>
                </Col>
                <Col xl={1} lg={1} md={4} sm={6} className='mb-3'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="Преподаватель"/>
                </Col>
                <Col xl={1} lg={1} md={4} sm={6} className='mb-3'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="Преподаватель"/>
                </Col>
                <Col xl={3} lg={4} md={4} sm={6} className='mb-3'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="19.02.2024"/>
                </Col>
                <Col xl={1} lg={2} md={4} sm={6} className='mb-3'>
                    <Button className='darkblue radiusnone stretch'><Yes/><No/></Button>
                </Col>
            </Row>
        </Stack>
    );
}

export default RequestCard;