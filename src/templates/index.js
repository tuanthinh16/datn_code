import styled from "@emotion/styled";
import React from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";

export const Index = () => {
  return (
    <Wrapper>
      <Header />
      <div className="homeindex">
        <Menu />
        <div className="content">Traffic Book Transfer</div>
      </div>
      <Footer />
    </Wrapper>
  );
};
export const Wrapper = styled.div`
  .container {
    display: flex;
  }
`;
