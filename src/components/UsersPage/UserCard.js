import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import "../../styles/requestcard.css";

function UserCard(user) {
    return (
        <Stack className='border-darkblue min-270' style={{width: '60%' }}>
            <Row className='mt-3 mx-1'>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={4} className='mb-3 p-6 border-radius-small-all'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue={user.role}/>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={4} className='mb-3 p-6'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue={user.email} />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={4} className='mb-3 p-6'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue={ user.name } />
                </Col>
            </Row>
        </Stack>
    );
}

export default UserCard;