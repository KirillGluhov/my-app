import Header from '../Header';
import {PageName} from "../../const/const-pagesnames";
import { Col, Container, Row } from 'react-bootstrap';
import UsersFilter from './UsersFilter';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';

function Users(props)
{
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState();

    async function fetchUsers1() {
        try {
            setLoading(true);
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();
            setUsers(users);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    }

    //Токен я брал из Swagger, авторизовываясь за админа
    //user@example.com string1, данные для входа админа (закреплены в беседе в ВК)
    //Токен ручками можно вставить, но живёт он полчаса где-то
    async function fetchUsers() {
        const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJVc2VyUm9sZSI6IkFkbWluIiwianRpIjoiOTE5YTBjMWEtYjAzMi00ODhkLTg0NzgtYWZhMTdlZjk5OGZjIiwibmJmIjoxNzA5MDYyNzAzLCJleHAiOjE3MDkwNjYzMDMsImlhdCI6MTcwOTA2MjcwMywiaXNzIjoiSXNzdWVyIiwiYXVkIjoiQXVkaWVuY2UifQ.RpuBAqI-2YeoZBgN6PtL04wA9WK23orKgjN660ynPqr78bJpZsnmMmHRztwcjHtllPA3O9GwdBb5CkbIORqnAA';

        try {
            setLoading(true);
            const response = await fetch('https://win.jij.li/api/users?Roles=Student', {
                method: 'GET',
                headers: {
                    //Саня говорил, что Bearer писать перед токеном не нужно
                    'Authorization': `Bearer ${token}`
                }
            });
            const users = await response.json();
            setUsers(users);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            <Header type="authorized" page={PageName.USERS}/>
            <Container className='mt-5'>
                <UsersFilter/>
                <Row className='justify-content-center'>
                    {!loading && (users.map(user => (
                            <UserCard key={user.id} user={user} />
                    )))}
                </Row>
            </Container>
        </>
    );
}

export default Users;