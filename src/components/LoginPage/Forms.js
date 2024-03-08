import { Col, Row, Stack, Form, Container, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import useValidation from "../../hooks/use-validation";
import "../../styles/forms.css";
import axios, * as others from 'axios';
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function Forms(props) {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const [confirmError, setConfirmError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        setConfirmError(false)
    };

    const handleEmailValidation = () => {
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

        const isCorrectEmail = emailRegex.test(values.email);

        setErrors({
            ...errors,
            email: !isCorrectEmail,
        });
    };

    const handleValidation = () => {
        const passwordHasNumber = /\d/.test(values.password);
        setErrors({
            ...errors,
            password: !passwordHasNumber,
        });
    };

    const handleSubmit = () => {
        axios
            .post("https://win.jij.li/api/auth/login", values)
            .then((response) => {
                localStorage.setItem("token", response.data.accessToken);

                if (
                    jwtDecode(localStorage.getItem("token")).UserRole === "Principal" ||
                    jwtDecode(localStorage.getItem("token")).UserRole === "Admin"
                ) {
                    window.location.assign("http://localhost:3000/requests");
                } else {
                    setConfirmError(true);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setConfirmError(true);
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
            Войти в свой аккаунт могут лишь деканат и администраторы, корректно ввёдшие свой пароль и email
        </Tooltip>
    );

    return (
        <Container className="mt-5 minwidth-540 mx-auto">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={5}>
                    <Stack className="border-radius-small darkAndLight">
                        <Row className="mt-3 mx-1 mb-2">
                            <h4>Авторизация</h4>
                        </Row>
                    </Stack>
                    <Stack className="border-darkblue minwidth-300">
                        <Col className="px-3 mt-3 mb-2" xxl={12} xl={5} lg={5} md={5} sm={12}>
                            {errors.email ? (
                                <OverlayTrigger placement="bottom" overlay={tooltipEmail}>
                                    <Form.Control
                                        placeholder="Email"
                                        className="verySmallRadius"
                                        id="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleEmailValidation}
                                    />
                                </OverlayTrigger>
                            ) : (
                                <Form.Control
                                    placeholder="Email"
                                    className="verySmallRadius"
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleEmailValidation}
                                />
                            )}
                            {errors.email && <div className="text-danger">Неверный формат Email</div>}
                        </Col>
                        <Col className="px-3 mt-3 mb-2" xxl={12} xl={5} lg={5} md={5} sm={12}>
                            {errors.password ? (
                                <OverlayTrigger placement="bottom" overlay={tooltipPassword}>
                                    <Form.Control
                                        placeholder="Пароль"
                                        className="verySmallRadius"
                                        id="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleValidation}
                                    />
                                </OverlayTrigger>
                            ) : (
                                <Form.Control
                                    placeholder="Пароль"
                                    className="verySmallRadius"
                                    id="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleValidation}
                                />
                            )}
                            {errors.password && <div className="text-danger">В пароле должна быть хотя бы одна цифра</div>}
                        </Col>
                        <Col className="px-3 mt-3 mb-3" xxl={12} xl={2} lg={2} md={2} sm={12}>
                            {!confirmError ? (
                                <Button className="stretch custom-button" onClick={handleSubmit}>
                                    Войти
                                </Button>
                            ) : (
                                <OverlayTrigger placement="bottom" overlay={tooltipConfirm}>
                                    <Button className="stretch custom-button" onClick={handleSubmit}>
                                        Войти
                                    </Button>
                                </OverlayTrigger>
                            )}
                            {confirmError && <div className="text-danger">Пользователь не найден</div>}
                        </Col>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
}

export default Forms;