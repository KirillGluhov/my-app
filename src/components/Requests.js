import Header from './Header';
import {PageName} from "../const/const-pagesnames"
import { Container, Form, Row, Col, Stack, Button } from 'react-bootstrap';
import UpPart from './UpPart';
import { Yes } from './Yes';
import { No } from './No';
import RequestCard from './RequestCard';

function Requests(props)
{
    return (
        <>
            <Header type="authorized" page={PageName.REQUESTS}/>
            <Container className='mt-5 min-270'>
                <UpPart/>
                <RequestCard/>
                <RequestCard/>
                <RequestCard/>
            </Container>
        </>
    );
}

export default Requests;