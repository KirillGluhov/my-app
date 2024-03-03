import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import "../../styles/requestcard.css";

function KeyCard({keyData}) {
    /*const [selectedRole, setSelectedRole] = useState(role);

    async function handleChangeRole(e) {
        const newRole = e.target.value;
    
        try {
            //ТАК РАБОТАЕТ
            setSelectedRole(newRole);
            await post(`/users/${id}/assign-role/${newRole}`, token);

            //А ЕСЛИ КОМАНДА ТУТ - ТО НЕТ
            //setSelectedRole(newRole);
        } catch (error) {
            console.error('Error updating user role:', error);
            console.error('Response from server:', error.message);
        }
    };*/

    return (
        <Stack className='border-darkblue mx-auto' style={{ width: '50%', padding: '0px' }}>
            <Row className='mt-3 mx-1 '>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={4} className='mb-3 p-6 border-radius-small-all center'>
                <Form.Control placeholder="-" className='radiusnone center' plaintext readOnly defaultValue={keyData.auditory} />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={3} className='mb-3 p-6'>
                    <Form.Control placeholder="-" className='radiusnone center' plaintext readOnly defaultValue={keyData.isInPrincipalOffice ? "В деканате" : "На руках"} />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={3} className='mb-3 p-6'>
                    <Form.Control placeholder="Вернуть" className='radiusnone center' plaintext readOnly />
                </Col>
            </Row>
        </Stack>
    );
}


export default KeyCard;