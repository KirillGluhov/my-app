import Header from '../Header';
import {PageName} from "../../const/const-pagesnames";
import { Col, Container, Row } from 'react-bootstrap';
import UsersFilter from './UsersFilter';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';

const AsyncComponent = () => {
  const [users, setData] = useState(null);

  useEffect(() => {
    const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJVc2VyUm9sZSI6IkFkbWluIiwianRpIjoiNzM0ZmQ3YWYtMWJiYy00MDNhLWI0OTItYTgzZmIwYjk3MDQ1IiwibmJmIjoxNzA5MTQ0MzE4LCJleHAiOjE3MDkxNDc5MTgsImlhdCI6MTcwOTE0NDMxOCwiaXNzIjoiSXNzdWVyIiwiYXVkIjoiQXVkaWVuY2UifQ.E14EmNfg2XNFn4oZf8lDtnXuZg70LyRsmN2Mo3fuPOIqQUvIt3i46Qgj6YxV8qCv6HvIz59XQCUwRx08DUOz4Q"
    const fetchData = async () => {
      try {
        const response = await fetch('https://win.jij.li/api/users?Roles=Student&Roles=Teacher&Roles=Principal&Roles=Admin', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            }
        });
        const jsonData = await response.json();
        setData(jsonData);
      } 
      catch (error) 
      {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Header type="authorized" page={PageName.USERS}/>
    <Container className='mt-5'>
        <UsersFilter/>
        <Row className='justify-content-center'>
            {users ? (users.value.map(user => (
                    <UserCard key={user.id} role={user.userRole} email={user.email} name={user.fullName} />
            ))) : <p>Loading</p>}
        </Row>
    </Container>
</>
  );
};

export default AsyncComponent;
