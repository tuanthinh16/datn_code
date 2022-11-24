import styled from "@emotion/styled";
import React from "react";
import { useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { getAPI } from "../service/api";

const searchAPI = (data) => {
  return getAPI("/search/" + data);
};

const Search = () => {
  const { value } = useParams();
  const onSearch = async () => {
    try {
      const rs = await searchAPI(value);
      if (rs.status === 200) {
        console.log(rs.data);
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    onSearch();
  }, []);
  return (
    <Wrapper>
      <Header />
      <div className="search-container">
        <Menu />
        <div className="main-container-search">
          <h1>Search</h1>
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
