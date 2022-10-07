import React, { Component,useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Trans,useTranslation,Translation  } from 'react-i18next';
import i18n from '../../translation/i18n';
import Toast from 'react-bootstrap/Toast';
import { createBrowserHistory } from 'history';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Login from '../account/login';
import logo from '../images/logo.png';
import { BsFillPeopleFill } from "react-icons/bs";
import Alert from 'react-bootstrap/Alert';
import useClipboard from 'react-hook-clipboard';
import '../css/profile.css';


export default function BProfile(){
    const token = localStorage.getItem("token");
    const { t } = useTranslation();
    let username = '';
    const history = createBrowserHistory({
        forceRefresh: true
    });
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    if(token!=null){
        username = parseJwt(token)['sub']; }
    else{
        console.error('Invalid token: ' + token);
    }
    // console.log(username);
    const goProfile=()=>{
        history.push('/profile/'+username)
    }
    const [clipboard, copyToClipboard] = useClipboard()
    let a ='abc'
    return(
        <div className='container-book'>
            <div>
                <Row>
                    <Col sm={2} className='hmenu'>
                        <Button variant="link" href="/">
                            <img src={logo} alt='logo' />
                        </Button>
                        </Col>
                        <Col className='headerMenu'>
                            <Navbar bg="light" expand="lg">
                            <Container fluid>
                                <Navbar.Brand href="#">{t('header.market')}</Navbar.Brand>
                                <Navbar.Toggle aria-controls="navbarScroll" />
                                <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link onClick={goProfile}>{t('header.profile')}</Nav.Link>
                                    <Nav.Link onClick={toggleShowA}>{t('header.notification')}</Nav.Link>
                                    <Nav.Link href="#" disabled>
                                    {t('header.friends')}
                                    </Nav.Link>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control
                                    type="search"
                                    placeholder="......"
                                    className="me-2"
                                    aria-label="Search"
                                    />
                                    <Button variant="outline-success">{t('header.search')}</Button>
                                </Form>
                                </Navbar.Collapse>
                                    
                            </Container>
                            </Navbar>
                        </Col>
                </Row>
            </div>
            <Container>
                <Row>
                    <Col sm={2}>
                        
                    </Col>
                    <Col sm={10}>
                        <Alert variant="success">
                            <img src={logo} alt='logo' />
                            <Button id ='wallet'variant="light" onClick={() => copyToClipboard(a)} value={a}>{a}
                                <p id='helpText'>Click to copy Clipboard</p></Button>
                            <Alert.Heading>Name Book</Alert.Heading>
                            <p>
                                Detail: Aww yeah, you successfully read this important alert message. This
                                example text is going to run a bit longer so that you can see how
                                spacing within an alert works with this kind of content.
                            </p>
                            <hr />
                            <p className="mb-0">
                                Amount {0} {' '}
                            </p>
                            </Alert>
                        <Alert variant="success">
                            <Alert.Heading>Name Book</Alert.Heading>
                            <p>
                                Detail: Aww yeah, you successfully read this important alert message. This
                                example text is going to run a bit longer so that you can see how
                                spacing within an alert works with this kind of content.
                            </p>
                            <hr />
                            <p className="mb-0">
                                Amount {0} {' '}
                            </p>
                            </Alert>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}