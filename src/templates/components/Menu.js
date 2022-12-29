import React, { Component, useState, useEffect } from "react";

import "../css/index2.css";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Trans, useTranslation, Translation } from "react-i18next";
import i18n from "../../translation/i18n";
import Toast from "react-bootstrap/Toast";
import { createBrowserHistory } from "history";

export const Menu = () => {
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
  return (
    <div className="menu">
      <div className="menucontent">
        <Nav defaultActiveKey="/" className="flex-column">
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={t("menu.language")}
            menuVariant="light"
          >
            <NavDropdown.Item onClick={() => i18n.changeLanguage("vi")}>
              {t("menu.lan-vi")}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => i18n.changeLanguage("en")}>
              {t("menu.lan-en")}
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/book/add-book">{t("menu.create")}</Nav.Link>
          {/* <Nav.Link href="#">{t('menu.sell')}</Nav.Link> */}
          {/* <Nav.Link href="#">{t("menu.give")}</Nav.Link> */}

          {/* type */}
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={t("menu.categories")}
            menuVariant="dark"
          >
            
            <NavDropdown.Item
              href="/book/type/cate-business"
              className="item"
            >
              {t("menu.categories-business")}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              href="/book/type/cate-computer"
              className="item"
            >
              {t("menu.categories-computer")}
            </NavDropdown.Item>
            
            <NavDropdown.Divider />
            <NavDropdown.Item
              href="/book/type/menu.categories-other"
              className="item"
            >
              {t("menu.categories-other")}
            </NavDropdown.Item>
          </NavDropdown>

          {/* country */}
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={t("menu.country")}
            menuVariant="dark"
          >
            <NavDropdown.Item href="/book/country/country-vn">
              {t("menu.lan-vi")}
            </NavDropdown.Item>
            <NavDropdown.Item href="/book/country/country-france">
              {t("menu.country-france")}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/book/country/ountry-other">
              {t("menu.categories-other")}
            </NavDropdown.Item>
          </NavDropdown>
          {/* wallet */}
          <Nav.Link onClick={() => history.push("/wallet/" + username)}>
            {t("menu.wallet")}
          </Nav.Link>
        </Nav>
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <strong className="me-auto">ADMIN</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{t("header.noti")}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};
