import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/profile.css";
import avt from "../images/avt.jpg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import { getAPI, postAPI } from "../service/api";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createBrowserHistory } from "history";
import useClipboard from "react-hook-clipboard";
import { useSnackbar } from "notistack";
import SellForm from "../book/sellForm";
import Dialog from "@mui/material/Dialog";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { FormControl, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import styled from "@emotion/styled";
import { OnDeviceTrainingTwoTone } from "@mui/icons-material";
const getWork = (username) => {
  return getAPI("/profile/get-work/" + username);
};
const getInfoAPI = (username) => {
  return getAPI("/getinfo/" + username);
};
//colums
function createData(blockID, Hash, Methods, TimeStamp, FromUser, Value, To) {
  return { blockID, Hash, Methods, TimeStamp, FromUser, Value, To };
}
const getURL = (idBook) => {
  return getAPI("/book/get-url/" + idBook);
};
const getlistID = (username) => {
  return getAPI("/book/get-id/" + username);
};
const sellAPI = (id) => {
  return postAPI("/book/sell-book/" + id);
};
const onEditAPI =(data)=>{
  return postAPI("/account/edit" ,data);
}
export default function Profile() {
  const [clipboard, copyToClipboard] = useClipboard();
  const toClipboard = "I want to go to the clipboard";
  const token = localStorage.getItem("token");
  let username = "";
  const history = createBrowserHistory({
    forceRefresh: true,
  });
  const { enqueueSnackbar } = useSnackbar();
  const [work, setWork] = useState([]);
  const [book, setBook] = useState([]);
  const [info, setInfo] = useState({
    addressWallet: "",
    balance: "",
    address: "None",
    email: "",
    fullname: "",
    phone: "000xxx",
    Timecreated: "",
  });

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  if (token != null) {
    username = parseJwt(token)["sub"];
  } else {
    console.error("Invalid token: " + token);
  }
  const { t } = useTranslation();
  // get data
  const getInfo = async () => {
    try {
      const rs = await getInfoAPI(username);
      if (rs.status === 200) {
        // console.log(rs);
        setInfo({
          addressWallet: rs["data"]["address-wallet"],
          balance: rs["data"]["balance"],
          address: rs["data"]["data"]["Address"],
          email: rs["data"]["data"]["Email"],
          fullname: rs["data"]["data"]["FullName"],
          phone: rs["data"]["data"]["Phone"],
          Timecreated: rs["data"]["data"]["TimeCreated"],
        });
      }
    } catch (e) {
      console.log("error: ", e);
    }
  };
  useEffect(() => {
    const requestData = async () => {
      try {
        const result = await getWork(username);
        if (result.status === 200) {
          // console.log(result['data']['data'])
          setWork(result["data"]["data"]);
          // setWork({BlockID:result['data']['data']['BlockID'],FromUser:result['data']['data']['From User'],Hash:result['data']['data']['Hash'],ID:result['data']['data']['ID'],Methods:result['data']['data']['Methods'],TimeStamp:result['data']['data']['Timestamp'],Touser:result['data']['data']['To User'],value:result['data']['data']['value']});
        }
      } catch (e) {
        console.log("error: ", e);
      }
    };
    requestData();
    
    getInfo();
    const getBook = async () => {
      try {
        const rsID = await getlistID(username);
        if (rsID.status === 200) {
          console.log(rsID["data"]);
          setBook(rsID["data"]);
        }
      } catch (error) {}
    };
    getBook();
  }, []);
  // console.log(work);
  const rows = [
    work.map((row) =>
      // console.log("day la r"+row.blockID),
      createData(
        row.blockID,
        row.hash,
        row.methods,
        row.timestamp,
        row.fromusr,
        row.value,
        row.to
      )
    ),
  ];
  //copy cliboard
  const [opens, setOpens] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  var link = "https://tiki.vn/search?q="
  const onSell = (id) => {
    localStorage.setItem("idbook", id);
    setOpens(true);
  };

  const handleCloses = () => {
    setOpens(false);
  };
  const onShip = (name) => {
    localStorage.setItem("idbook", name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //onedit
  const [isedit,setIsedit] = React.useState(false);
  const [values,setValues] = React.useState({address:'',phone:'',email:''})
  const onValueChange =(prop)=>(e)=>{
    setValues({ ...values, [prop]: e.target.value });
  }
  const onEdit = async()=>{
    const data = new FormData();
    data.append('phone',values.phone);
    data.append('dc',values.address);
    data.append('email',values.email);
    const rs = await onEditAPI(data);
    if(rs.status === 200){
      enqueueSnackbar("Sucessfully", { variant: "success" });
      getInfo();
      setIsedit(false)
    }
  }

  return (
    <Container style={{ "margin-left": "0" }}>
      <Header />
      <Card className="cardProfile">
        <Row
          style={{
            width: "500px",
            height: "150px",
            paddingTop: "4rem",
            position: "relative",
          }}
        >
          <Col>
            <Card.Img
              style={{ width: "150px", height: "150px" }}
              variant="top"
              src={avt}
              alt="bàkhasfkj"
            />{" "}
          </Col>
          <Col id="fullname">{info.fullname}</Col>
        </Row>
        <Card.Body>
          <Card.Title>
            <p>
              {" "}
              Total: {info.balance} $<br />
              <i>
                <Button
                  id="wallet"
                  variant="light"
                  onClick={() => copyToClipboard(info.addressWallet)}
                  value={info.addressWallet}
                >
                  {info.addressWallet}
                  <p id="helpText">Sao chép</p>
                </Button>{" "}
              </i>
            </p>
            {console.log(clipboard)}
          </Card.Title>
          <Card.Text>
            Một thành viên xuất sắc và có nhiều đóng góp trong việc xây dựng hệ thống .
          </Card.Text>
          <Button variant="outlined" style={{position:'absolute',right:'0px'}} onClick={()=> setIsedit(true)}><EditIcon/></Button>
          <br/>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Email: {' '}
          {isedit ?(
            <TextField 
            id="standard-helperText"
            variant="standard"
            onChange={onValueChange('email')}
            />
          )
          :(
            <TextField 
            id="standard"
            value={info.email}
            variant="standard"
            disabled
            />
          )
          }
          </ListGroup.Item>
          <ListGroup.Item>Địa chỉ:  {' '}
          {isedit ?(
            <TextField 
            id="standard-helperText"
            variant="standard"
            onChange={onValueChange('address')}
            />
          )
          :(
            <TextField 
            id="standard-helperText"
            value={info.address}
            variant="standard"
            disabled
            />
          )
          }
          </ListGroup.Item>
          <ListGroup.Item>Điện thoại: {' '}
          {isedit ?(
            <TextField 
            id="standard-helperText"
            variant="standard"
            onChange={onValueChange('phone')}
            />
          )
          :(
            <TextField 
            id="standard-helperText"
            value={info.phone}
            variant="standard"
            disabled
            />
          )
          }
          </ListGroup.Item>
          <ListGroup.Item>Thời gian tạo: {info.Timecreated}</ListGroup.Item>
          {isedit?(
            <Button onClick={onEdit}>Update</Button>
          )
          :''}
        </ListGroup>
        <Card.Body>
          <Tabs
            defaultActiveKey="work"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab
              eventKey="work"
              title="Hoạt Động"
              style={{ height: 400, width: "100%" }}
            >
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Block ID
                      </TableCell>
                      <TableCell
                        align="center"
                        className="th"
                        style={{ fontWeight: "bold" }}
                      >
                        Hash
                      </TableCell>
                      <TableCell
                        align="center"
                        className="th"
                        style={{ fontWeight: "bold" }}
                      >
                        Methods
                      </TableCell>
                      <TableCell
                        align="center"
                        className="th"
                        style={{ fontWeight: "bold" }}
                      >
                        Time Stamp
                      </TableCell>
                      <TableCell
                        align="center"
                        className="th"
                        style={{ fontWeight: "bold" }}
                      >
                        From User
                      </TableCell>
                      <TableCell
                        align="center"
                        className="th"
                        style={{ fontWeight: "bold" }}
                      >
                        Value
                      </TableCell>
                      <TableCell
                        align="center"
                        className="th"
                        style={{ fontWeight: "bold" }}
                      >
                        To
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {work.map((row) => (
                      <TableRow
                        key={row.blockID}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.blockID}
                        </TableCell>
                        <TableCell align="left">{row.hash}</TableCell>
                        {row.methods == "create" ? (
                          <TableCell
                            align="left"
                            style={{
                              backgroundColor: "#20c997",
                              color: "white",
                            }}
                          >
                            {row.methods.toUpperCase()}
                          </TableCell>
                        ) : row.methods == "add_book" ? (
                          <TableCell
                            align="left"
                            style={{
                              backgroundColor: "#198754",
                              color: "white",
                            }}
                          >
                             {row.methods.toUpperCase()}
                          </TableCell>
                        ) : rows.methods === "deposit" ? (
                          <TableCell
                            align="left"
                            style={{
                              backgroundColor: "black",
                              color: "white",
                            }}
                          >
                             {row.methods.toUpperCase()}
                          </TableCell>
                        ) : row.methods === "withdraw" ? (
                          <TableCell
                            align="left"
                            style={{
                              backgroundColor: "#ffc107",
                              color: "white",
                            }}
                          >
                             {row.methods.toUpperCase()}
                          </TableCell>
                        ) : row.methods == "sell" ? (
                          <TableCell
                            align="left"
                            style={{
                              backgroundColor: "#dc3545",
                              color: "white",
                            }}
                          >
                             {row.methods.toUpperCase()}
                          </TableCell>
                        ) : row.methods == 'sold'?(
                          <TableCell
                            align="left"
                            style={{
                              backgroundColor: "#af6f25",
                              color: "white",
                            }}
                          >
                             {row.methods.toUpperCase()}
                          </TableCell>
                        ):(
                          <TableCell
                            align="left"
                            style={{
                              backgroundColor: "#1d6ce2",
                              color: "white",
                            }}
                          >
                             {row.methods.toUpperCase()}
                          </TableCell>
                        )}

                        <TableCell align="left" style={{ color: "green" }}>
                          {row.timestamp}
                        </TableCell>
                        <TableCell align="left">
                          {row.methods == "add_book" ? (
                            <Button
                              variant="link"
                              onClick={() => {
                                history.push("/book/profile/" + row.fromusr);
                              }}
                            >
                              {row.fromusr}
                            </Button>
                          ) : (
                            <Button
                              variant="link"
                              onClick={() => {
                                history.push("/user-profile/" + row.fromusr);
                              }}
                            >
                              {row.fromusr}
                            </Button>
                          )}
                        </TableCell>
                        <TableCell align="left">{row.value}</TableCell>
                        <TableCell align="left">
                          <Button
                            variant="link"
                            onClick={() => {
                              history.push("/user-profile/" + row.to);
                            }}
                          >
                            {row.to}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Tab>
            <Tab eventKey="product" title="Sản Phẩm" style={{ display: "flex" }}>
              {book.map((row) => (
                <Card style={{ display: "contents", padding: "10px" }}>
                  {/* <Card.Img variant="top" src={avt} /> */}
                  <Card.Body>
                    <Card.Title>
                      <Link
                        onClick={() => history.push("/book/profile/" + row._id)}
                      >
                        {row.name}
                      </Link>
                    </Card.Title>
                    <Card.Text>{t(row.type)}</Card.Text>
                    <Card.Text>{t(row.country)}</Card.Text>
                    <Card.Text>
                      {row.nxb}
                      {" in "}
                      {row.datexb}
                    </Card.Text>
                    <Card.Text>
                      {"Added at: "}
                      {row.timestamp}
                    </Card.Text>
                    <Button variant="primary" onClick={() => onSell(row._id)}>
                      Bán
                    </Button>
                    <br />
                    <Link target="_blank" href={row.pdf}>
                        Tải
                    </Link>
                    <Button variant='link' onClick={()=>onShip(row.name)}>Nhận</Button>
                  </Card.Body>
                </Card>
              ))}
            </Tab>
          </Tabs>
        </Card.Body>
        <Dialog
          open={opens}
          onClose={handleCloses}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg    "
        >
          <SellForm />
        </Dialog>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg    "
        >
          <Nhan />
        </Dialog>
      </Card>
    </Container>
  );
}
export const Nhan = ()=>{
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  let pay = 5
  let id = localStorage.getItem('idbook')
  const [amount,setAmount] = useState(0);
  const onValueChange = (event) => {
    setAmount(event.target.value);
  }
  return(
    <Wapper>
      <div className="ctn">
        <h1>Nhận Sách Tại Nhà Của Bạn</h1>
        Tên Sách:{id}
        <hr/>
        <div className="info">
          
          <TextField id="outlined-basic" label="Tên người nhận" variant="outlined" />
          <TextField id="outlined-basic" label="SDT" variant="outlined" />
        
        </div>
        <br></br>
        <div className="address">
          <TextField id="outlined-basic" label="Tỉnh/Thành Phố" variant="outlined" />
          <TextField id="outlined-basic" label="Quận/Huyện" variant="outlined" />
          <TextField id="outlined-basic" label="Chi tiết: Số nhà, đường" variant="outlined" />
        </div>
        <br></br>
        <div className="sl">
        <TextField
              id="outlined-number"
              label="Số lượng"
              type="number"
              onChange={onValueChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
        </div>
        <hr />
        <Button variant='primary'>Thanh toán {pay} {'$'}</Button>
      </div>
    </Wapper>
  )
}
export const Wapper = styled.div`
    .ctn{
      padding: 10px;
      .MuiTextField-root{
        padding-left: 10px;
      }
    }

`