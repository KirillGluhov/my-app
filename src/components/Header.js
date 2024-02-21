import {Container, Nav, Navbar} from 'react-bootstrap';
import { LogoApp } from './LogoApp';
import useResize from '../hooks/use-resize';
import React from 'react';
import {PageName} from "../const/const-pagesnames";
import {Styles} from "../const/const-styles";

function Header(props)
{
    const {isScreenSm, isScreenMd} = useResize();

    let keys = (
        props.page === PageName.KEYS ? 
        (
            isScreenSm ?
            <Nav.Link href="keys" className={Styles.WITHSTICK} disabled>Ключи</Nav.Link> :
            <Nav.Link href="keys" className={Styles.WITHOUTSTICK} disabled>Ключи</Nav.Link>
        ) 
        :
        (
            isScreenSm ?
            <Nav.Link href="keys" className={Styles.WITHSTICK}>Ключи</Nav.Link> :
            <Nav.Link href="keys" className={Styles.WITHOUTSTICK}>Ключи</Nav.Link>
        )
    );
    let users = (
        props.page === PageName.USERS ?
        (
            isScreenSm ?
            <Nav.Link href="users" className={Styles.WITHSTICK} disabled>Пользователи</Nav.Link> :
            <Nav.Link href="users" className={Styles.WITHOUTSTICK} disabled>Пользователи</Nav.Link>
        ) 
        :
        (
            isScreenSm ?
            <Nav.Link href="users" className={Styles.WITHSTICK}>Пользователи</Nav.Link> :
            <Nav.Link href="users" className={Styles.WITHOUTSTICK}>Пользователи</Nav.Link>
        )
    );
    let requests = (
        props.page === PageName.REQUESTS ?
        (
            isScreenSm ?
            <Nav.Link href="requests" className={Styles.WITHSTICK} disabled>Запросы</Nav.Link> :
            <Nav.Link href="requests" className={Styles.WITHOUTSTICK} disabled>Запросы</Nav.Link>
        ) 
        :
        (
            isScreenSm ?
            <Nav.Link href="requests" className={Styles.WITHSTICK}>Запросы</Nav.Link> :
            <Nav.Link href="requests" className={Styles.WITHOUTSTICK}>Запросы</Nav.Link>
        )
    );
    let profile = (
        props.page === PageName.PROFILE ?
        ((isScreenMd || !isScreenSm) ? <Nav.Link href="profile" className={Styles.WITHOUTSTICK} disabled>Профиль</Nav.Link> : <Nav.Link href="profile" className={Styles.WITHSTICK} disabled>Профиль</Nav.Link>) :
        ((isScreenMd || !isScreenSm) ? <Nav.Link href="profile" className={Styles.WITHOUTSTICK}>Профиль</Nav.Link> : <Nav.Link href="profile" className={Styles.WITHSTICK}>Профиль</Nav.Link>)
    );
    let registration = (
        props.page === PageName.REGISTRATION ?
        (
            isScreenSm ?
            <Nav.Link href="registration" className={Styles.WITHSTICK} disabled>Регистрация</Nav.Link> :
            <Nav.Link href="registration" className={Styles.WITHOUTSTICK} disabled>Регистрация</Nav.Link>
        ) 
        :
        (
            isScreenSm ?
            <Nav.Link href="registration" className={Styles.WITHSTICK}>Регистрация</Nav.Link> :
            <Nav.Link href="registration" className={Styles.WITHOUTSTICK}>Регистрация</Nav.Link>
        )
    );
    let login = (
        props.page === PageName.LOGIN ?
        (
            isScreenSm ?
            <Nav.Link href="login" className={Styles.WITHSTICK} disabled>Вход</Nav.Link> :
            <Nav.Link href="login" className={Styles.WITHOUTSTICK} disabled>Вход</Nav.Link>
        ) 
        :
        (
            isScreenSm ?
            <Nav.Link href="login" className={Styles.WITHSTICK}>Вход</Nav.Link> :
            <Nav.Link href="login" className={Styles.WITHOUTSTICK}>Вход</Nav.Link>
        )
    );

    let brand = (
    <Navbar.Brand className='white dontChangeColor'>
        <LogoApp/><span className='stylesForBrand'>TSU.Inlock</span>
    </Navbar.Brand>
    );

    if (props.type === "authorized")
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
    else if (props.type === "unauthorized")
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