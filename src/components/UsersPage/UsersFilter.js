import React from 'react';
import { Stack, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import useInput from '../../hooks/use-input.js';

import timeImage from '../../images/time-image.svg';
import calendarIcon from '../../images/calendar-icon.svg';

function UsersFilter(props) {
    const [values, handleChange] = useInput({
        role: "",
        email: "",
        searchName: ""
    });

    return (
        <Stack className='darkblue border-radius-small'>
            <Row className='mt-2 mx-1 mb-2'>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={4} className='p-6'>
                    <Form.Select className='radiusnone darkAndLight' value={values.role} onChange={handleChange} id='role'>
                        <option value="" className='radiusnone'>Роль</option>
                        <option value="Student" className='radiusnone'>Студент</option>
                        <option value="Teacher" className='radiusnone'>Преподаватель</option>
                    </Form.Select>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={4} className='p-6'>
                    <Form.Control placeholder="Email" className='search verySmallRadius' value={values.email} onChange={handleChange} id='email' />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={4} className='p-6'>
                    <Form.Control placeholder="Поиск по имени" className='search verySmallRadius' value={values.searchName} onChange={handleChange} id='searchName' />
                </Col>
            </Row>
        </Stack>
    );
}

export default UsersFilter;