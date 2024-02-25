import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import { Yes } from './Yes';
import { No } from './No';

function RequestCard(props)
{
    return (
        <Stack className='border-darkblue min-weight-520'>
            <Row className='mt-3 mx-3'>
                <Col xxl={1} xl={2} lg={2} md={2} sm={2} xs={2} className='mb-3'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue="302"/>
                </Col>
                <Col xxl={2} xl={3} lg={3} md={3} sm={5} xs={5} className='mb-3'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="14:45-16:20"/>
                </Col>
                <Col xxl={1} xl={3} lg={3} md={3} sm={5} xs={5} className='mb-3'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="23.02.2024"/>
                </Col>
                <Col xxl={2} xl={4} lg={4} md={4} sm={7} xs={7} className='mb-3'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue="Преподаватель"/>
                </Col>
                <Col xxl={2} xl={3} lg={3} md={3} sm={5} xs={5} className='mb-3'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="В процессе"/>
                </Col>
                <Col xxl={2} xl={5} lg={5} md={5} sm={8} xs={8} className='mb-3'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue="Иван Иванов Иванович"/>
                </Col>
                <Col xxl={1} xl={2} lg={2} md={2} sm={2} xs={2} className='mb-3'>
                    <Button className='darkblue radiusnone stretch'><Yes/></Button>
                </Col>
                <Col xxl={1} xl={2} lg={2} md={2} sm={2} xs={2} className='mb-3'>
                    <Button className='darkblue radiusnone stretch'><No/></Button>
                </Col>
            </Row>
        </Stack>
    );
}

export default RequestCard;