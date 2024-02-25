import { Container, Form, Row, Col, Stack, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import timeImage from '../images/time-image.svg';
import calendarIcon from '../images/calendar-icon.svg';
import useTime from "../hooks/use-time";
import useInput from '../hooks/use-input';

function UpPart(props)
{
    const [values, handleChange] = useInput(
        { 
            search: "", 
            status: "",
            role: "",
            filter: "Desc",
            from: "",
            to: "",
            time: "",
            audience: ""
        }
    );

    const [selectedTime, setSelectedTime] = useTime()

    function handleDropdownChange(eventKey) 
    {
        handleChange(
            { 
                target: {
                    id: "time", 
                    value: eventKey 
                } 
            }
        );
    }

    return (
        <Stack className='darkblue border-radius-small min-weight-520'>
            <Row className='mt-3 mx-2'>
                <Col xxl={2} xl={3} lg={3} md={4} sm={4} xs={4} className='mb-3 p-6'>
                    <Form.Select className='radiusnone darkAndLight' id='audience' value={values.audience} onChange={handleChange}>
                        <option value="audience" className='radiusnone'>Аудитория</option>
                        <option value="100" className='radiusnone'>100</option>
                        <option value="200" className='radiusnone'>200</option>
                        <option value="300" className='radiusnone'>300</option>
                        <option value="080" className='radiusnone'>080</option>
                    </Form.Select>
                </Col>
                <Col xxl={2} xl={3} lg={3} md={4} sm={4} xs={4} className='mb-3 p-6'>
                    <Dropdown>
                        <Dropdown.Toggle className='time-and-date'>
                            Время
                            <img src={timeImage}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu value={values.time} onChange={handleChange}>
                            <Dropdown.Item eventKey='1' onClick={() => handleDropdownChange('1')}><Button>8:45 - 10:20</Button></Dropdown.Item>
                            <Dropdown.Item eventKey='2' onClick={() => handleDropdownChange('2')}><Button>10:35 - 12:10</Button></Dropdown.Item>
                            <Dropdown.Item eventKey='3' onClick={() => handleDropdownChange('3')}><Button>12:25 - 14:00</Button></Dropdown.Item>
                            <Dropdown.Item eventKey='4' onClick={() => handleDropdownChange('4')}><Button>14:45 - 16:20</Button></Dropdown.Item>
                            <Dropdown.Item eventKey='5' onClick={() => handleDropdownChange('5')}><Button>16:35 - 18:10</Button></Dropdown.Item>
                            <Dropdown.Item eventKey='6' onClick={() => handleDropdownChange('6')}><Button>18:25 - 20:00</Button></Dropdown.Item>
                            <Dropdown.Item eventKey='7' onClick={() => handleDropdownChange('7')}><Button>20:15 - 21:50</Button></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xxl={2} xl={3} lg={3} md={4} sm={4} xs={4} className='mb-3 p-6'>
                    <Dropdown>
                        <Dropdown.Toggle className='time-and-date'>
                            Дата
                            <img src={calendarIcon}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Form>
                                <Form.Control type="date" className='radiusnone from' id='from' value={values.from} onChange={handleChange}/>
                                <Form.Control type="date" className='radiusnone to' id='to' value={values.to} onChange={handleChange}/>
                                <Form.Select className='radiusnone' value={values.filter} onChange={handleChange} id='filter'>
                                    <option value="Desc" className='radiusnone'>По убыванию</option>
                                    <option value="Asc" className='radiusnone'>По возрастанию</option>
                                </Form.Select>
                            </Form>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xxl={2} xl={3} lg={3} md={4} sm={6} xs={6} className='mb-3 p-6'>
                    <Form.Select className='radiusnone darkAndLight' value={values.role} onChange={handleChange} id='role'>
                        <option value="role" className='radiusnone'>Роль</option>
                        <option value="Student" className='radiusnone'>Студент</option>
                        <option value="Teacher" className='radiusnone'>Преподаватель</option>
                    </Form.Select>
                </Col>
                <Col xxl={2} xl={6} lg={6} md={4} sm={6} xs={6} className='mb-3 p-6'>
                    <Form.Select className='radiusnone darkAndLight' id='status' value={values.status} onChange={handleChange}>
                        <option value="status" className='radiusnone'>Статус</option>
                        <option value="awaits" className='radiusnone'>Ожидает</option>
                        <option value="approved" className='radiusnone'>Одобрено</option>
                        <option value="cancelled" className='radiusnone'>Отклонено</option>
                        <option value="inProcess" className='radiusnone'>В процессе</option>
                    </Form.Select>
                </Col>
                <Col xxl={2} xl={6} lg={6} md={4} sm={12} xs={12} className='mb-3 p-6'>
                    <Form.Control placeholder="Найти" className='search verySmallRadius' value={values.search} onChange={handleChange} id='search'/>
                </Col>
            </Row>
        </Stack>
    );
}

export default UpPart;