import Header from '../Header';
import { PageName } from "../../const/const-pagesnames";
import { Col, Container, Row } from 'react-bootstrap';
import KeyCard from './KeyCard';
import { useEffect, useState } from 'react';
import { get } from '../../methods/apiUtils';
import useInput from '../../hooks/use-input';
import { token } from '../../const/const-token-temporarily';
import KeysFilter from './KeysFilter';

function Keys(props) {
    const [keys, setKeys] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await get(
                    `/keys/GetAllKeys`,
                    token
                );
                setKeys(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [keys]);

    const handleAddKey = async () => {
        try {
            // Отправляем запрос на сервер для создания нового ключа
            //const newKey = await post('/api/keys/Create', token, { auditory: "" }); // Здесь должна быть ваша аудитория
            // Обновляем список ключей, добавляя новый ключ в начало
            //setKeys(prevKeys => [newKey, ...prevKeys]);
        } catch (error) {
            console.error('Error creating new key:', error);
        }
    };

    return (
        <>
            <Header type="authorized" page={PageName.KEYS} />
            <Container className='mt-5'>
                <KeysFilter handleAddKey={handleAddKey}/>
                {keys ? (
                    keys.map((key) => (
                        <KeyCard
                            keyData={key}
                        />
                    ))
                ) : (
                    <p>Loading</p>
                )}
            </Container>
        </>
    );
}

export default Keys;