import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import { Yes } from '../Yes';
import { No } from '../No';
import "../../styles/requestcard.css";
import { Status } from '../../const/const-statuses';
import { Box } from '@mui/joy';

function RequestCard(request) {
    return (
        <Stack className='border-darkblue min-weight-520' id={request.requestId}>
            <Row className='mt-3 mx-1 center-align'>
                <Col xxl={1} xl={2} lg={2} md={2} sm={2} xs={2} className='mb-3 p-6'>
                    <Form.Control className='radiusnone center' plaintext readOnly value={request.auditory} />
                </Col>
                <Col xxl={2} xl={3} lg={3} md={3} sm={5} xs={5} className='mb-3 p-6'>
                    <Form.Control className='white border-radius-small-all center light-color' plaintext readOnly value={request.timeSlot} />
                </Col>
                <Col xxl={1} xl={3} lg={3} md={3} sm={5} xs={5} className='mb-3 p-6'>
                    <Form.Control className='white border-radius-small-all center light-color' plaintext readOnly value={request.bookingDate} />
                </Col>
                <Col xxl={2} xl={4} lg={4} md={4} sm={7} xs={7} className='mb-3 p-6 border-radius-small-all'>
                    <Form.Control className='radiusnone center' plaintext readOnly value={request.userRole} />
                </Col>
                <Col xxl={2} xl={3} lg={3} md={3} sm={5} xs={5} className='mb-3 p-6'>
                    <Form.Control className={`white rounded-1 border-2 center ${request.requestStatus.Eng}`} plaintext readOnly value={request.requestStatus.Rus} />
                </Col>
                <Col xxl={3} xl={5} lg={5} md={5} sm={8} xs={8} className='mb-3 p-6'>
                    <Col>
                        <Form.Control className='radiusnone center' plaintext readOnly value={request.fullName} />
                        <Form.Control className='radiusnone center' plaintext readOnly value={request.description} />
                    </Col>
                </Col>
                <Col xxl={1} xl={2} lg={2} md={2} sm={2} xs={2} className='mb-3 p-0'>
                    <Box style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button className='border-green border-2 rounded-0 d-flex' variant='secondary' style={{ width: '38px', background: "#A4F87D", borderColor: "#488233" }} disabled={request.requestStatus.Eng === Status.APPROVED}><Yes /></Button>
                        <Button className='border-red border-2 rounded-0 d-flex' variant='secondary' style={{ width: '38px', background: "#F97D7D", borderColor: "#823333" }} disabled={request.requestStatus.Eng === Status.CANCELLED}><No /></Button>
                    </Box>
                </Col>
            </Row>
        </Stack>
    );
}

export default RequestCard;