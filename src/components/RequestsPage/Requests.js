import Header from '../Header';
import { PageName } from "../../const/const-pagesnames"
import { Col, Container, Row, Stack } from 'react-bootstrap';
import UpPart from './UpPart';
import RequestCard from './RequestCard';
import { Status } from "../../const/const-statuses";

function Requests(props) {
    const appr = {
        user: {
            fullName: "SomeStudent",
            email: "b@m.c",
            userRole: "Teacher"
        },
        key: {
            auditory: "5000",
            isInPrincipalOffice: true,
            id: "00000000-0000-0000-0000-000000000000"
        },
        bookingDate: "2024-03-06",
        timeSlot: "S8E10",
        description: "надо",
        requestId: "2d21e387-074d-46ea-89af-c3edf5a33e9c",
        requestStatus: "Approved"
    };

    const decl = {
        user: {
            fullName: "SomeStudent",
            email: "b@m.c",
            userRole: "Teacher"
        },
        key: {
            auditory: "5000",
            isInPrincipalOffice: true,
            id: "00000000-0000-0000-0000-000000000000"
        },
        bookingDate: "2024-03-06",
        timeSlot: "S8E10",
        description: "надо",
        requestId: "2d21e387-074d-46ea-89af-c3edf5a33e9c",
        requestStatus: "Declined"
    };

    const inpr = {
        user: {
            fullName: "SomeStudent",
            email: "b@m.c",
            userRole: "Teacher"
        },
        key: {
            auditory: "5000",
            isInPrincipalOffice: true,
            id: "00000000-0000-0000-0000-000000000000"
        },
        bookingDate: "2024-03-06",
        timeSlot: "S8E10",
        description: "надо",
        requestId: "2d21e387-074d-46ea-89af-c3edf5a33e9c",
        requestStatus: "InProcess"
    };

    console.log(inpr);

    return (
        <>
            <Header type="authorized" page={PageName.REQUESTS} />
            <Container className='mt-5 min-270'>
                <Row>
                    <Col>
                        <UpPart />
                        <RequestCard requestId={inpr.requestId} auditory={inpr.key.auditory} timeSlot={inpr.timeSlot} bookingDate={inpr.bookingDate} userRole={inpr.user.userRole} requestStatus={inpr.requestStatus} fullName={inpr.user.fullName} description={inpr.description}/>
                        <RequestCard requestId={inpr.requestId} auditory={inpr.key.auditory} timeSlot={inpr.timeSlot} bookingDate={inpr.bookingDate} userRole={inpr.user.userRole} requestStatus={appr.requestStatus} fullName={inpr.user.fullName} description={inpr.description} />
                        <RequestCard requestId={inpr.requestId} auditory={inpr.key.auditory} timeSlot={inpr.timeSlot} bookingDate={inpr.bookingDate} userRole={inpr.user.userRole} requestStatus={decl.requestStatus} fullName={inpr.user.fullName} description={inpr.description} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Requests;