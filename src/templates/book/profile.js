import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useTranslation } from "react-i18next";
import { createBrowserHistory } from "history";

import Alert from "react-bootstrap/Alert";
import useClipboard from "react-hook-clipboard";
import { getAPI, postAPI } from "../service/api";
import "../css/profile.css";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import styled from "@emotion/styled";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Footer } from "../components/Footer";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import { useSnackbar } from "notistack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { Table } from "react-bootstrap";

const getbookAPI = (idBook) => {
  return getAPI("/book/profile/" + idBook);
};
const putcmtAPI = (data) => {
  return postAPI("/book/comment/add", data);
};
const getCommentAPI = (id) => {
  return postAPI("/book/comment/get-byid/" + id);
};
const onDeleteAPI = (id) => {
  return postAPI("/book/comment/delete/" + id);
};
const onLikeAPI = (id) => {
  return postAPI("/book/comment/like/" + id);
};
const getWorkAPI=(id)=> {
  return postAPI("/book/get-work/"+id)
}
export default function BProfile() {
  const [cmt, setCmt] = useState();
  const [comment, setComment] = useState([]);
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  let username = "";
  const [infoBook, setInfoBook] = useState([]);
  const [url, setUrl] = useState("");
  let { idBook } = useParams();

  const history = createBrowserHistory({
    forceRefresh: true,
  });
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const [open, setOpen] = React.useState(false);
  const [work, setWork] = React.useState([]);
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
  // console.log(username);
  const goProfile = () => {
    history.push("/profile/" + username);
  };

  const { enqueueSnackbar } = useSnackbar();
  const [clipboard, copyToClipboard] = useClipboard();
  let idcmt = localStorage.getItem("idcomment");
  let a = "abc";
  const getComment = async () => {
    try {
      const rs = await getCommentAPI(idBook);
      if (rs.status === 200) {
        console.log(rs["data"]);
        setComment(rs["data"]);
      }
    } catch (error) {}
  };
  const getInfoBook = async () => {
    try {
      const rs = await getbookAPI(idBook);
      if (rs.status === 200) {
        // console.log(rs['data']['url']);
        setInfoBook(rs["data"]["data"]);
        setUrl(rs["data"]["url"]);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getInfoBook();
    getComment();
    getWOrk();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onValueChange = (e) => {
    setCmt(e.target.value);
  };
  const getWOrk = async () => {
    try {
      const result = await getWorkAPI(idBook);
      if (result.status === 200) {
        // console.log(result['data']['data'])
        setWork(result["data"]);
        // setWork({BlockID:result['data']['data']['BlockID'],FromUser:result['data']['data']['From User'],Hash:result['data']['data']['Hash'],ID:result['data']['data']['ID'],Methods:result['data']['data']['Methods'],TimeStamp:result['data']['data']['Timestamp'],Touser:result['data']['data']['To User'],value:result['data']['data']['value']});
      }
    } catch (e) {
      console.log("error: ", e);
    }
  };
  const onPutcmt = async () => {
    const fdata = new FormData();
    fdata.append("detail", cmt);
    fdata.append("bookid", idBook);
    try {
      const rs = await putcmtAPI(fdata);
      if (rs.status === 200) {
        enqueueSnackbar("Sucessfully", { variant: "success" });
        getComment();
      }
    } catch (error) {}
  };
  const onDelete = async (id) => {
    try {
      const rs = await onDeleteAPI(id);
      enqueueSnackbar("Sucessfully", { variant: "success" });
      getComment();
    } catch (error) {}
  };
  const onLike = async (id) => {
    localStorage.setItem("idcomment", id);
    try {
      const rs = await onLikeAPI(id);
      enqueueSnackbar("Sucessfully", { variant: "success" });
      getComment();
    } catch (error) {}
  };
  return (
    <Container>
      <Header />
      <div className="ctn-book">
        <Menu />
        <div className="main-ctn">
          <Alert variant="success">
            <img src={url} alt="logo" className="imageBook" />
            <Button
              id="wallet"
              variant="light"
              onClick={() => copyToClipboard(a)}
              value={infoBook.BookId}
            >
              {infoBook.BookId}
              <p id="helpText">Click to copy Clipboard</p>
            </Button>
            <Alert.Heading style={{ "font-weight": "Bold", color: "Black" }}>
              {infoBook.Name}
            </Alert.Heading>
            <Alert.Heading style={{ "font-style": "italic" }}>
              Quốc Gia:{t(infoBook.Country)}
            </Alert.Heading>
            <p>{infoBook.Details}</p>
            <hr />
            <Alert.Heading>
              {infoBook.Nhaxuatban} {infoBook.Ngayxuatban}
            </Alert.Heading>

            <Alert.Heading>Thể Loại: {t(infoBook.Type)}</Alert.Heading>
           
          </Alert>
          <div className="all-comment">
            <h1>Trao đổi</h1>
            {comment.map((row) => (
              <Alert.Heading>
                <div className="detail-cmt">
                  <p>{row.username}</p>
                  {" : "}
                  {row.detail}
                  {username == row.username ? (
                    <Button variant="outline" onClick={() => onDelete(row._id)}>
                      <DeleteForeverIcon />
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => onLike(row._id)}>
                      <ThumbUpAltIcon />
                      {row.point}
                    </Button>
                  )}
                </div>
                <p
                  style={{
                    color: "green",
                    fontSize: "13px",
                    fontStyle: "italic",
                  }}
                >
                  {row.time}
                </p>
              </Alert.Heading>
            ))}
          </div>
          <hr />
          <div className="comment">
            <div className="comment-main">
              <TextField
                fullWidth
                label="Put Your Every You Think That It ..."
                id="fullWidth"
                onChange={onValueChange}
              />
              <Button variant="outlined" onClick={onPutcmt}>
                <SendTimeExtensionIcon />
              </Button>
            </div>
          </div>
          <div className="work">
            <h1>Hoạt động</h1>
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
                        Username
                      </TableCell>
                      <TableCell
                        align="center"
                        className="th"
                        style={{ fontWeight: "bold" }}
                      >
                        Value
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
                        {row.methods == 'sell'?(
                          <TableCell align="left" style={{backgroundColor:'red',color:'white',fontWeight:'bold'}}>{row.methods.toUpperCase()}</TableCell>
                        ):(
                          <TableCell align="left" style={{backgroundColor:'green',color:'white',fontWeight:'bold'}}>{row.methods.toUpperCase()}</TableCell>
                        )}

                        <TableCell align="left" style={{ color: "green" }}>
                          {row.timestamp}
                        </TableCell>
                        <TableCell align="left">
                          {row.username}
                        </TableCell>
                        <TableCell align="left">{row.value}</TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}
export const Container = styled.div`
  .ctn-book {
    display: flex;
    .detail-cmt {
      display: flex;
      p {
        color: blue;
        text-transform: uppercase;
      }
      button {
        position: absolute;
        right: 0px;
      }
    }
    .main-ctn {
      padding-top: 5rem;
      margin-left: 5rem;
      .comment-main {
        display: flex;
        padding: 10px;
      }
      .imageBook {
        height: 300px;
        width: 300px;
      }
    }
  }
`;
