import React from 'react'
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import styled from 'styled-components';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';

import avt from '../images/avt.jpg';
import qr from '../images/qr.png'
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export const Wallet = () => {
  const [openwithdraww, setOpenWidthdraww] = React.useState(false);
  const [opendes, setOpenDes] = React.useState(false);
  const [opensend, setOpenSend] = React.useState(false);


  const handleClickOpenWithdraww = () => {
      setOpenWidthdraww(true);
  };
  const handleClickOpenDeposit =()=>{
    setOpenDes(true)
  }
  const handleClickOpenSend =()=>{
    setOpenSend(true)
  }
  const handleClose = () => {
      setOpenWidthdraww(false);
      setOpenDes(false);
      setOpenSend(false)
  };
  return (
    <Wrapper>
      <Header/>
    <div className='wallet-container'>
      <Menu />
      <div className='content'>
        <div className='profile'>
          <center><img alt='avt' src={avt}></img>
          <h1> Username</h1>
          <h3> Wallet Address</h3>
          <p> Amount</p>
          <Button variant='outlined' onClick={handleClickOpenWithdraww}>Withdraw</Button>
          <Button variant='outlined'onClick={handleClickOpenDeposit}>Deposit</Button>
          <Button variant='contained'onClick={handleClickOpenSend}>Send</Button>
          </center>
          
        </div>
        <h1> Transfer History</h1>
        <div className='transfer-history'>
        <Dialog
            open={openwithdraww}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth='lg'>
            <Withdraw />
        </Dialog>
        <Dialog
            open={opendes}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth='lg'>
            <Deposit />
        </Dialog>
        <Dialog
            open={opensend}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth='lg'>
            <Send />
        </Dialog>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
    </div>
    </Wrapper>
  )
}
export const Wrapper = styled.div`
  .wallet-container{
    position: absolute;
    background-image: url('https://res.cloudinary.com/dwweabf16/image/upload/v1667616732/bg-1_u6t13w.png');
    min-height:1200px;
    width: 100%;
    .content{
      padding:10px;
      background-color: white;
      margin-left: 15rem;
      .profile{
        button{
          margin: 2rem;
        }
      }
    }
    .transfer-history{
      display: flex;
    }
  }
`
export const Withdraw =()=>{
  return(
    <Wrapper>
      <div style={{padding:'10px'}}>
      <center><h1 style={{color:'green'}}> Withdraw </h1>
      <p>Your wallet : $</p></center>
      <TextField id="outlined-basic" label="Your Bank Name" variant="outlined"  />
            <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
            <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
          <TextField
            helperText="Your Number"
            id="demo-helper-text-aligned"
            label="Number"
            style={{marginLeft:'2rem'}}
          />
          <TextField
            helperText="Branch"
            id="demo-helper-text-aligned"
            label="Branch"
            style={{marginLeft:'2rem'}}
          />
          <hr/>
          <center>
            <Button> Submit</Button>
          </center>
          </div>
    </Wrapper>
  )
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export const Deposit = ()=>{
  const [value, setValue] = React.useState(0);
  const [detail,setDetail] = React.useState({nd:''});
  const [amount,setAmount] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let valueConvert = 24.345;
  const curency = [{'usd':5},
                  {'usd':10},
                {'usd':20},{'usd':50},{'usd':100}]
  const onBuy=(am)=>{
    setAmount(am)
  }
  const onChangeDetail = (e)=>{
    setDetail(prev=>({...prev,nd:e.target.value}));
  }
  return(
    <Wrapper>
      <h2 style={{color:'red','text-align':'center'}}> Choose Methods</h2>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="PayPal" {...a11yProps(0)} />
            <Tab label="Debit Card" {...a11yProps(1)} />
            <Tab label="Crypto" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <p>Select Amount</p>
          <ButtonGroup variant="text" aria-label="text button group">
            {curency.map((row)=>(
              <Button onClick={()=>onBuy(row.usd)}>{row.usd}{"$ = "}{row.usd*valueConvert}{' VND'}</Button>
            ))}
          </ButtonGroup>
          <hr/>
          <TextField id="outlined-basic" label="Your Email" variant="outlined" onChange={onChangeDetail} />
          <TextField
            hiddenLabel
            id="filled-hidden-label-normal"
            defaultValue='Send With Content'
            value={amount+detail.nd.split('@')[0]}
            variant="filled"
            style={{'paddingLeft':'2rem'}}
          />
          <Button variant="contained" color="success" style={{float:'right',marginTop:'10px'}}>Create</Button>
          {console.log(detail.nd)}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {"Insert Your Card"}
          <hr/>
            <TextField id="outlined-basic" label="Your Full Name" variant="outlined"  />
            <InputLabel htmlFor="filled-adornment-amount">Card Number</InputLabel>
            <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">Visa</InputAdornment>}
            label="Card Number"
          />
          <TextField
            helperText="Expiration Date"
            id="demo-helper-text-aligned"
            label="Date"
          />
          <TextField
            helperText="CCV"
            id="demo-helper-text-aligned"
            label="CCV"
          />
          <hr/>
          <center>
          <Button>ADD Card</Button>
          </center>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <center>
            <img src={qr} alt='Create qr code for free'/>
          <p> Scan QR and send this</p>
          </center>
        </TabPanel>
      </Box>`
    </Wrapper>
  )
}
export const Send = ()=>{
  return(
    <Wrapper>
      Send
    </Wrapper>
  )
}