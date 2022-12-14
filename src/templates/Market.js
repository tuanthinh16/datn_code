import React, { useState, useEffect } from "react";

import "./css/index2.css";
import { useTranslation } from "react-i18next";
import { createBrowserHistory } from "history";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getAPI, postAPI } from "./service/api";

import { Menu } from "./components/Menu";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { ButtonGroup, TextField } from "@mui/material";
import { useSnackbar } from "notistack";

const getBookAPI = () => {
  return getAPI("/book/get-book-sell");
};
const getInfoBookSell = (id) => {
  return postAPI("/book/get-booksell-by-id/" + id);
};
const onBuyAPI = (data) => {
  return postAPI("/book/buy",data);
};

function Home() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    localStorage.setItem("selectedId", id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  let username = "";
  const history = createBrowserHistory({
    forceRefresh: true,
  });
  //show toast
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  //get username from token
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
    username = "";
    console.error("Invalid token: " + token);
  }
  // console.log(username);

  const [infoBook, setInfoBook] = useState([]);
  useEffect(() => {
    document.title = "Market"
    const getInfoBook = async () => {
      try {
        const rs = await getBookAPI();
        if (rs.status === 200) {
          setInfoBook(rs["data"]);
          console.log(rs["data"]);
        }
      } catch (error) {}
    };
    getInfoBook();
  }, []);
  return (
    <Wrapper>
      <Header />
      <div className="homeindex">
        <Menu />
        <div className="content">
          {infoBook.map((row) => (
            <Card bg="light">
              <Card.Img variant="top" src={row.url} />
              <Card.Body id="bodycard">
                <Card.Title>
                  {" "}
                  <Link
                    onClick={() => history.push("/book/profile/" + row.bookid)}
                  >
                    {row.name}
                  </Link>
                </Card.Title>
                <Card.Text id="detail-name">
                  {row.detail.substring(0, 350)}
                  {"..."}
                </Card.Text>
                <Card.Text>
                  {"NXB: "}
                  {row.nxb}
                </Card.Text>
                <Card.Text>
                  {" Country:"}
                  {t(row.country)}
                </Card.Text>
                <Card.Text>
                  {"SL: "}
                  {row.amount} {"Pirce: "}
                  {row.price}
                  {" VND"}
                </Card.Text>
                <Card.Text>
                  {row.username === username ? (
                    <i>C???a b???n</i>
                  ) : (
                    "user: " + row.username
                  )}
                </Card.Text>
                {username === row.username ? (
                  " "
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => handleClickOpen(row._id)}
                  >
                    Chi ti???t
                  </Button>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="lg"
        >
          <Detailbook />
        </Dialog>
      </div>
      <Footer />
    </Wrapper>
  );
}

export default Home;
export const Wrapper = styled.div`
  .container-index {
    max-height: fit-content;
  }
  .container {
    display: flex;
    padding: 10px;
    img {
      max-width: 10rem;
      max-height: 15rem;
      margin: 1rem 3rem 1rem 0.5rem;
    }
  }
`;
const valueConvert = 24345;
export const Detailbook = () => {
  let username = "";
  const token = localStorage.getItem("token");
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
  const history = createBrowserHistory({
    forceRefresh: true,
  });

  const { enqueueSnackbar } = useSnackbar();
  let id = localStorage.getItem("selectedId");
  const [infoBook, setInfoBook] = useState([]);
  const [amount,setAmount] = useState(0);
  const onValueChange = (event) => {
    setAmount(event.target.value);
  }
  const onBuy = async (id) => {
    try {
      const data = new FormData();
      data.append("id",id)
      data.append('amount',amount)
      const rs = await onBuyAPI(data);
      if (rs.status === 200) {
        getInfoBook();
        enqueueSnackbar("Sucessfully", { variant: "success" });
      }
      else {
        enqueueSnackbar("Kh??ng ????? ti???n", { variant: "error" });
        history.push('/wallet/'+username)
      }
    } catch (error) {}
  };
  const getInfoBook = async () => {
    try {
      const rs = await getInfoBookSell(id);
      if (rs.status === 200) {
        setInfoBook(rs["data"]);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getInfoBook();
  }, []);
  return (
    <Wrapper>
      <div className="container">
        <img src={infoBook.url} alt="img"></img>
        <div className="content-detail">
          <h1>{infoBook.name}</h1>
          <p>{infoBook.detail}</p>
          <h3>
            {"Kh??? d???ng: "}
            {infoBook.amount}
          </h3>
          <div className="amount-buy">
              <TextField
              id="outlined-number"
              label="S??? l?????ng mua"
              type="number"
              onChange={onValueChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
            {parseInt(infoBook.amount) >= amount ?(
              <Button onClick={() => onBuy(infoBook._id)}>
              {"Mua v???i "}{" "}
              {((parseInt(infoBook.price) / valueConvert)/infoBook.amount *amount).toFixed(3)}
              {"$"}
            </Button>
            ):(<Button variant='disable'>
            {"Mua v???i "}{" "}
            {(parseInt(infoBook.price) / valueConvert).toFixed(3)}
            {"$"}
          </Button>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
