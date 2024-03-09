import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import "../../styles/requestcard.css";
import { No } from '../No';
import { Box } from '@mui/joy';
import { del } from '../../methods/apiUtils';

function KeyCard({keyData}) {
    let token = localStorage.getItem("token");
    const handleNoButtonClick = async () => {
        try {
            await del(`/keys/delete/${keyData.id}`, token); // Отправляем DELETE запрос с id ключа в качестве параметра
            // Добавьте здесь логику, которая должна выполняться после успешного удаления ключа
        } catch (error) {
            console.error('Error deleting key:', error);
            // Добавьте здесь обработку ошибки
        }
    };

    return (
        <Stack className='border-darkblue mx-auto second-stack' style={{ padding: '0px' }}>
            <Row className='mt-3 mx-1'>
                <Col xs={5} sm={5} md={4} lg={4} xl={5} xxl={4} className='mb-3 p-6 border-radius-small-all center'>
                    <Form.Control placeholder="-" className='radiusnone center' plaintext readOnly defaultValue={keyData.auditory} />
                </Col>
                <Col xs={4} sm={4} md={3} lg={3} xl={3} xxl={3} className='mb-3 p-6'>
                    <Form.Control placeholder="-" className='radiusnone center' plaintext readOnly defaultValue={keyData.isInPrincipalOffice ? "В деканате" : "На руках"} />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3} xl={2} xxl={3} className='mb-3 p-6 d-flex justify-content-center'>
                    <Button variant="primary" className='center back-to-principal-button'>Вернуть</Button>
                </Col>
                <Col xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} className='mb-3 p-0 d-flex justify-content-center'>
                    <Button className='border-red border-2 rounded-0 d-flex' variant='secondary' style={{ width: '38px', background: "#F97D7D", borderColor: "#823333" }} onClick={handleDeleteKey}><No /></Button>
                </Col>
            </Row>
        </Stack>
    );
}


export default KeyCard;