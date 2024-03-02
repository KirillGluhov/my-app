import Header from '../Header';
import { PageName } from "../../const/const-pagesnames";
import { Col, Container, Row } from 'react-bootstrap';
import UsersFilter from './UsersFilter';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';
import { get } from '../../methods/apiUtils';
import useInput from '../../hooks/use-input';

//ВАЖНО! Если в searchName: '' (16 строчка) вставить значение, то страница загрузится с правильными данными
//Видимо алгоритм работает нормально, но в реальном времени карточки не обновляются

/*//Сортируем по имени, сортируя полученный список пользователей
const AsyncComponent = () => {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null); // Состояние для отфильтрованных пользователей
  const [values, handleChange] = useInput({ role: '', email: '', searchName: '' }); // Используем хук useInput для обработки ввода

  useEffect(() => {
    const token =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyb250X3ByaW5jaXBhbEBleGFtcGxlLmNvbSIsIlVzZXJSb2xlIjoiUHJpbmNpcGFsIiwianRpIjoiNDc2OTA1MzEtMzAyMC00ZjhkLTk1ZjAtMTFjZmJmZjg0MTU1IiwibmJmIjoxNzA5MzgyMDM4LCJleHAiOjE3MDkzODU2MzgsImlhdCI6MTcwOTM4MjAzOCwiaXNzIjoiSXNzdWVyIiwiYXVkIjoiQXVkaWVuY2UifQ.cEhlgwFqQdFf9YgP-cCbZ3FCekjXRet3plDfmqOXttNr53B_dTaGo8iEBr85MMW4lr79Ia1nKP6TlX0x-f5sxw';

    const fetchData = async () => {
      try {
        const result = await get(
          '/users?Roles=Student&Roles=Teacher&Roles=Principal&Roles=Admin&Name=${values.searchName}',
          token
        );
        setUsers(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [values.searchName])

  useEffect(() => {
    // Фильтрация пользователей на основе введенного имени
    if (users && values.searchName) {
      const filtered = users.value.filter((user) =>
        user.fullName.toLowerCase().includes(values.searchName.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users?.value);
    }
  }, [users, values.searchName]);

  useEffect(() => {
    // Обновляем отфильтрованных пользователей при изменении данных с сервера
    setFilteredUsers(users?.value);
  }, [users]);

  return (
    <>
      <Header type='authorized' page={PageName.USERS} />
      <Container className='mt-5'>
        <UsersFilter handleChange={handleChange} values={values} />
        <Row className='justify-content-center'>
        {filteredUsers ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                role={user.userRole}
                email={user.email}
                name={user.fullName}
              />
            ))
          ) : (
            <p>Loading</p>
          )}
        </Row>
      </Container>
    </>
  );
};*/

//В это способе тоже не работает отображение карточек в реальном времени
//Сортируем по имени, вставляя его в параметр GET запроса: &Name= 
const AsyncComponent = () => {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [values, handleChange] = useInput({ role: '', email: '', searchName: '' });

  useEffect(() => {
    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyb250X3ByaW5jaXBhbEBleGFtcGxlLmNvbSIsIlVzZXJSb2xlIjoiUHJpbmNpcGFsIiwianRpIjoiM2JiZjIxNjItZTcwYy00MWE1LTkyMzgtOGQzM2Q3ODE4Y2U3IiwibmJmIjoxNzA5Mzg1NjAxLCJleHAiOjE3MDkzODkyMDEsImlhdCI6MTcwOTM4NTYwMSwiaXNzIjoiSXNzdWVyIiwiYXVkIjoiQXVkaWVuY2UifQ.fM7P2eUGn11daItMS6FfMP-AU13yGwcONFEc_MiF7W_cajh_A5kgCp5BlXvWKnn-INnyHDtCt127EVFmPmR3fw';

    const fetchData = async () => {
      try {
        // Добавляем параметр Name к запросу
        const result = await get(
          `/users?Roles=Student&Roles=Teacher&Roles=Principal&Roles=Admin&Name=${values.searchName}`,
          token
        );
        setUsers(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [values.searchName]); // Вызываем useEffect при изменении значения поиска

  useEffect(() => {
    // Обновляем отфильтрованных пользователей при изменении данных с сервера
    setFilteredUsers(users?.value);
  }, [users]);

  return (
    <>
      <Header type='authorized' page={PageName.USERS} />
      <Container className='mt-5'>
        <UsersFilter handleChange={handleChange} values={values} />
        <Row className='justify-content-center'>
          {filteredUsers ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                role={user.userRole}
                email={user.email}
                name={user.fullName}
              />
            ))
          ) : (
            <p>Loading</p>
          )}
        </Row>
      </Container>
    </>
  );
};


export default AsyncComponent;
