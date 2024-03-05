import {Container, Nav, Navbar} from 'react-bootstrap';
import { LogoApp } from './LogoApp';
import useResize from '../hooks/use-resize';
import React from 'react';
import {PageName} from "../const/const-pagesnames";
import partOfHeader from "../methods/partOfHeader";
import '.././styles/header.css';

function Header(props)
{
    const {isScreenSm, isScreenMd} = useResize();

    let keys = partOfHeader(PageName.KEYS, props.page, isScreenSm, isScreenMd);
    let users = partOfHeader(PageName.USERS, props.page, isScreenSm, isScreenMd) 
    let requests = partOfHeader(PageName.REQUESTS, props.page, isScreenSm, isScreenMd);
    let profile = partOfHeader(PageName.PROFILE, props.page, isScreenSm, isScreenMd);
    let login = partOfHeader(PageName.LOGIN, props.page, isScreenSm, isScreenMd);
    let exit = partOfHeader(PageName.EXIT, props.page, isScreenSm, isScreenMd);

    let brand = (
        <Navbar.Brand className='white dontChangeColor'>
            <LogoApp/><span className='stylesForBrand'>TSU.INLOCK</span>
        </Navbar.Brand>
    );

    if (props.type === "authorized")
    {
        return (
            <Navbar expand="md" className='darkblue' >
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
                            {exit}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
    else if (props.type === "unauthorized")
    {
        return (
            <Navbar expand="md" className='darkblue' >
                <Container>
                    {brand}
                    <Navbar.Toggle className='darkblue inner'/>
                    <Navbar.Collapse className='end'>
                        <Nav>
                            {login}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;