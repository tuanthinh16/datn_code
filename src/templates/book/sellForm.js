import React, { useEffect } from "react";
import logo from "../images/logo.png";
import "../css/sellform.css";
import Button from "react-bootstrap/Button";
import { postAPI, getAPI } from "../service/api";
import { Trans, useTranslation, Translation } from "react-i18next";
import { useSnackbar } from "notistack";
import { createBrowserHistory } from "history";

const sellAPI = (id, data) => {
  return postAPI("/book/sell-book/" + id, data);
};
const getbookAPI = (id) => {
  return getAPI("/book/profile/" + id);
};
export default function SellForm() {
  let id = localStorage.getItem("idbook");
  console.log("id get", id);
  const [infoBook, setInfoBook] = React.useState([]);
  const [url, setUrl] = React.useState("");
  const [data, setData] = React.useState({ price: "", amount: 0 });
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const history = createBrowserHistory({
    forceRefresh: true,
  });
  const onPriceChange = (e) => {
    setData((prev) => ({ ...prev, price: e.target.value }));
  };
  const onAmountChange = (e) => {
    setData((prev) => ({ ...prev, amount: e.target.value }));
  };
  useEffect(() => {
    const getInfoBook = async () => {
      try {
        const rs = await getbookAPI(id);
        if (rs.status === 200) {
          console.log(rs["data"]);
          setInfoBook(rs["data"]["data"]);
          setUrl(rs["data"]["url"]);
        }
      } catch (error) {}
    };
    getInfoBook();
  }, []);
  const onSell = async () => {
    try {
      const Fdata = new FormData();
      Fdata.append("amount", data.amount);
      Fdata.append("price", data.price);
      // console.log('amount',data.amount)
      const rs = await sellAPI(id, Fdata);
      if (rs.status === 200) {
        enqueueSnackbar("Sucessfully", { variant: "success" });
        history.push("/");
      }
    } catch (error) {
      enqueueSnackbar("Error", { variant: "error" });
    }
  };
  return (
    <div className="a">
      <div className="logo-book">
        <img src={url}></img>
      </div>
      <div className="content-sell">
        <p>{'Tên Sách: '}{infoBook.Name}</p>
        <p>{'Nhà Xuất Bản: '}{infoBook.Nhaxuatban}</p>
        <p>
          {"Thể Loại: "}
          {t(infoBook.Type)}
        </p>
        <div class="mb-3">
          <span>Giá </span>
          <input
            type="text"
            class="form-control"
            name="price"
            id="price"
            onChange={onPriceChange}
            aria-describedby="helpId"
            placeholder="VND"
          />
          <small id="helpId" class="form-text text-muted">
            Vui lòng nhập giá tiền
          </small>
        </div>
        <div class="mb-3">
          <span>Số Lượng </span>
          <input
            type="text"
            class="form-control"
            name="amount"
            id="amount"
            onChange={onAmountChange}
            aria-describedby="helpId"
            placeholder=""
          />
          {parseInt(data.amount) > parseInt(infoBook.Soluong) ? (
            <small id="helpId" class="form-text text-muted">
              Vui lòng nhập số lượng ít hơn {infoBook.Soluong} quyển
            </small>
          ) : (
            <small id="helpId" class="form-text text-muted">
              Vui lòng nhập số lượng bán
            </small>
          )}
        </div>
        {console.log(parseInt(infoBook.Soluong))}
        {parseInt(data.amount) > parseInt(infoBook.Soluong) ? (
          <Button type="submit" disable>
            Đặt
          </Button>
        ) : (
          <Button type="submit" onClick={onSell}>
            Đặt
          </Button>
        )}
      </div>
    </div>
  );
}
