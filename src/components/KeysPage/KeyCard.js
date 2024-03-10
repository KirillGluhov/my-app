import { Form, Row, Col, Stack, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import "../../styles/requestcard.css";
import { No } from '../No';
import axios from 'axios';
import { useEffect, useState } from 'react';

function KeyCard(keyData) {
    const [isInPrincipalOffice, setIsInPrincipalOffice] = useState(keyData.isInPrincipalOffice);
    const [showTooltip, setShowTooltip] = useState(false);

    const StatusText = ({ isInPrincipalOffice, handleChangeStatus }) => {
        const buttonText = isInPrincipalOffice ? "Выдать на руки" : "Вернуть в деканат";

        return (
            <div className="status">
                <Button
                    className="keyCard-button custom-button-shadow"
                    onClick={handleStatus}
                    >
                    {buttonText}
                </Button>
            </div>
        );
    };

    useEffect(() => {
        setIsInPrincipalOffice(keyData.isInPrincipalOffice);
    }, [keyData]);

    const handleStatus = () => {
        const updatedStatus = !isInPrincipalOffice;

        setIsInPrincipalOffice(updatedStatus);
        console.log(updatedStatus)

        axios.post(
            `https://win.jij.li/api/keys/${keyData.id}/ChangeKeyStatus?isInPrincipalOffice=${updatedStatus}`,
            {}, // Пустое тело запроса
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    function handleDeleteKey() {
        axios.delete(`https://win.jij.li/api/keys/delete/${keyData.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                console.log(response);
                keyData.handleParentChange();
            })
            .catch(error => {
                if (error.response.status === 400) {
                    //setShowTooltip(true);
                    setShowTooltip(true);
                    setTimeout(() => {
                        setShowTooltip(false);
                    }, 3000);
                } else {
                    console.error('Error:', error);
                }
            });

        console.log(keyData)
    };

    const tooltip = (
        <Tooltip
            id="tooltip"
            placement="top"
            arrowSize={0}
            border="none"
            boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
            maxWidth={200}
            backgroundColor="#fff"
            color="#000"
            padding="10px"
            style={{
                borderRadius: "5px",
                fontSize: "14px",
                fontWeight: "bold",
            }}>
            <strong>Нельзя удалить ключ!</strong> Так как он уже занят.
        </Tooltip>
    );

    return (
        <Stack className='border-darkblue mx-auto'>
            <Row className='mt-3 mx-1'>
                <Col xs={5} className='mb-3 p-6 border-radius-small-all center'>
                    <Form.Control placeholder="-" className='radiusnone center' plaintext readOnly defaultValue={keyData.auditory} />
                </Col>
                <Col xs={5} className='mb-3 p-6 d-flex justify-content-center'>
                    <StatusText isInPrincipalOffice={isInPrincipalOffice} />
                </Col>
                <Col xs={2} className='mb-3 p-0 d-flex justify-content-center'>
                    {/*<Button className='border-red border-2 rounded-0 d-flex' variant='secondary' style={{ width: '38px', background: "#F97D7D", borderColor: "#823333" }} onClick={handleDeleteKey}><No /></Button>*/}
                    {showTooltip && (
                        <OverlayTrigger
                            placement="top"
                            overlay={tooltip}
                            delayShow={300}
                            delayHide={150}
                        >
                            <Button
                                className='border-red border-1 rounded-0 d-flex justify-content-center align-items-center'
                                variant='secondary'
                                style={{ width: '38px', background: "white", borderColor: "white" }}
                                onClick={handleDeleteKey}
                            >
                                <No />
                            </Button>
                        </OverlayTrigger>
                    )}
                    {!showTooltip && (
                        <Button
                            className='border-red border-1 rounded-0 d-flex justify-content-center align-items-center'
                            variant='secondary'
                            style={{ width: '38px', background: "white", borderColor: "white" }}
                            onClick={handleDeleteKey}
                        >
                            <No />
                        </Button>
                    )}
                </Col>
            </Row>
        </Stack >
    );
}


export default KeyCard;