import axios, * as others from 'axios';
import Header from '../Header';
import { PageName } from "../../const/const-pagesnames";
import { Col, Container, Row, Form, Stack } from 'react-bootstrap';
import UsersFilter from './UsersFilter';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';
import { get } from '../../methods/apiUtils';
import useInput from '../../hooks/use-input';
import "../../styles/users.css";

const Users = () => {

  const [cardsData, handleCard] = useState([]);
  const [filterValues, handleChange] = useInput({
    role: "",
    requests: "",
    searchName: ""
  });

  const handleRoleBlur = () => {
    console.log(filterValues.role);
    let name = (filterValues.searchName === "") ? "" : `&Name=${filterValues.searchName}`;
    let req = (filterValues.requests === "") ? "" : `&hasRequests=${filterValues.requests}`;
    let rol = (filterValues.role === "") ? "Roles=Student&Roles=Teacher&Roles=Principal&Roles=Admin" : `Roles=${filterValues.role}`;
    console.log(`https://win.jij.li/api/users?${rol}${name}${req}`);

    axios.get(`https://win.jij.li/api/users?${rol}${name}${req}`, {headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
    .then(response => {
        handleCard(response.data.value);
        console.log(cardsData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  const handleRequestsBlur = () => {
    console.log(filterValues.requests);
    let name = (filterValues.searchName === "") ? "" : `&Name=${filterValues.searchName}`;
    let req = (filterValues.requests === "") ? "" : `&hasRequests=${filterValues.requests}`;
    let rol = (filterValues.role === "") ? "Roles=Student&Roles=Teacher&Roles=Principal&Roles=Admin" : `Roles=${filterValues.role}`;
    console.log(`https://win.jij.li/api/users?${rol}${name}${req}`);

    axios.get(`https://win.jij.li/api/users?${rol}${name}${req}`, {headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
    .then(response => {
        handleCard(response.data.value);
        console.log(cardsData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  const handleSearchNameBlur = () => {
    console.log(filterValues.searchName);
    let name = (filterValues.searchName === "") ? "" : `&Name=${filterValues.searchName}`;
    let req = (filterValues.requests === "") ? "" : `&hasRequests=${filterValues.requests}`;
    let rol = (filterValues.role === "") ? "Roles=Student&Roles=Teacher&Roles=Principal&Roles=Admin" : `Roles=${filterValues.role}`;
    console.log(`https://win.jij.li/api/users?${rol}${name}${req}`);

    axios.get(`https://win.jij.li/api/users?${rol}${name}${req}`, {headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
    .then(response => {
        handleCard(response.data.value);
        console.log(cardsData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  const fetchData = () => {
    axios.get(`https://win.jij.li/api/users?Roles=Student&Roles=Teacher&Roles=Principal&Roles=Admin`, {headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
    .then(response => {
        handleCard(response.data.value);
        console.log(cardsData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header type='authorized' page={PageName.USERS}/>
      <Container className='mt-5 minwidth-540'>
      <Stack className='darkblue border-radius-small'>
            <Row className='mt-2 mx-1 mb-2'>
                <Col xs={6} sm={6} md={4} lg={4} xl={4} xxl={4} className='p-6'>
                    <Form.Select className='radiusnone darkAndLight'  defaultValue={filterValues.role} onChange={handleChange} onBlur={handleRoleBlur} id='role'>
                        <option value="" className='radiusnone'>Роль</option>
                        <option value="Student" className='radiusnone'>Студент</option>
                        <option value="Teacher" className='radiusnone'>Преподаватель</option>
                        <option value="Principal" className='radiusnone'>Деканат</option>
                        <option value="Admin" className='radiusnone'>Администратор</option>
                    </Form.Select>
                </Col>
                <Col xs={6} sm={6} md={4} lg={4} xl={4} xxl={4} className='p-6'>
                    <Form.Select className='radiusnone darkAndLight'  defaultValue={filterValues.isRequests} onChange={handleChange} onBlur={handleRequestsBlur} id='requests'>
                        <option value="" className='radiusnone'>Есть заявки?</option>
                        <option value="true" className='radiusnone'>Есть</option>
                        <option value="false" className='radiusnone'>Нет</option>
                    </Form.Select>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} className='p-6'>
                    <Form.Control placeholder="Поиск по имени" className='search verySmallRadius' defaultValue={filterValues.searchName} onChange={handleChange} onBlur={handleSearchNameBlur} id='searchName' />
                </Col>
            </Row>
        </Stack>
        {cardsData.map(card => (
              <UserCard name={card.fullName} email={card.email} id={card.id} role={card.userRole} key={card.id}/>
            )
          )
        }
      </Container>
    </>
  );
};


export default Users;
