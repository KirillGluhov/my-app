import Header from '../Header';
import { PageName } from "../../const/const-pagesnames"
import { Col, Container, Row, Stack } from 'react-bootstrap';
import UpPart from './UpPart';
import RequestCard from './RequestCard';
import { Status } from "../../const/const-statuses";

function Requests(props) {
    return (
        <>
            <Header type="authorized" page={PageName.REQUESTS} />
            <Container className='mt-5 min-270'>
                <Row className='justify-content-center'>
                    <Col xs={12} md={8} lg={10}>
                        <UpPart />
                        <RequestCard status={Status.APPROVED} />
                        <RequestCard status={Status.CANCELLED} />
                        <RequestCard status={Status.INPROCESS} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Requests;