import Header from './Header';
import {PageName} from "../const/const-pagesnames"
import { Container } from 'react-bootstrap';
import UpPart from './UpPart';
import RequestCard from './RequestCard';
import {Status} from "../const/const-statuses";

function Requests(props)
{
    return (
        <>
            <Header type="authorized" page={PageName.REQUESTS}/>
            <Container className='mt-5 min-270'>
                <UpPart/>
                <RequestCard status={Status.APPROVED}/>
                <RequestCard status={Status.CANCELLED}/>
                <RequestCard status={Status.INPROCESS}/>
            </Container>
        </>
    );
}

export default Requests;