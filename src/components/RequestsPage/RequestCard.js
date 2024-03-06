import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import { Yes } from '../Yes';
import { No } from '../No';
import "../../styles/requestcard.css";
import { Status } from '../../const/const-statuses';
import { Box } from '@mui/joy';

function RequestCard(props) {
    return (
        <Stack className='border-darkblue min-weight-520'>
            <Row className='mt-3 mx-1'>
                <Col xxl={1} xl={2} lg={2} md={2} sm={2} xs={2} className='mb-3 p-6 border-radius-small-all'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue="302" />
                </Col>
                <Col xxl={2} xl={3} lg={3} md={3} sm={5} xs={5} className='mb-3 p-6'>
                    <Form.Control className='white border-radius-small-all center light-color' plaintext readOnly defaultValue="14:45-16:20" />
                </Col>
                <Col xxl={1} xl={3} lg={3} md={3} sm={5} xs={5} className='mb-3 p-6'>
                    <Form.Control className='white border-radius-small-all center light-color' plaintext readOnly defaultValue="23.02.2024" />
                </Col>
                <Col xxl={2} xl={4} lg={4} md={4} sm={7} xs={7} className='mb-3 p-6 border-radius-small-all'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue="Преподаватель" />
                </Col>
                <Col xxl={2} xl={3} lg={3} md={3} sm={5} xs={5} className='mb-3 p-6'>
                    <Form.Control className={`white rounded-1 border-2 center ${props.status.Eng}`} plaintext readOnly defaultValue={props.status.Rus} />
                </Col>
                <Col xxl={3} xl={5} lg={5} md={5} sm={8} xs={8} className='mb-3 p-6'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue="Иван Иванов Иванович" />
                </Col>
                <Col xxl={1} xl={2} lg={2} md={2} sm={2} xs={2} className='mb-3 p-0'>
                    <Box style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button className='border-green border-2 rounded-0 d-flex' variant='secondary' style={{ width: '38px', background:"#A4F87D", borderColor: "#488233"}} disabled={props.status === Status.APPROVED}><Yes/></Button>
                        <Button className='border-red border-2 rounded-0 d-flex' variant='secondary' style={{ width: '38px', background:"#F97D7D", borderColor: "#823333"}} disabled={props.status === Status.CANCELLED}><No/></Button>
                    </Box>
                </Col>
            </Row>
        </Stack>
    );
}

export default RequestCard;