import React, { useState } from 'react';
import { Stack, Row, Col, Form, Dropdown, Button, ButtonGroup, ToggleButton, Modal } from 'react-bootstrap';
import useInput from '../../hooks/use-input.js';
import { post } from '../../methods/apiUtils.js';

function KeysFilter(props) {
    let token = localStorage.getItem("token");
    const [values, handleChange] = useInput({
        audience: "",
        inPrincipal: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [multipleAudience, setMultipleAudience] = useState(false);

    const handleAddKey = async () => {
        if (multipleAudience) {
            const start = parseInt(values.startAudience);
            const end = parseInt(values.endAudience);

            if (isNaN(start) || isNaN(end) || start >= end) {
                console.error('Invalid audience range');
                return;
            }

            const newKeys = [];

            for (let i = start; i <= end; i++) {
                try {
                    const newKey = await post('/keys/Create', token, { auditory: i.toString() });
                    newKeys.push(newKey);
                } catch (error) {
                    console.error('Error creating new key:', error);
                }
            }

            // Обработка новых ключей
            console.log('New keys created:', newKeys);
        } else {
            // Логика для добавления одного ключа
            try {
                await post('/keys/Create', token, { auditory: values.audience });
            } catch (error) {
                console.error('Error creating new key:', error);
            }
        }
        setShowModal(false); // Закрываем модальное окно после добавления ключа
    };

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
                <Col xxl={2} xl={3} lg={3} md={4} sm={4} xs={4} className='p-6' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button onClick={() => setShowModal(true)}>+</Button>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Добавить ключ</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Выберите тип ключа:</Form.Label>
                                    <Button onClick={() => setMultipleAudience(false)} active={!multipleAudience}>Один</Button>{' '}
                                    <Button onClick={() => setMultipleAudience(true)} active={multipleAudience}>Несколько</Button>
                                </Form.Group>
                                {multipleAudience ? (
                                    <Form.Group>
                                        <Form.Label>Диапазон аудиторий:</Form.Label>
                                        <Row>
                                            <Col>
                                                <Form.Control type="text" placeholder="Начало" value={values.startAudience} onChange={handleChange} id='startAudience' />
                                            </Col>
                                            <Col>
                                                <Form.Control type="text" placeholder="Конец" value={values.endAudience} onChange={handleChange} id='endAudience' />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                ) : (
                                    <Form.Group>
                                        <Form.Label>Номер аудитории:</Form.Label>
                                        <Form.Control type="text" placeholder="Номер аудитории" value={values.audience} onChange={handleChange} id='audience' />
                                    </Form.Group>
                                )}
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Отмена</Button>
                            <Button variant="primary" onClick={handleAddKey}>Добавить</Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
                {/*<Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={2} className='p-6'>
                    <Form.Control placeholder="Поиск по имени" className='search verySmallRadius' value={values.searchName} onChange={handleChange} id='searchName' />
    </Col>*/}
            </Row>
        </Stack>
    );
}

export default KeysFilter;