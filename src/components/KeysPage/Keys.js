import Header from '../Header';
import { PageName } from "../../const/const-pagesnames";
import { Col, Container, Row } from 'react-bootstrap';
import KeyCard from './KeyCard';
import { useEffect, useState } from 'react';
import { get } from '../../methods/apiUtils';
import useInput from '../../hooks/use-input';
import { token } from '../../const/const-toket-temporarily';
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

    return (
        <>
            <Header type="authorized" page={PageName.KEYS} />
            <Container className='mt-5'>
                <KeysFilter />
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