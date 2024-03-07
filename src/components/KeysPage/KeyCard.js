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
        <Stack className='border-darkblue mx-auto' style={{ width: '50%', padding: '0px' }}>
            <Row className='mt-3 mx-1'>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={4} className='mb-3 p-6 border-radius-small-all center'>
                <Form.Control placeholder="-" className='radiusnone center' plaintext readOnly defaultValue={keyData.auditory} />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={3} className='mb-3 p-6'>
                    <Form.Control placeholder="-" className='radiusnone center' plaintext readOnly defaultValue={keyData.isInPrincipalOffice ? "В деканате" : "На руках"} />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={3} className='mb-3 p-6'>
                    <Form.Control placeholder="Вернуть" className='radiusnone center' plaintext readOnly />
                </Col>
                <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2} className='mb-3 p-0'>
                    <Box style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button className='border-red border-2 rounded-0 d-flex' variant='secondary' style={{ width: '38px', background:"#F97D7D", borderColor: "#823333"}} onClick={handleNoButtonClick}><No/></Button>
                    </Box>
                </Col>
            </Row>
        </Stack>
    );
}


export default KeyCard;