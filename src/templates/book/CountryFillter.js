import styled from "@emotion/styled";
import { Menu } from "../components/Menu";
import React from "react";
import { Header } from "../components/Header";
import Card from "react-bootstrap/Card";
import { useTranslation } from "react-i18next";
import { createBrowserHistory } from "history";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { postAPI } from "../service/api";
import { Link } from "react-router-dom";

const Fillter = (value) => {
  return postAPI("/book/country/" + value);
};
export const CountryFillter = () => {
  let { country } = useParams();
  const [infoBook, setInfoBook] = React.useState([]);
  const { t } = useTranslation();

  const history = createBrowserHistory({
    forceRefresh: true,
  });

  React.useEffect(() => {
    const FillterType = async () => {
      try {
        const rs = await Fillter(country);
        if (rs.status === 200) {
          setInfoBook(rs.data);
          console.log(rs.data);
        }
      } catch (error) {}
    };
    FillterType();
  }, []);
  return (
    <Wrapper>
      <Header />
      
      <div className="content">
        <Menu />
        <div className="main-ctn">
        <center><h1>Hiển thị sách theo quốc gia</h1></center>
          {infoBook.map((row) => (
            <Card bg="light">
              <Card.Img variant="top" src={row.timestamp} />
              <Card.Body id="bodycard">
                <Card.Title>
                  <Link
                    onClick={() => history.push("/book/profile/" + row._id)}
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
                  {"User: "}
                  {row.username}
                </Card.Text>
                <Button variant="primary">Chi tiết</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};
export const Wrapper = styled.div`
  .content {
    position: absolute;
    background-image: url("https://res.cloudinary.com/dwweabf16/image/upload/v1667616732/bg-1_u6t13w.png");
    min-height: 1200px;
    width: 100%;
    display: flex;
  }
`;
