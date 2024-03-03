import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import "../../styles/requestcard.css";
import { useState } from 'react';
import { post } from '../../methods/apiUtils';
import { token } from '../../const/const-token-temporarily';

//Добавить:
// - Чтобы авторизованный пользователь не видел себя в списке (хотя не уверен, может и не надо)
// - Чтобы только Admin мог менять роль на Principal (и Admin) у другого пользователя

//В итоге с этим кодом получается что когда я меняю роль, она меняется, это посылается на сервер, 
//но потом моментально визуально она меняется обратно, хотя на сервер она изменилась
function UserCard({ id, role, email, name }) {
    const [selectedRole, setSelectedRole] = useState(role);

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
    };
    return (
        <Stack className='border-darkblue min-270' style={{ width: '60%', padding: '0px' }}>
            <Row className='mt-3 mx-1'>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={4} className='mb-3 p-6 border-radius-small-all center'>
                    <Form.Control as='select' value={selectedRole}  onChange={handleChangeRole}>
                        <option value='Student'>Student</option>
                        <option value='Teacher'>Teacher</option>
                        <option value='Principal'>Principal</option>
                        <option value='Admin'>Admin</option>
                    </Form.Control>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={4} className='mb-3 p-6'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue={email} />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={4} className='mb-3 p-6'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue={name} />
                </Col>
            </Row>
        </Stack>
    );
}


export default UserCard;