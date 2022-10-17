import React, { Component,useState } from 'react';

import './css/index2.css';
import Logo from './images/logo.png';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Trans,useTranslation,Translation  } from 'react-i18next';
import i18n from '../translation/i18n';
import Toast from 'react-bootstrap/Toast';
import { createBrowserHistory } from 'history';
import { BsFillPeopleFill } from "react-icons/bs";
import Spinner from 'react-bootstrap/Spinner';
import Login from './account/login';
import Dialog from '@mui/material/Dialog';




const customContentStyle = {
    width: '500px',
    maxWidth: 'none',
  };
function Home() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const token = localStorage.getItem("token");
    const { t } = useTranslation();
    let username = '';
    const history = createBrowserHistory({
        forceRefresh: true
    });
    //show toast
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    //get username from token
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    if(token!=null){
        username = parseJwt(token)['sub']; }
    else{
        username = '';
        console.error('Invalid token: ' + token);
    }
    // console.log(username);
    const goProfile=()=>{
        history.push('/profile/'+username)
    }
    let tempid = '1665429018'
    const gotoProfileBook =()=>{
        history.push('/book/profile/'+tempid)
    }

    return ( 
        <div className='homeindex'>
            <div className='menu'>
                <div className='logo'>
                    <img src={Logo} ></img>
                </div>
                <div className='menucontent'>
                <Nav defaultActiveKey="/" className="flex-column">
                    <NavDropdown id="nav-dropdown-dark-example"title={t('menu.language')} menuVariant="light">
                            <NavDropdown.Item onClick={()=>i18n.changeLanguage('vi')}>{t('menu.lan-vi')}</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>i18n.changeLanguage('en')}>{t('menu.lan-en')}</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/book/add-book">{t('menu.create')}</Nav.Link>
                    <Nav.Link href="#">{t('menu.sell')}</Nav.Link>
                    <Nav.Link href="#">{t('menu.give')}</Nav.Link>

                    {/* type */}
                    <NavDropdown id="nav-dropdown-dark-example"title={t('menu.categories')}menuVariant="dark">
                    <NavDropdown.Item href="#action/3.1" className='item'>
                    {t('menu.categories-action')}
                    </NavDropdown.Item >
                    <NavDropdown.Item href="#action/3.2" className='item'>
                    {t('menu.categories-art')}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3" className='item'>
                    {t('menu.categories-business')}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4" className='item'>
                    {t('menu.categories-computer')}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.5"className='item'>
                    {t('menu.categories-history')}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.6"className='item'>
                    {t('menu.categories-entertainment')}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.7"className='item'>
                    {t('menu.categories-sport')}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.8"className='item'>
                    {t('menu.categories-travel')}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.9"className='item'>
                    {t('menu.categories-teen')}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/4.0"className='item'>
                    {t('menu.categories-other')}
                    </NavDropdown.Item>
                    </NavDropdown>

                    {/* country */}
                    <NavDropdown
                        id="nav-dropdown-dark-example"
                        title={t('menu.country')}
                        menuVariant="dark"
                        >
                        <NavDropdown.Item href="#action/3.1">{t('menu.lan-vi')}</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                        {t('menu.country-france')}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">{t('menu.country-usa')}</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                        {t('menu.categories-other')}
                        </NavDropdown.Item>
                        </NavDropdown>
                    {/* wallet */}
                    <Nav.Link href="#">{t('menu.wallet')}</Nav.Link>
                </Nav>
                <Toast show={showA} onClose={toggleShowA}>
                <Toast.Header>
                    
                    <strong className="me-auto">ADMIN</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>{t('header.noti')}</Toast.Body>
            </Toast>
                </div>
            </div>
            <div className='headercontent'>
                <div className='header'>
                <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item className='nav-1'>
                        <Nav.Link onClick={gotoProfileBook}>{t('header.market')}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='nav-1'>
                        <Nav.Link onClick={goProfile}>{t('header.profile')}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='nav-1'>
                        <Nav.Link onClick={toggleShowA}>{t('header.notification')}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Form className="d-flex">
                            <Form.Control
                            type="search"
                            placeholder=".........."
                            className="me-2"
                            aria-label="Search"
                            />
                            <Button variant="outline-success">{t('header.search')}</Button>
                        </Form>
                        </Nav.Item>
                        <Nav.Item>
                        {username!=""
                        ? <p id='username'> <BsFillPeopleFill/>{username}</p>
                        : <Button variant="primary" disabled id='loading'>
                            <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />
                        </Button>}
                        </Nav.Item>
                        <Nav.Item>
                        {username!=''
                            ?<Nav.Link href="/logout">{t('header.signout')}</Nav.Link>
                            :<Nav.Link onClick={handleClickOpen}>{t('header.signin')}</Nav.Link>
                            }
                            {/* <Nav.Link href="/login">{t('header.signin')}</Nav.Link>
                            <Nav.Link eventKey={2} href="/register">
                            {t('header.signup')}
                            </Nav.Link> */}
                        </Nav.Item>
                    </Nav>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    maxWidth='lg    '
                >
                    <Login />
                </Dialog>
                <div className='content'>
                    content
                </div>
            </div>
        </div>
     );
}

export default Home;