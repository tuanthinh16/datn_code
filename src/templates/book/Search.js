import styled from "@emotion/styled";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from "react";
import { useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { getAPI } from "../service/api";
import { createBrowserHistory } from "history";
import { Link } from "@mui/material";
import { useTranslation } from "react-i18next";

const searchAPI = (data) => {
  return getAPI("/search/" + data);
};
const Search = () => {
  const { t } = useTranslation();
  const history = createBrowserHistory({
    forceRefresh: true,
  });
  const { value } = useParams();
  const [resultaccout,setResultaccount] = React.useState([]);
  const [resultbook,setResultbook] = React.useState([]);
  const onSearch = async () => {
    try {
      const rs = await searchAPI(value);
      if (rs.status === 200) {
        console.log(rs.data);
        setResultaccount(rs.data['account']);
        setResultbook(rs.data['book']);
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    onSearch();
    document.title = "Search";
  }, []);
  return (
    <Wrapper>
      <Header />
      <div className="search-container">
        <Menu />
        <div className="main-container-search">
          <div className="main-content">
            <h1>Search Result</h1>
          {resultaccout.map((row)=>(
            <Card sx={{ minWidth: 555 }}>
            <CardContent>
              <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
              <Button variant="link" onClick={()=>history.push('/user-profile/'+row.username)}>{row.username}</Button>
              </Typography>
              <Typography variant="h5" component="div">
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {'"'}{row.timecreated}{' "'}
              </Typography>
              <Typography variant="body2">
                {''}
                {row.fname}
                <br />
                {row.email}
               
              </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
          ))}
          {resultbook.map((row)=>(
            <Card sx={{ minWidth: 555 }}>
            <CardContent>
              <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                <Button variant="link" onClick={()=>history.push('/book/profile/'+row._id)}>{row.name}</Button>
              </Typography>
              <Typography variant="h5" component="div">
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {'"'}
                {row.detail.substring(0,250)}{' "'}
              </Typography>
              <Typography variant="body2">
                {''}
                {t(row.type)}{" --- "} {row.nxb}
                <br />
               
              </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
          ))}
          </div>
        </div>
        <Footer />
      </div>
    </Wrapper>
  );
};

export default Search;
export const Wrapper = styled.div`
  .search-container {
    position: absolute;
    background-image: url("https://res.cloudinary.com/dwweabf16/image/upload/v1667616732/bg-1_u6t13w.png");
    min-height: 1000px;
    width: 100%;
    .main-container-search {
      display: flex;
      margin-top: 5rem;
      min-height: 700px;
    }
  }
`;
