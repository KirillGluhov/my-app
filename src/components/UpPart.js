import { Container, Form, Row, Col, Stack, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import timeImage from '../images/time-image.svg';
import calendarIcon from '../images/calendar-icon.svg';

function UpPart(props)
{
    return (
        <Stack className='darkblue border-radius-small'>
            <Row className='mt-3 mx-2'>
                {/*<Col xs={2} className='mb-3'>
                    <Form.Select className='radiusnone darkAndLight' id='building'>
                        <option value="any" className='radiusnone'>Корпус</option>
                        <option value="1" className='radiusnone'>1</option>
                        <option value="2" className='radiusnone'>2</option>
                        <option value="3" className='radiusnone'>3</option>
                        <option value="Botanical garden" className='radiusnone'>Ботанический сад</option>
                    </Form.Select>
                </Col>*/}
                <Col xs={2} className='mb-3'>
                    <Form.Select className='radiusnone darkAndLight' id='audience'>
                        <option value="any" className='radiusnone'>Аудитория</option>
                        <option value="100" className='radiusnone'>100</option>
                        <option value="200" className='radiusnone'>200</option>
                        <option value="300" className='radiusnone'>300</option>
                        <option value="080" className='radiusnone'>080</option>
                    </Form.Select>
                </Col>
                <Col xs={2} className='mb-3'>
                    <Dropdown>
                        <Dropdown.Toggle className='time-and-date'>
                            Время
                            <img src={timeImage}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey='1'><Button>8:45 - 10:20</Button></Dropdown.Item>
                            <Dropdown.Item eventKey='2'><Button>10:35 - 12:10</Button></Dropdown.Item>
                            <Dropdown.Item eventKey='3'><Button>12:25 - 14:00</Button></Dropdown.Item>
                            <Dropdown.Item eventKey='4'><Button>14:45 - 16:20</Button></Dropdown.Item>
                            <Dropdown.Item eventKey='5'><Button>16:35 - 18:10</Button></Dropdown.Item>
                            <Dropdown.Item eventKey='4'><Button>18:25 - 20:00</Button></Dropdown.Item>
                            <Dropdown.Item eventKey='5'><Button>20:15 - 21:50</Button></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={2} className='mb-3'>
                    <Dropdown>
                        <Dropdown.Toggle className='time-and-date'>
                            Дата
                            <img src={calendarIcon}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Form>
                                <Form.Control type="date" className='radiusnone from' id='from'/>
                                <Form.Control type="date" className='radiusnone to' id='to'/>
                                <Form.Select className='radiusnone'>
                                    <option value="Desc" className='radiusnone'>По убыванию</option>
                                    <option value="Asc" className='radiusnone'>По возрастанию</option>
                                </Form.Select>
                            </Form>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={1} className='mb-3'>
                    <Form.Select className='radiusnone darkAndLight'>
                        <option value="any" className='radiusnone'>Роль</option>
                        <option value="Student" className='radiusnone'>Студент</option>
                        <option value="Teacher" className='radiusnone'>Преподаватель</option>
                    </Form.Select>
                </Col>
                <Col xs={1} className='mb-3'>
                    <Form.Select className='radiusnone darkAndLight' id='status'>
                        <option value="any" className='radiusnone'>Статус</option>
                        <option value="awaits" className='radiusnone'>Ожидает</option>
                        <option value="approved" className='radiusnone'>Одобрено</option>
                        <option value="cancelled" className='radiusnone'>Отклонено</option>
                        <option value="inProcess" className='radiusnone'>В процессе</option>
                    </Form.Select>
                </Col>
                <Col xs={3} className='mb-3'>
                    <Form.Control placeholder="Найти" className='search verySmallRadius'/>
                </Col>
            </Row>
        </Stack>
    );
}

export default UpPart;