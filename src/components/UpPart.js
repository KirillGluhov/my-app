import { Container, Form, Row, Col, Stack } from 'react-bootstrap';

function UpPart(props)
{
    return (
        <Stack className='darkblue'>
            <Row className='mt-4 mx-4'>
                <Col md={4} sm={6} xs={12} className='mb-4'>
                    <Form.Control className='white radiusnone center' plaintext readOnly defaultValue="Список заявок"/>
                </Col>
                <Col md={4} sm={6} xs={12} className='mb-4'>
                    <Form.Control placeholder="Найти" className='search radiusnone p-19'/>
                </Col>
                <Col md={4} sm={6} xs={12} className='mb-4'>
                    <Form.Select className='radiusnone'>
                        <option value="any" className='radiusnone'>Любая роль</option>
                        <option value="Student" className='radiusnone'>Студент</option>
                        <option value="Teacher" className='radiusnone'>Учитель</option>
                    </Form.Select>
                </Col>
                <Col xxl={2} md={4} sm={6} xs={12} className='mb-4'>
                    <Form.Select className='radiusnone' id='building'>
                        <option value="any" className='radiusnone'>Любой корпус</option>
                        <option value="1" className='radiusnone'>1</option>
                        <option value="2" className='radiusnone'>2</option>
                        <option value="3" className='radiusnone'>3</option>
                        <option value="Botanical garden" className='radiusnone'>Ботанический сад</option>
                    </Form.Select>
                </Col>
                <Col xxl={2} md={4} sm={6} xs={12} className='mb-4'>
                    <Form.Select className='radiusnone' id='audience'>
                        <option value="any" className='radiusnone'>Любой кабинет</option>
                        <option value="100" className='radiusnone'>100</option>
                        <option value="200" className='radiusnone'>200</option>
                        <option value="300" className='radiusnone'>300</option>
                        <option value="080" className='radiusnone'>080</option>
                    </Form.Select>
                </Col>
                <Col xxl={2} md={4} sm={6} xs={12} className='mb-4'>
                    <Form.Select className='radiusnone' id='status'>
                        <option value="any" className='radiusnone'>Любой статус</option>
                        <option value="awaits" className='radiusnone'>Ожидает</option>
                        <option value="approved" className='radiusnone'>Одобрено</option>
                        <option value="cancelled" className='radiusnone'>Отклонено</option>
                        <option value="inProcess" className='radiusnone'>В процессе</option>
                    </Form.Select>
                </Col>
                <Col xxl={3} sm={6} xs={12} className='mb-4'>
                    <Form.Control type="date" className='radiusnone from'id='from'/>
                </Col>
                <Col xxl={3} sm={6} xs={12} className='mb-4'>
                    <Form.Control type="date" className='radiusnone to'id='to'/>
                </Col>
            </Row>
        </Stack>
    );
}

export default UpPart;