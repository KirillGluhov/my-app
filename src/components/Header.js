import {Container, Nav, Navbar} from 'react-bootstrap';
import { LogoApp } from './LogoApp';
import useResize from '../hooks/use-resize';
import React from 'react';

function Header(props)
{
    const { width, isScreenSm, isScreenMd, isScreenLg, isScreenXl } = useResize();

    let keys = (isScreenSm ? <Nav.Link href="keys" className='white stickWhite bigText'>Ключи</Nav.Link> : <Nav.Link href="keys" className='white bigText'>Ключи</Nav.Link>);
    let users = (isScreenSm ? <Nav.Link href="users" className='white stickWhite bigText'>Пользователи</Nav.Link> : <Nav.Link href="users" className='white bigText'>Пользователи</Nav.Link>);
    let requests = (isScreenSm ? <Nav.Link href="requests" className='white stickWhite bigText'>Запросы</Nav.Link> : <Nav.Link href="requests" className='white bigText'>Запросы</Nav.Link>);
    let profile = ((isScreenMd || !isScreenSm) ? <Nav.Link href="profile" className='white bigText'>Профиль</Nav.Link> : <Nav.Link href="profile" className='white stickWhite bigText'>Профиль</Nav.Link>);
    let registration = (isScreenSm ? <Nav.Link href="registration" className='white stickWhite bigText'>Регистрация</Nav.Link> : <Nav.Link href="registration" className='white bigText'>Регистрация</Nav.Link>);
    let login = (isScreenSm ? <Nav.Link href="login" className='white stickWhite bigText'>Вход</Nav.Link> : <Nav.Link href="login" className='white bigText'>Вход</Nav.Link>);

    let brand = (
    <Navbar.Brand className='white dontChangeColor'>
        <LogoApp/><span className='stylesForBrand'>TSU.Inlock</span>
    </Navbar.Brand>
    );

    if (props.type == "authorized")
    {
        return (
            <Navbar expand="sm" className='darkblue' >
                <Container>
                    {brand}
                    <Navbar.Toggle className='darkblue inner'/>
                    <Navbar.Collapse className='endAndStart'>
                        <Nav>
                            {keys}
                            {users}
                            {requests}
                        </Nav>
                        <Nav>
                            {profile}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
    else if (props.type == "unauthorized")
    {
        return (
            <Navbar expand="sm" className='darkblue' >
                <Container>
                    {brand}
                    <Navbar.Toggle className='darkblue inner'/>
                    <Navbar.Collapse className='end'>
                        <Nav>
                            {registration}
                            {login}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;