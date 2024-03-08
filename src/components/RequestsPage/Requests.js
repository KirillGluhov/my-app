import Header from '../Header';
import { PageName } from "../../const/const-pagesnames"
import { Col, Container, Row, Stack, Form } from 'react-bootstrap';
import RequestCard from './RequestCard';
import { Status } from "../../const/const-statuses";
import { useState, useEffect } from 'react';
import axios, * as others from 'axios';
import changeLanguague from '../../functions/changeLanguague';
import { changeTime, changeRole, changeDate, changeStatus } from "../../functions/changeLanguague";
import useInput from '../../hooks/use-input';

function Requests(props) {
    const [cardsData, handleCard] = useState([]);
    const [values, handleChange] = useInput(
        {
            role: "",
            time: [],
            status: "",
            received: "",
            returned: "",
            repetitive: "",
            sorting: ""
        }
    );

    const handleTimeChange = (event) => {
        handleChange(event);
    };

    const handleRole = () => {
        handleMain();
    }

    const handleTime = () => {
        handleMain();
    }

    const handleStatus = () => {
        handleMain();
    }

    const handleReceived = () => {
        handleMain();
    }

    const handleReturned = () => {
        handleMain();
    }

    const handleRepetitive = () => {
        handleMain();
    }

    const handleSorting = () => {
        handleMain();
    }

    function handleMain()
    {
        const role = (values.role === "") ? "Roles=Student&Roles=Teacher&Roles=Principal&Roles=Admin" : `Roles=${values.role}`;
        const time = (values.time.length === 0) ? "&TimeSlot=S8E10&TimeSlot=S10E12&TimeSlot=S12E14&TimeSlot=S14E16&TimeSlot=S16E18&TimeSlot=S18E20&TimeSlot=S20E21" :
        (findEmptyString(values.time)) ? "&TimeSlot=S8E10&TimeSlot=S10E12&TimeSlot=S12E14&TimeSlot=S14E16&TimeSlot=S16E18&TimeSlot=S18E20&TimeSlot=S20E21" :
        concatenateTimes(values.time);
        const status = (values.status === "") ? "&Status=Approved&Status=InProcess&Status=Declined" : `&Status=${values.status}`;
        const received = (values.received === "") ? "" : `&IsKeyRecieved=${values.received}`;
        const returned = (values.returned === "") ? "" : `&IsKeyReturned=${values.returned}`;
        const repetitive = (values.repetitive === "") ? "" : `&IsRepetitive=${values.repetitive}`;
        const sorting = (values.sorting === "") ? "&Sorting=DateAsc" : `&Sorting=${values.sorting}`;
        const url = `https://win.jij.li/api/requests/GetAllRequests/list?${role}${time}${status}${received}${returned}${repetitive}${sorting}`;

        console.log(url);
        console.log("Role: ", role, " Time: ", time, " Status: ", status, " Received: ", received, " Returned: ", returned, " Repetitive: ", repetitive, " Sorting: ", sorting);

        axios.get(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {
            handleParentChange(response.data.value);
            console.log(response.data.value);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function findEmptyString(array)
    {
        for (let i = 0; i < array.length; i++)
        {
            if (array[i] === '')
            {
                console.log("Время имеет пустую строку");
                return true;
            }
        }

        console.log("Время не имеет пустой строки");

        return false;
    }

    function concatenateTimes(array)
    {
        console.log("Время имеет что-то кроме пустой строки");
        console.log(array);
        let value = array.map(time => `TimeSlot=${time}`).join('&');
        value = '&' + value;
        return value;
    }

    const fetchData = () => {
        let url = 'https://win.jij.li/api/requests/GetAllRequests/list?Roles=Student&Roles=Teacher&Roles=Principal&Roles=Admin&TimeSlot=S8E10&TimeSlot=S10E12&TimeSlot=S12E14&TimeSlot=S14E16&TimeSlot=S16E18&TimeSlot=S18E20&TimeSlot=S20E21&Status=Approved&Status=InProcess&Status=Declined&Sorting=DateAsc';
        axios.get(url, {headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
        .then(response => {
            handleCard(response.data.value);
            console.log("Data: ", cardsData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    function handleParentChange(data)
    {
        handleCard(data);
    };


    useEffect(() => {
        fetchData();
      }, []);

    return (
        <>
            <Header type="authorized" page={PageName.REQUESTS} />
            <Container className='mt-5 min-270'>
                <Row>
                    <Col>
                        <Stack className='darkblue border-radius-small min-weight-520'>
                            <Row className='mt-2 mx-1 mb-2'>
                                <Col className='p-6' xxl={3} xl={3} lg={3} md={4} sm={6} xs={6}>
                                    <Form.Select className='radiusnone darkAndLight' value={values.role} onChange={handleChange} id='role' onBlur={handleRole}>
                                        <option value="" className='radiusnone'>Роль</option>
                                        <option value="Student" className='radiusnone'>Студент</option>
                                        <option value="Teacher" className='radiusnone'>Преподаватель</option>
                                        <option value="Principal" className='radiusnone'>Деканат</option>
                                        <option value="Admin" className='radiusnone'>Администратор</option>
                                    </Form.Select>
                                </Col>
                                <Col className='p-6' xxl={3} xl={3} lg={3} md={4} sm={6} xs={6}>
                                    <Form.Select className='radiusnone darkAndLight custom-scrollbar' value={values.time} onChange={handleTimeChange} id='time' multiple  onBlur={handleTime}>
                                        <option value="" className='radiusnone'>Время</option>
                                        <option value="S8E10" className='radiusnone'>8:45 - 10:20</option>
                                        <option value="S10E12" className='radiusnone'>10:35 - 12:10</option>
                                        <option value="S12E14" className='radiusnone'>12:25 - 14:00</option>
                                        <option value="S14E16" className='radiusnone'>14:45 - 16:20</option>
                                        <option value="S16E18" className='radiusnone'>16:35 - 18:10</option>
                                        <option value="S18E20" className='radiusnone'>18:25 - 20:00</option>
                                        <option value="S20E21" className='radiusnone'>20:15 - 21:50</option>
                                    </Form.Select>
                                </Col>
                                <Col className='p-6' xxl={3} xl={3} lg={3} md={4} sm={6} xs={6}>
                                    <Form.Select className='radiusnone darkAndLight' id='status' value={values.status} onChange={handleChange} onBlur={handleStatus}>
                                        <option value="" className='radiusnone'>Статус</option>
                                        <option value="Approved" className='radiusnone'>Одобрено</option>
                                        <option value="InProcess" className='radiusnone'>В процессе</option>
                                        <option value="Declined" className='radiusnone'>Отклонено</option>
                                    </Form.Select>
                                </Col>
                                <Col className='p-6' xxl={3} xl={3} lg={3} md={4} sm={6} xs={6}>
                                    <Form.Select className='radiusnone darkAndLight' value={values.received} onChange={handleChange} id='received' onBlur={handleReceived}>
                                        <option value="" className='radiusnone'>Ключ получен?</option>
                                        <option value="true" className='radiusnone'>Да</option>
                                        <option value="false" className='radiusnone'>Нет</option>
                                    </Form.Select>
                                </Col>
                                <Col className='p-6' xxl={4} xl={4} lg={4} md={4} sm={6} xs={6}>
                                    <Form.Select className='radiusnone darkAndLight' value={values.returned} onChange={handleChange} id='returned' onBlur={handleReturned}>
                                        <option value="" className='radiusnone'>Ключ вернут?</option>
                                        <option value="true" className='radiusnone'>Да</option>
                                        <option value="false" className='radiusnone'>Нет</option>
                                    </Form.Select>
                                </Col>
                                <Col className='p-6' xxl={4} xl={4} lg={4} md={4} sm={6} xs={6}>
                                    <Form.Select className='radiusnone darkAndLight' value={values.repetitive} onChange={handleChange} id='repetitive' onBlur={handleRepetitive}>
                                        <option value="" className='radiusnone'>Повторная заявка?</option>
                                        <option value="true" className='radiusnone'>Да</option>
                                        <option value="false" className='radiusnone'>Нет</option>
                                    </Form.Select>
                                </Col>
                                <Col className='p-6' xxl={4} xl={4} lg={4} md={12} sm={12} xs={12}>
                                    <Form.Select className='radiusnone darkAndLight' value={values.sorting} onChange={handleChange} id='sorting' onBlur={handleSorting}>
                                        <option value="" className='radiusnone'>Сортировка</option>
                                        <option value="DateAsc" className='radiusnone'>По ↑ даты</option>
                                        <option value="DateDesc" className='radiusnone'>По ↓ даты</option>
                                        <option value="AuditoryAsc" className='radiusnone'>По ↑ аудитории</option>
                                        <option value="AuditoryDesc" className='radiusnone'>По ↓ аудитории</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Stack>
                        {cardsData.map(card => (<RequestCard id={card.requestId} auditory={card.key.auditory} timeSlot={changeTime(card.timeSlot)} bookingDate={changeDate(card.bookingDate)} userRole={changeRole(card.user.userRole)} requestStatus={changeStatus(card.requestStatus)} fullName={card.user.fullName} description={card.description} key={card.requestId} handleMain={handleMain}/>))}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Requests;

/*<RequestCard requestId={inpr.requestId} auditory={inpr.key.auditory} timeSlot={inpr.timeSlot} bookingDate={inpr.bookingDate} userRole={inpr.user.userRole} requestStatus={inpr.requestStatus} fullName={inpr.user.fullName} description={inpr.description}/>
                        <RequestCard requestId={inpr.requestId} auditory={inpr.key.auditory} timeSlot={inpr.timeSlot} bookingDate={inpr.bookingDate} userRole={inpr.user.userRole} requestStatus={appr.requestStatus} fullName={inpr.user.fullName} description={inpr.description} />
    <RequestCard requestId={inpr.requestId} auditory={inpr.key.auditory} timeSlot={inpr.timeSlot} bookingDate={inpr.bookingDate} userRole={inpr.user.userRole} requestStatus={decl.requestStatus} fullName={inpr.user.fullName} description={inpr.description} />*/