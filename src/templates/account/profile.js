import React, { Component,useEffect,useRef } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/profile.css';
import avt from '../images/avt.jpg';
import logo from '../images/logo.png';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import { Trans,useTranslation,Translation  } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import{getAPI} from '../service/api';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createBrowserHistory } from 'history';
import useClipboard from 'react-hook-clipboard'

const getWork = (username) => {
    return getAPI('/profile/get-work/' + username)
}
const getInfoAPI = (username) => {
    return getAPI('/getinfo/' + username)
}
//colums
function createData(blockID, Hash, Methods, TimeStamp, FromUser,Value,To) {
    return { blockID, Hash, Methods, TimeStamp, FromUser,Value,To};
  }
  


export default function Profile(){
    const [clipboard, copyToClipboard] = useClipboard()
    const toClipboard = 'I want to go to the clipboard'
    const token = localStorage.getItem("token");
    let username = '';
    const history = createBrowserHistory({
        forceRefresh: true
    });
    const [work,setWork] = useState([]);
    const [info,setInfo]= useState({addressWallet:"",balance:"",address:'None',email:'',fullname:'',phone:'000xxx',Timecreated:''});
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
    const { t } = useTranslation();
    // get data
    useEffect(() => {
        const requestData = async () => {
        try {
            const result = await getWork(username);
            if (result.status === 200) {
                console.log(result['data']['data'])
                setWork(result['data']['data'])
                // setWork({BlockID:result['data']['data']['BlockID'],FromUser:result['data']['data']['From User'],Hash:result['data']['data']['Hash'],ID:result['data']['data']['ID'],Methods:result['data']['data']['Methods'],TimeStamp:result['data']['data']['Timestamp'],Touser:result['data']['data']['To User'],value:result['data']['data']['value']});
            }
        } catch (e) {
            console.log("error: ",e);
        }
    };
    requestData();
        const getInfo = async () => {
            try {
                const rs = await getInfoAPI(username);
                if (rs.status === 200) {
                    // console.log(rs);
                    setInfo({addressWallet: rs['data']['address-wallet'],balance:rs['data']['balance'],address:rs['data']['data']['Address'],email:rs['data']['data']['Email'],fullname:rs['data']['data']['FullName'],phone:rs['data']['data']['Phone'],Timecreated:rs['data']['data']['TimeCreated']});
                    
                }
            } catch (e) {
                console.log("error: ",e);
            }
    };
    getInfo();
    }, []);
    console.log(work);
    const rows = [
        work.map((row)=>(
            console.log("day la r"+row.blockID),            
            createData(row.blockID, row.hash, row.methods, row.timestamp, row.fromusr, row.value, row.to)
        ))
      ];
    rows.map((row) =>(
        console.log(row.blockID)
    ))
    //copy cliboard 

    return(
        
        <Container style={{'margin-left':'100px'}}>
        <Button variant="link" href="/">
            <img src={logo} alt='logo' />
        </Button>
        <Card>
        <Row style={{'width':'500px','height':'150px','position':'relative'}}>
            <Col><Card.Img style={{'width':'150px','height':'150px'}}variant="top" src={avt} alt='bàkhasfkj'/> </Col>
            <Col id='fullname'>{info.fullname}</Col>
        </Row>
        <Card.Body>
            <Card.Title>
                <p> Total: {info.balance} $<br/><i><Button id ='wallet'variant="light" onClick={() => copyToClipboard(info.addressWallet)} value={info.addressWallet}>{info.addressWallet}
                <p id='helpText'>Click to copy Clipboard</p></Button> </i></p>
                {console.log(clipboard)}
                
            </Card.Title>
            <Card.Text>
            A member is excellence on forum with a lot of post high quality about some book and give some suggestions for newbie.
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>Email: {info.email}</ListGroup.Item>
            <ListGroup.Item>Address: {info.address}</ListGroup.Item>
            <ListGroup.Item>Phone Number: {info.phone}</ListGroup.Item>
            <ListGroup.Item>Time Created: {info.Timecreated}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
            <Tabs
                defaultActiveKey="work"
                id="uncontrolled-tab-example"
                className="mb-3"
                >
                <Tab eventKey="work" title="Work" style={{ height: 400, width: '100%'}}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Block ID</TableCell>
                                <TableCell align="center" className='th'>Hash</TableCell>
                                <TableCell align="center" className='th'>Methods</TableCell>
                                <TableCell align="center"className='th'>Time Stamp</TableCell>
                                <TableCell align="center"className='th'>From User</TableCell>
                                <TableCell align="center"className='th'>Value</TableCell>
                                <TableCell align="center"className='th'>To</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {work.map((row) => (
                                <TableRow
                                key={row.blockID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.blockID}
                                </TableCell>
                                <TableCell align="left">{row.hash}</TableCell>
                                <TableCell align="left">{row.methods}</TableCell>
                                <TableCell align="left">{row.timestamp}</TableCell>
                                <TableCell align="left" >
                                {row.methods =="add_book"
                                ?<Button variant="link" onClick={()=>{history.push('/book/profile/'+row.fromusr)}}>{row.fromusr}</Button>
                                :<Button variant="link" onClick={()=>{history.push('/user-profile/'+row.fromusr)}}>{row.fromusr}</Button>
                                }
                                </TableCell>
                                <TableCell align="left">{row.value}</TableCell>
                                <TableCell align="left">
                                {console.log(row.methods === "add_book")}
                                <Button variant="link" onClick={()=>{history.push('/user-profile/'+row.to)}}>{row.to}</Button>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                </Tab>
                <Tab eventKey="product" title="Product">
                    <Card style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={avt} />
                        <Card.Body>
                            <Card.Title>Book Name</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go Market</Button>
                        </Card.Body>
                    </Card>
                </Tab>
                </Tabs>
        </Card.Body>
        </Card>
        </Container>
    );
}