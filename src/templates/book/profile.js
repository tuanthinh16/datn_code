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
import { TextField } from "@mui/material";
import { Footer } from "../components/Footer";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import { useSnackbar } from "notistack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

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
              Country:{t(infoBook.Country)}
            </Alert.Heading>
            <p>{infoBook.Details}</p>
            <hr />
            <Alert.Heading>
              {infoBook.Nhaxuatban} {infoBook.Ngayxuatban}
            </Alert.Heading>

            <Alert.Heading>Type: {t(infoBook.Type)}</Alert.Heading>
            <p className="mb-0">Amount {infoBook.Soluong} </p>
          </Alert>
          <div className="all-comment">
            <h1>All Comment From User</h1>
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
