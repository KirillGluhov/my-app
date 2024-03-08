import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import "../../styles/requestcard.css";
import { No } from '../No';
import axios from 'axios';

function KeyCard(keyData) {
    function handleDeleteKey() {
        axios.delete(`https://win.jij.li/api/keys/delete/${keyData.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                console.log(response);
                keyData.handleParentChange();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        
        console.log(keyData)
        keyData.handleParentChange();
    };

    return (
        <Stack className='border-darkblue mx-auto' style={{ width: '50%', padding: '0px' }}>
            <Row className='mt-3 mx-1'>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={4} className='mb-3 p-6 border-radius-small-all center'>
                    <Form.Control placeholder="-" className='radiusnone center' plaintext readOnly defaultValue={keyData.auditory} />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={3} className='mb-3 p-6'>
                    <Form.Control placeholder="-" className='radiusnone center' plaintext readOnly defaultValue={keyData.isInPrincipalOffice ? "В деканате" : "На руках"} />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={3} className='mb-3 p-6 d-flex justify-content-center'>
                    <Button variant="primary" className='center back-to-principal-button'>Вернуть</Button>
                </Col>
                <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2} className='mb-3 p-0 d-flex justify-content-center'>
                    <Button className='border-red border-2 rounded-0 d-flex' variant='secondary' style={{ width: '38px', background: "#F97D7D", borderColor: "#823333" }} onClick={handleDeleteKey}><No /></Button>
                </Col>
            </Row>
        </Stack>
    );
}


export default KeyCard;