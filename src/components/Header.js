import {Container, Nav, Navbar} from 'react-bootstrap';
import { LogoApp } from './LogoApp';
import useResize from '../hooks/use-resize';
import React from 'react';
import {PageName} from "../const/const-pagesnames";
import partOfHeader from "../methods/partOfHeader";
import '.././styles/header.css';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

function Header(props)
{
    const {isScreenSm, isScreenMd} = useResize();

    const [isDean, setIsLoggedInDean] = useState(checkTokenDean());
    const [isAdmin, setLoggedInAdmin] = useState(checkTokenAdmin());

    useEffect(() => {
        setIsLoggedInDean(checkTokenDean());
        setLoggedInAdmin(checkTokenAdmin());
    }, []);

    function checkTokenDean()
    {
        const token = localStorage.getItem('token');

        if (token != null)
        {
            if (jwtDecode(token).UserRole == "Principal")
            {
            return true;
            }
            else
            {
            return false;
            }
        }
        else
        {
            return false;
        }
    };

    function checkTokenAdmin()
    {
        const token = localStorage.getItem('token');

        if (token != null)
        {
            if (jwtDecode(token).UserRole == "Admin")
            {
            return true;
            }
            else
            {
            return false;
            }
        }
        else
        {
            return false;
        }
    };

    let keys = partOfHeader(PageName.KEYS, props.page, isScreenSm, isScreenMd, isAdmin);
    let users = partOfHeader(PageName.USERS, props.page, isScreenSm, isScreenMd, isAdmin) 
    let requests = partOfHeader(PageName.REQUESTS, props.page, isScreenSm, isScreenMd, isAdmin);
    let profile = partOfHeader(PageName.PROFILE, props.page, isScreenSm, isScreenMd, isAdmin);
    let login = partOfHeader(PageName.LOGIN, props.page, isScreenSm, isScreenMd, isAdmin);
    let exit = partOfHeader(PageName.EXIT, props.page, isScreenSm, isScreenMd, isAdmin);

    let brand = (
        <Navbar.Brand className='white dontChangeColor'>
            <LogoApp/><span className='stylesForBrand'>TSU.INLOCK</span>
        </Navbar.Brand>
    );

    return (
    <Navbar expand="md" className='darkblue' >
        <Container>
            {brand}
            <Navbar.Toggle className='darkblue inner'/>
            {
                isDean ? 
                (
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
                ) :
                isAdmin ? 
                (
                    <Navbar.Collapse className='endAndStart'>
                        <Nav>
                            {users}
                        </Nav>
                        <Nav>
                            {exit}
                        </Nav>
                    </Navbar.Collapse>
                ) : 
                (
                    <Navbar.Collapse className='end'>
                        <Nav>
                            {login}
                        </Nav>
                    </Navbar.Collapse>
                )
            }
        </Container>
    </Navbar>
    )
}

export default Header;