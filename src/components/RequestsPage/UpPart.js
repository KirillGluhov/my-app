import { Container, Form, Row, Col, Stack, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import timeImage from '../../images/time-image.svg';
import calendarIcon from '../../images/calendar-icon.svg';
import audienceIcon from '../../images/audience-icon.svg';
import useTime from "../../hooks/use-time";
import useInput from '../../hooks/use-input';
import "../../styles/scrollbar.css";

function UpPart(props)
{
    const [values, handleChange] = useInput(
        {  
            role: "",
            time: "",
            status: "",
            received: "",
            returned: "",
            repetitive: "",
            sorting: ""
        }
    );

    const [selectedTime, setSelectedTime] = useTime()

    /*function handleDropdownChange(eventKey) 
    {
        handleChange(
            { 
                target: {
                    id: "time", 
                    value: eventKey 
                } 
            }
        );
    }*/

    return (
        <Stack className='darkblue border-radius-small min-weight-520'>
            <Row className='mt-2 mx-1 mb-2'>
                <Col className='p-6' xxl={3} xl={3} lg={3} md={4} sm={6} xs={6}>
                    <Form.Select className='radiusnone darkAndLight' value={values.role} onChange={handleChange} id='role'>
                        <option value="" className='radiusnone'>Роль</option>
                        <option value="Student" className='radiusnone'>Студент</option>
                        <option value="Teacher" className='radiusnone'>Преподаватель</option>
                        <option value="Principal" className='radiusnone'>Деканат</option>
                        <option value="Admin" className='radiusnone'>Администратор</option>
                    </Form.Select>
                </Col>
                <Col className='p-6' xxl={3} xl={3} lg={3} md={4} sm={6} xs={6}>
                    <Form.Select className='radiusnone darkAndLight custom-scrollbar' value={values.time} onChange={handleChange} id='time' multiple>
                        <option value="" className='radiusnone'>Время</option>
                        <option value="S8E10" className='radiusnone'>8:45 - 10:20</option>
                        <option value="S10E12" className='radiusnone'>10:35 - 12:10</option>
                        <option value="S12E14" className='radiusnone'>12:25 - 14:00</option>
                        <option value="S14E16" className='radiusnone'>14:45 - 16:20</option>
                        <option value="S16E18" className='radiusnone'>16:35 - 18:10</option>
                        <option value="S18E20" className='radiusnone'>18:25 - 20:00</option>
                        <option value="S20E21" className='radiusnone'>20:15 - 21:50</option>
                    </Form.Select>
                    {/*<Dropdown>
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
                        </Dropdown.Menu></Dropdown>*/}
                </Col>
                <Col className='p-6' xxl={3} xl={3} lg={3} md={4} sm={6} xs={6}>
                    <Form.Select className='radiusnone darkAndLight' id='status' value={values.status} onChange={handleChange}>
                        <option value="" className='radiusnone'>Статус</option>
                        <option value="Approved" className='radiusnone'>Одобрено</option>
                        <option value="InProcess" className='radiusnone'>В процессе</option>
                        <option value="Declined" className='radiusnone'>Отклонено</option>
                    </Form.Select>
                </Col>
                <Col className='p-6' xxl={3} xl={3} lg={3} md={4} sm={6} xs={6}>
                    <Form.Select className='radiusnone darkAndLight' value={values.received} onChange={handleChange} id='received'>
                        <option value="" className='radiusnone'>Ключ получен?</option>
                        <option value="true" className='radiusnone'>Да</option>
                        <option value="false" className='radiusnone'>Нет</option>
                    </Form.Select>
                </Col>
                <Col className='p-6' xxl={4} xl={4} lg={4} md={4} sm={6} xs={6}>
                    <Form.Select className='radiusnone darkAndLight' value={values.returned} onChange={handleChange} id='returned'>
                        <option value="" className='radiusnone'>Ключ вернут?</option>
                        <option value="true" className='radiusnone'>Да</option>
                        <option value="false" className='radiusnone'>Нет</option>
                    </Form.Select>
                </Col>
                <Col className='p-6' xxl={4} xl={4} lg={4} md={4} sm={6} xs={6}>
                    <Form.Select className='radiusnone darkAndLight' value={values.repetitive} onChange={handleChange} id='repetitive'>
                        <option value="" className='radiusnone'>Повторная заявка?</option>
                        <option value="true" className='radiusnone'>Да</option>
                        <option value="false" className='radiusnone'>Нет</option>
                    </Form.Select>
                </Col>
                <Col className='p-6' xxl={4} xl={4} lg={4} md={12} sm={12} xs={12}>
                    <Form.Select className='radiusnone darkAndLight' value={values.sorting} onChange={handleChange} id='sorting'>
                        <option value="" className='radiusnone'>Сортировка</option>
                        <option value="DateAsc" className='radiusnone'>По ↑ даты</option>
                        <option value="DateDesc" className='radiusnone'>По ↓ даты</option>
                        <option value="AuditoryAsc" className='radiusnone'>По ↑ аудитории</option>
                        <option value="AuditoryDesc" className='radiusnone'>По ↓ аудитории</option>
                    </Form.Select>
                </Col>
            </Row>
        </Stack>
    );
}

export default UpPart;