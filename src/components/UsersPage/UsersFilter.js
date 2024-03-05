import React from 'react';
import { Stack, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import useInput from '../../hooks/use-input.js';
import { jwtDecode } from "jwt-decode";
import PropTypes from 'prop-types';

//jwtDecode(localStorage.getItem("token")).UserRole == "Admin" 

function UsersFilter({onChange})
{
    const [values, handleChange] = useInput({
        role: "",
        isRequests: "",
        searchName: ""
    });

    return (
        <Stack className='darkblue border-radius-small'>
            <Row className='mt-2 mx-1 mb-2'>
                <Col xs={6} sm={6} md={4} lg={4} xl={4} xxl={4} className='p-6'>
                    <Form.Select className='radiusnone darkAndLight' value={values.role} onChange={handleChange} id='role'>
                        <option value="" className='radiusnone'>Роль</option>
                        <option value="Student" className='radiusnone'>Студент</option>
                        <option value="Teacher" className='radiusnone'>Преподаватель</option>
                        <option value="Principal" className='radiusnone'>Деканат</option>
                        <option value="Admin" className='radiusnone'>Администратор</option>
                    </Form.Select>
                </Col>
                <Col xs={6} sm={6} md={4} lg={4} xl={4} xxl={4} className='p-6'>
                    <Form.Select className='radiusnone darkAndLight' value={values.isRequests} onChange={handleChange} id='role'>
                        <option value="" className='radiusnone'>Есть заявки?</option>
                        <option value="true" className='radiusnone'>Есть</option>
                        <option value="false" className='radiusnone'>Нет</option>
                    </Form.Select>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} className='p-6'>
                    <Form.Control placeholder="Поиск по имени" className='search verySmallRadius' value={values.searchName} onChange={handleChange} id='searchName' />
                </Col>
            </Row>
        </Stack>
    );
}

export default UsersFilter;