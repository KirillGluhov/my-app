import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import "../../styles/requestcard.css";
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { No } from '../No';
import { Yes } from '../Yes';
import "../../styles/users.css";

function UserCard(user) {
    let token = localStorage.getItem("token");
    
    return (
        <Stack className='border-darkblue min-270' style={{ padding: '0px' }} id={user.id}>
            <Row className='mt-3 mx-1'>
                <Col xxl={3} xl={3} lg={3} md={3} sm={3} xs={3} className='mb-3 p-6 border-radius-small-all center'>
                    {
                        jwtDecode(localStorage.getItem("token")).UserRole == "Admin" ? 
                        (
                            <Form.Control as='select' value={user.role}>
                            <option value='Student'>Student</option>
                            <option value='Teacher'>Teacher</option>
                            <option value='Principal'>Principal</option>
                            <option value='Admin'>Admin</option>
                            </Form.Control>
                        ) 
                        : 
                        (
                            <Form.Control as='select' value={user.role}>
                            <option value='Student'>Student</option>
                            <option value='Teacher'>Teacher</option>
                            </Form.Control>
                        )
                    }
                </Col>
                <Col xxl={4} xl={3} lg={3} md={9} sm={9} xs={9} className='mb-3 p-6'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue={user.email} />
                </Col>
                <Col xxl={4} xl={4} lg={4} md={10} sm={10} xs={10} className='mb-3 p-6'>
                    <Form.Control className='radiusnone center' plaintext readOnly defaultValue={user.name} />
                </Col>
            </Row>
        </Stack>
    );
}


export default UserCard;