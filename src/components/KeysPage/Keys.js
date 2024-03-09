import Header from '../Header';
import { PageName } from "../../const/const-pagesnames";
import { Button, Col, Container, Form, Modal, Row, Stack } from 'react-bootstrap';
import KeyCard from './KeyCard';
import { useEffect, useState } from 'react';
import { get } from '../../methods/apiUtils';
import useInput from '../../hooks/use-input';
import { token } from '../../const/const-token-temporarily';
import KeysFilter from './KeysFilter';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { No } from '../No';

function Keys(props) {
    const [keysData, handleKey] = useState([]);

    const [filterValues, handleChange] = useInput({
        auditorySorting: "",
        inPrincipal: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [multipleAudience, setMultipleAudience] = useState(false);

    const [createKey, handleCreateKey] = useInput({
        startAudience: "",
        endAudience: "",
        audience: ""
    });

    /*useEffect(() => {
        console.log("USE EFFECT")
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const result = await get(
                `/keys/GetAllKeys`,
                token
            );
            setKeys(result);
            console.log(keys)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };*/

    const fetchData = () => {
        let url = 'https://win.jij.li/api/keys/GetAllKeys';
        axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                handleKey(response.data);
                console.log("Data: ", keysData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }



    async function handleMain() {
        handleKey([])
        //let url = (jwtDecode(localStorage.getItem("token")).UserRole == "Principal") ? "Roles=Student&Roles=Teacher&Roles=Principal" : `Roles=Student&Roles=Teacher&Roles=Principal&Roles=Admin`;
        let auditory = (filterValues.auditorySorting === "") ? "" : `&keySorting=${filterValues.auditorySorting}`;
        let status = (filterValues.inPrincipal === "") ? "" : `&isInPrincipalOffice=${filterValues.inPrincipal}`;
        console.log("AUDsorting ", filterValues.auditorySorting)
        console.log("STATUS ", filterValues.inPrincipal)
        console.log(`https://win.jij.li/api/keys/GetAllKeys?${auditory}${status}`);

        await axios.get(`https://win.jij.li/api/keys/GetAllKeys?${auditory}${status}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                handleKey(response.data);
                console.log(keysData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function fetchingAgain() {
        handleMain();
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        handleMain();
    }, [filterValues]);

    /*const handleDeleteKey = async (keyId) => {
        try {
            // Отправляем запрос на сервер для удаления ключа по его уникальному идентификатору
            await delete (`/keys/DeleteKey/${keyId}`, token);
            // Обновляем список ключей, удаляя ключ с заданным идентификатором
            handleKey(prevKeys => prevKeys.filter(key => key.id !== keyId));
        } catch (error) {
            console.error('Error deleting key:', error);
        }
    };

    const handleAddKey = async () => {
        try {
            // Отправляем запрос на сервер для создания нового ключа
            //const newKey = await post('/api/keys/Create', token, { auditory: "" }); // Здесь должна быть ваша аудитория
            // Обновляем список ключей, добавляя новый ключ в начало
            setKeys(prevKeys => [newKey, ...prevKeys]);
        } catch (error) {
            console.error('Error creating new key:', error);
        }
    };*/

    function handleAddKey_() {
        axios.post(`https://win.jij.li/api/keys/Create?`, { auditory: createKey.audience }, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                //handleKey(response.data);
                console.log(keysData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function handleAddKey() {

        if (multipleAudience) {
            const start = parseInt(createKey.startAudience);
            const end = parseInt(createKey.endAudience);

            if (isNaN(start) || isNaN(end) || start >= end) {
                console.error('Invalid audience range');
                return;
            }

            const newKeys = [];

            for (let i = start; i <= end; i++) {
                axios.post(`https://win.jij.li/api/keys/Create?`, { auditory: i.toString() }, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        } else {
            axios.post(`https://win.jij.li/api/keys/Create?`, { auditory: createKey.audience }, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        fetchingAgain();
        setShowModal(false); // Закрываем модальное окно после добавления ключа
    };

    /*function handleDeleteKey(id) {
        axios.delete(`https://win.jij.li/api/keys/delete/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        fetchingAgain();
        //handleParentChange();
    };*/


    return (
        <>
            <Header type="authorized" page={PageName.KEYS} />
            <Container className='mt-5'>
                <Row className='justify-content-center'>
                    <Col xs={12} sm={12} md={12} lg={10} xl={10} xxl={8}>
                        <Stack className='darkblue border-radius-small mx-auto'>
                            <Row className='mt-2 mx-1 mb-2'>
                                <Col xs={12} md={5} xxl={5} className='p-6'>
                                    {/*<Form.Control
                                placeholder="Аудитория"
                                className='search verySmallRadius mx-auto'
                                value={filterValues.auditorySorting}
                                onChange={handleChange}
                                id='audience'
                                style={{ width: "70%" }} />*/}
                                    <Form.Select
                                        className='radiusnone darkAndLight mx-auto'
                                        defaultValue={filterValues.auditorySorting}
                                        onChange={handleChange}
                                        id='auditorySorting'
                                    >
                                        <option value="" className='radiusnone'>Аудитория</option>
                                        <option value="AuditoryAsc" className='radiusnone'>По возрастанию</option>
                                        <option value="AuditoryDesc" className='radiusnone'>По убыванию</option>
                                    </Form.Select>
                                </Col>
                                <Col xs={12} md={5} xxl={5} className='p-6'>
                                    <Form.Select
                                        className='radiusnone darkAndLight mx-auto'
                                        value={filterValues.inPrincipal}
                                        onChange={handleChange}
                                        id='inPrincipal'
                                    >
                                        <option value="" className='radiusnone'>Статус</option>
                                        <option value="true" className='radiusnone'>В деканате</option>
                                        <option value="false" className='radiusnone'>На руках</option>
                                    </Form.Select>
                                </Col>
                                <Col xs={12} md={2} xxl={2} className='p-6' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <Button className="custom-button" onClick={() => setShowModal(true)}>+</Button>
                                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Добавить ключ</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                <Form.Group>
                                                    <Row>
                                                        <Col>
                                                            <Form.Label>Выберите тип ключа:</Form.Label>
                                                        </Col>
                                                        <Col className="d-flex justify-content-end">
                                                            <Button className='mx-3' onClick={() => setMultipleAudience(false)} active={!multipleAudience}>Один</Button>{' '}
                                                            <Button onClick={() => setMultipleAudience(true)} active={multipleAudience}>Несколько</Button>
                                                        </Col>
                                                    </Row>
                                                </Form.Group>
                                                {multipleAudience ? (
                                                    <Form.Group>
                                                        <Form.Label>Диапазон аудиторий:</Form.Label>
                                                        <Row>
                                                            <Col>
                                                                <Form.Control type="text" placeholder="Начало" value={createKey.startAudience} onChange={handleCreateKey} id='startAudience' />
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="text" placeholder="Конец" value={createKey.endAudience} onChange={handleCreateKey} id='endAudience' />
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                ) : (
                                                    <Form.Group>
                                                        <Form.Label>Номер аудитории:</Form.Label>
                                                        <Form.Control type="text" placeholder="Номер аудитории" value={createKey.audience} onChange={handleCreateKey} id='audience' />
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
                            </Row>
                        </Stack>


                        {keysData ? (
                            keysData.map((key) => (
                                <KeyCard
                                    auditory={key.auditory}
                                    isInPrincipalOffice={key.isInPrincipalOffice}
                                    id={key.id}
                                    handleParentChange={fetchingAgain}
                                />
                            ))
                        ) : (
                            <p>Loading</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Keys;
