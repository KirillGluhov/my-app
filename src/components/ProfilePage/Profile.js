import { Button, Container, Form } from "react-bootstrap";
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
            <Container className='mt-5 minwidth-540'>
                <h2>Профиль пользователя</h2>
                <div>
                    <p><strong>Email:</strong> {profileData.email}</p>
                </div>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId='formName'>
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Введите ваше имя'
                            value={profileData.fullName}
                            onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId='formPassword'>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Введите ваш пароль'
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Сохранить изменения
                    </Button>
                </Form>
            </Container>
        </>
    );

}

export default Profile