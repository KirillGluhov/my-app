import React, { useState } from 'react';
import { Stack, Row, Col, Form, Dropdown } from 'react-bootstrap';
import useInput from '../../hooks/use-input.js';
import { post } from '../../methods/apiUtils.js';

function KeysFilter(props) {
    const [values, handleChange] = useInput({
        audience: "",
        inPrincipal: ""
    });

    /*const handleAddKey = async () => {
        try {
            const newKey = await post('/keys/Create', token, { auditory: values.audience });
            // Здесь можно выполнить какие-то действия после успешного создания ключа, например, обновление списка ключей
            console.log('New key created:', newKey);
        } catch (error) {
            console.error('Error creating new key:', error);
        }
    };*/

    return (
        <Stack className='darkblue border-radius-small mx-auto' style={{ width: "50%" }}>
            <Row className='mt-2 mx-1 mb-2'>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={4} className='p-6'>
                    <Form.Control
                        placeholder="Аудитория"
                        className='search verySmallRadius mx-auto'
                        value={values.email}
                        onChange={handleChange}
                        id='audience'
                        style={{ width: "70%" }} />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={3} className='p-6'>
                    <Form.Select
                        className='radiusnone darkAndLight mx-auto'
                        value={values.role}
                        onChange={handleChange}
                        id='role'
                    >
                        <option value="" className='radiusnone'>Статус</option>
                        <option value="InPrincipal" className='radiusnone'>В деканате</option>
                        <option value="OnHands" className='radiusnone'>На руках</option>
                    </Form.Select>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={3} className='p-6'>

                </Col>
                <Col xxl={2} xl={3} lg={3} md={4} sm={4} xs={4} className='p-6'>
                    <Dropdown>
                        <Dropdown.Toggle
                            className='time-and-date custom-button-shadow add-circle-button mx-auto'
                            style={{ borderRadius: "100%" }}
                            onClick={props.handleAddKey}>
                            +
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Form>
                                <Form.Control type="date" className='radiusnone from' id='from' value={values.from} onChange={handleChange} />
                                <Form.Control type="date" className='radiusnone to' id='to' value={values.to} onChange={handleChange} />
                                <Form.Select className='radiusnone' value={values.filter} onChange={handleChange} id='filter'>
                                    <option value="Desc" className='radiusnone'>По убыванию</option>
                                    <option value="Asc" className='radiusnone'>По возрастанию</option>
                                </Form.Select>
                            </Form>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                {/*<Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={2} className='p-6'>
                    <Form.Control placeholder="Поиск по имени" className='search verySmallRadius' value={values.searchName} onChange={handleChange} id='searchName' />
    </Col>*/}
            </Row>
        </Stack>
    );
}

export default KeysFilter;