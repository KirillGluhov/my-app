import { Col, Row, Stack, Form, Container, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import useValidation from "../../hooks/use-validation";
import "../../styles/forms.css";
import axios, * as others from 'axios';
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function Forms(props) 
{
    const [values, handleChange] = useInput({
        email: "",
        password: "",
    });

    const [errors, handleValidation] = useValidation({
        email: false,
        password: false,
    });

    const [confirmError, setErrors] = useState(false)

    const handleSubmit = () => {
        axios.post('https://win.jij.li/api/auth/login', values)
        .then(response => {
            localStorage.setItem("token", response.data.accessToken);

            if (jwtDecode(localStorage.getItem("token")).UserRole == "Principal" || jwtDecode(localStorage.getItem("token")).UserRole == "Admin")
            {
                window.location.assign("http://localhost:3000/requests");
            }
            else
            {
                setErrors(true);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setErrors(true);
    });
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

    const tooltipConfirm = (
        <Tooltip id="tooltipConfirm">
          Неправильные данные пароля и (или) email
        </Tooltip>
    )

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
                        {
                            !confirmError ? 
                            <Button className="stretch" onClick={handleSubmit}>Войти</Button> :
                            <OverlayTrigger placement="bottom" overlay={tooltipConfirm}>
                                <Button className="stretch" onClick={handleSubmit}>Войти</Button>
                            </OverlayTrigger>
                        }
                    </Col>
                </Row>
            </Stack>
        </Container>
    );
}

export default Forms;