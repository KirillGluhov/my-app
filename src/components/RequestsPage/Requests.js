import Header from '../Header';
import { PageName } from "../../const/const-pagesnames"
import { Col, Container, Row, Stack } from 'react-bootstrap';
import UpPart from './UpPart';
import RequestCard from './RequestCard';
import { Status } from "../../const/const-statuses";
import { useState, useEffect } from 'react';
import axios, * as others from 'axios';
import changeLanguague from '../../functions/changeLanguague';
import { changeTime, changeRole, changeDate, changeStatus } from "../../functions/changeLanguague";

function Requests(props) {
    const [cardsData, handleCard] = useState([]);

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

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <>
            <Header type="authorized" page={PageName.REQUESTS} />
            <Container className='mt-5 min-270'>
                <Row>
                    <Col>
                        <UpPart />
                        {cardsData.map(card => (<RequestCard id={card.requestId} auditory={card.key.auditory} timeSlot={changeTime(card.timeSlot)} bookingDate={changeDate(card.bookingDate)} userRole={changeRole(card.user.userRole)} requestStatus={changeStatus(card.requestStatus)} fullName={card.user.fullName} description={card.description} key={card.requestId}/>))}
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