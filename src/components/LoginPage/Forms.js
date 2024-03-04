import { Col, Row, Stack, Form, Container, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import confirmAndSend from "../../functions/confirmAndSend";
import useValidation from "../../hooks/use-validation";
import "../../styles/forms.css";

function Forms(props) 
{
    const [values, handleChange] = useInput({
        email: "",
        password: ""
    });

    const [errors, handleValidation] = useValidation({
        email: false,
        password: false
    });

    const handleSubmit = () => {
        confirmAndSend(values);
      };

    const tooltipEmail = (
        <Tooltip id="tooltipEmail">
          Электронная почта должна являться электронной почтой
        </Tooltip>
      );

    const tooltipPassword = (
        <Tooltip id="tooltipPassword">
          В пароле должна быть хотя бы одна цифра
        </Tooltip>
      );

    return (
        <Container className='mt-5'>
            <Stack className='darkblue border-radius-small minwidth-300'>
                <Row className='mt-2 mx-1'>
                    <Col className='p-6 m-8' xxl={5} xl={5} lg={5} md={5} sm={12}>
                        {
                            !errors.email ?
                            <Form.Control placeholder="Email" className='verySmallRadius' id='email' value={values.email} onChange={handleChange} onBlur={handleValidation}/> :
                            <OverlayTrigger placement="bottom" overlay={tooltipEmail}>
                                <Form.Control placeholder="Email" className='verySmallRadius' id='email' value={values.email} onChange={handleChange} onBlur={handleValidation}/>
                            </OverlayTrigger>
                        }
                    </Col>
                    <Col className='p-6 m-8' xxl={5} xl={5} lg={5} md={5} sm={12}>
                        {
                            !errors.password ?
                            <Form.Control placeholder="Пароль" className='verySmallRadius' id='password' value={values.password} onChange={handleChange} onBlur={handleValidation}/> :
                            <OverlayTrigger placement="bottom" overlay={tooltipPassword}>
                                <Form.Control placeholder="Пароль" className='verySmallRadius' id='password' value={values.password} onChange={handleChange} onBlur={handleValidation}/>
                            </OverlayTrigger>
                        }
                    </Col>
                    <Col className='p-6 m-8' xxl={2} xl={2} lg={2} md={2} sm={12}>
                        <Button className="stretch" onClick={handleSubmit}>Войти</Button>
                    </Col>
                </Row>
            </Stack>
        </Container>
    );
}

export default Forms;