import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import "../../styles/requestcard.css";
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { No } from '../No';
import { Yes } from '../Yes';
import "../../styles/users.css";
import useInput from '../../hooks/use-input';
import axios, * as others from 'axios';

function UserCard(user) {
    let token = localStorage.getItem("token");

    const [selectedValues, handleChange] = useInput({
        changeRole: ""
    });

    const handleRole = () => {
        console.log(selectedValues.changeRole);

        console.log(`https://win.jij.li/api/users/${user.id}/assign-role/${selectedValues.changeRole}`);

        axios.post(`https://win.jij.li/api/users/${user.id}/assign-role/${selectedValues.changeRole}`, {
            data: ''
        }, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                console.log(response);
                user.handleParentChange();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <Stack className='border-darkblue min-270' style={{ padding: '0px' }} id={user.id}>
            <Row className='mt-3 mx-1'>
                <Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4} className='mb-3 p-6 border-radius-small-all center'>
                    {
                        jwtDecode(localStorage.getItem("token")).UserRole == "Admin" ?
                            (
                                <Form.Control className="text-center" as='select' defaultValue={user.role} id='changeRole' onChange={handleChange} onBlur={handleRole}>
                                    <option value='Student'>Студент</option>
                                    <option value='Teacher'>Преподаватель</option>
                                    <option value='Principal'>Деканат</option>
                                    <option value='Admin'>Администратор</option>
                                </Form.Control>
                            )
                            :
                            (
                                <Form.Control className="text-center" as='select' defaultValue={user.role} id='changeRole' onChange={handleChange} onBlur={handleRole}>
                                    <option value='Student'>Студент</option>
                                    <option value='Teacher'>Преподаватель</option>
                                    {user.role === 'Principal' ? <option value='Principal'>Деканат</option> : null}
                                </Form.Control>
                            )
                    }
                </Col>
                <Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4} className='mb-3 p-6'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue={user.email} />
                </Col>
                <Col xs={6} sm={6} md={6} lg={4} xl={4} xxl={4} className='mb-3 p-6'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue={user.name} />
                </Col>
            </Row>
        </Stack>
    );
}


export default UserCard;