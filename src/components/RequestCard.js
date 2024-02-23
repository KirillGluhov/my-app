import Header from './Header';
import {PageName} from "../const/const-pagesnames"
import { Container, Form, Row, Col, Stack, Button } from 'react-bootstrap';
import UpPart from './UpPart';
import { Yes } from './Yes';
import { No } from './No';

function RequestCard(props)
{
    return (
        <Stack className='border-darkblue'>
            <Row className='mt-4 mx-4'>
                <Col xl={4} lg={4} md={4} sm={6} className='mb-4'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="Иванов Иван Иванович"/>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} className='mb-4'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="Преподаватель"/>
                </Col>
                <Col xl={4} lg={4} md={4} sm={6} className='mb-4'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="19.02.2024"/>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} className='mb-4'>
                    <Button className='darkblue radiusnone stretch'><No/></Button>
                </Col>
                <Col xl={2} lg={4} md={4} sm={6} className='mb-4'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="Ботанический сад"/>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} className='mb-4'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="302"/>
                </Col>
                <Col xl={2} lg={2} md={4} sm={6} className='mb-4'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="В процессе"/>
                </Col>
                <Col xl={4} lg={2} md={4} sm={6} className='mb-4'>
                    <Form.Control className='white radiusnone center darkblue' plaintext readOnly defaultValue="4 пара"/>
                </Col>
                <Col xl={2} lg={2} md={4} sm={12} className='mb-4'>
                    <Button className='darkblue radiusnone stretch'><Yes/></Button>
                </Col>
            </Row>
        </Stack>
    );
}

export default RequestCard;