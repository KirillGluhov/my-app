import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import "../../styles/requestcard.css";
import { No } from '../No';
import axios from 'axios';
import { useEffect, useState } from 'react';

function KeyCard(keyData) {
    const [isInPrincipalOffice, setIsInPrincipalOffice] = useState(keyData.isInPrincipalOffice);

    const StatusText = ({ isInPrincipalOffice, handleChangeStatus }) => {
        const buttonText = isInPrincipalOffice ? "Выдать на руки" : "Вернуть в деканат";

        return (
            <div className="status">
                <Button variant="primary" className="keyCard-button custom-button-shadow" onClick={handleStatus}>
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
                console.error('Error:', error);
            });

        console.log(keyData)
        keyData.handleParentChange();
    };

    return (
        <Stack className='border-darkblue mx-auto' style={{ width: '50%', padding: '0px' }}>
            <Row className='mt-3 mx-1'>
                <Col xs={12} md={5} xxl={5} className='mb-3 p-6 border-radius-small-all center'>
                    <Form.Control placeholder="-" className='radiusnone center' plaintext readOnly defaultValue={keyData.auditory} />
                </Col>
                <Col xs={12} md={5} xxl={5} className='mb-3 p-6 d-flex justify-content-center'>
                    <StatusText isInPrincipalOffice={isInPrincipalOffice} />
                </Col>
                <Col  xs={12} md={2} xxl={2}  className='mb-3 p-0 d-flex justify-content-center'>
                    <Button className='border-red border-2 rounded-0 d-flex' variant='secondary' style={{ width: '38px', background: "#F97D7D", borderColor: "#823333" }} onClick={handleDeleteKey}><No /></Button>
                </Col>
            </Row>
        </Stack>
    );
}


export default KeyCard;