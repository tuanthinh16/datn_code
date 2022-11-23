import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useTranslation } from "react-i18next";
import { createBrowserHistory } from "history";

import Alert from "react-bootstrap/Alert";
import useClipboard from "react-hook-clipboard";
import { getAPI } from "../service/api";
import "../css/profile.css";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";

const getbookAPI = (idBook) => {
  return getAPI("/book/profile/" + idBook);
};
export default function BProfile() {
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
  const [clipboard, copyToClipboard] = useClipboard();
  let a = "abc";
  useEffect(() => {
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
    getInfoBook();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container-book">
      <Header />
      <Menu />
      <Container>
        <div className="contentBook">
          <Row>
            <Col>
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
                <Alert.Heading
                  style={{ "font-weight": "Bold", color: "Black" }}
                >
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
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
