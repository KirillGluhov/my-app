import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { PageName } from "../../const/const-pagesnames";
import Header from "../Header";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Profile(props) {
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: ''
    });
    const [userPassword, setUserPassword] = useState('');

    const fetchData = () => {
        let url = "https://win.jij.li/api/account/profile";
        axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                setProfileData(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            password: userPassword,
            fullName: profileData.fullName
        };
        axios.put("https://win.jij.li/api/account/profile", data, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                console.log('Данные успешно обновлены:', response.data);
                // Опционально: обновить состояние компонента после успешного обновления данных
                // fetchData();
            })
            .catch(error => {
                console.error('Ошибка при обновлении данных:', error);
            });
    };

    return (
        <>
            <Header type="authorized" page={PageName.PROFILE} />
            <Container className='mt-5 minwidth-540 mx-auto'>
                <Row className='justify-content-center'>
                    <Col xs={12} md={8} lg={6}>
                        <Stack className='border-radius-small darkAndLight'>
                            <Row className='mt-3 mx-1 mb-2'>
                                <h4>Профиль пользователя</h4>
                            </Row>
                        </Stack>
                        <Stack className="border-darkblue">
                            <div className="mt-3 mx-3">
                                <p>Имя: {profileData.fullName}</p>
                                <p>Email: {profileData.email}</p>
                            </div>
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Group controlId='formName' className="mb-3 mx-3">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Введите ваше имя'
                                        value={profileData.fullName}
                                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId='formPassword' className="mb-3 mx-3">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Введите ваш пароль'
                                        value={userPassword}
                                        onChange={(e) => setUserPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant='primary' type='submit' className="mb-3 mx-3 custom-button">
                                    Сохранить изменения
                                </Button>
                            </Form>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </>
    );

}

export default Profile