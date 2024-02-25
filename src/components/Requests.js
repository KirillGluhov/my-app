import Header from './Header';
import {PageName} from "../const/const-pagesnames"
import { Container } from 'react-bootstrap';
import UpPart from './UpPart';
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