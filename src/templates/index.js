import styled from "@emotion/styled";
import React from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { postAPI } from "./service/api";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  Link,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { createBrowserHistory } from "history";
import { Button } from "react-bootstrap";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";

const postnew = [
  {
    id: 0,
    name: 'Sách đạt giải của Hội Nhà văn bị tố "đạo văn", Viện Văn học lên tiếng',
    detail:
      "Liên quan đến ồn ào về sách được giải của Hội Nhà văn bị tố vi phạm quyền tác giả, theo thông tin của Báo Giao thông, Viện Văn học đã có văn bản trả lời TS. Đỗ Hải Ninh.\
            Văn bản do Viện trưởng Nguyễn Đăng Điệp ký cho biết, ngày 21/1 và 21/2/2022, Viện nhận được đơn đề nghị “về việc giải quyết vi phạm bản quyền trong nghiên cứu khoa học” của TS Đỗ Hải Ninh liên quan đến đề tài khoa học “Tự truyện và tiểu thuyết Việt Nam đương đại sau 1986 nhìn từ phê bình phân tâm học” do TS Vũ Thị Trang chủ nhiệm, thực hiện trong thời gian từ 2017 đến 2019.",
    image:
      "https://cdn.baogiaothong.vn/upload/images/2022-4/article_img/2022-11-10/img-bgt-2021-9-1668068467-width700height1069.jpg",
    link: "https://www.baogiaothong.vn/sach-dat-giai-cua-hoi-nha-van-bi-to-dao-van-vien-van-hoc-len-tieng-d572280.html",
  },
  {
    id: 1,
    name: 'Nhà văn Lê Lựu - một "Thời xa vắng" khốn khổ đã vĩnh viễn trôi đi',
    detail:
      "Cây bút tiên phong\
      Nhà văn Lê Lựu đã ra đi mãi mãi ở tuổi 81 vào ngày 9/11. Gần 60 năm miệt mài với nghiệp viết, Lê Lựu đã đóng góp cho nền văn chương nước nhà 15 tác phẩm - con số không nhiều, nhưng những trang văn của ông lại gắn liền với sự thay đổi của thời đại.",
    image:
      "https://cdn.baogiaothong.vn/upload/images/2022-4/article_img/2022-11-10/img-bgt-2021-le-lu-u1-1668050902-width1024height827.jpeg",
    link: "https://www.baogiaothong.vn/nha-van-le-luu-mot-thoi-xa-vang-khon-kho-da-vinh-vien-troi-di-d572252.html",
  },
  {
    id: 2,
    name: "Vì sao văn học Việt chưa đủ sức dự giải Nobel?",
    detail:
      "Việc chọn ra một tác phẩm khiến những người trong giới ở trong nước đều phải “ngả mũ” đã khó, nên dự giải Nobel là chưa đủ sức.\
      Tin tức trong ngày hôm nay\
      Theo nhà thơ Nguyễn Quang Thiều, Chủ tịch Hội Nhà văn Việt Nam, việc chọn ra một tác phẩm khiến những người trong giới ở trong nước đều phải “ngả mũ” đã khó, nên dự giải Nobel là chưa đủ sức. Tuy nhiên, điều đó không khiến chúng ta bi quan.",
    image:
      "https://cdn.baogiaothong.vn/upload/images/2022-3/article_img/2022-09-02/img-bgt-2021-hoi-nghi-1662110297-width1280height758.jpeg",
    link: "https://www.baogiaothong.vn/vi-sao-van-hoc-viet-chua-du-suc-du-giai-nobel-d564547.html",
  },
];

const getAllbooks = () => {
  return postAPI("/book/getall");
};
const getAllblock = () => {
  return postAPI("/block/getall");
};
const getTotalBooks = () => {
  return postAPI("/book/gettotal");
};
const getTotalWallets = () => {
  return postAPI("/wallet/gettotal");
};
const getTotalBlocks = () => {
  return postAPI("/block/gettotal");
};
export const Index = () => {

  const { t } = useTranslation();
  const history = createBrowserHistory({
    forceRefresh: true,
  });
  const [book, setBook] = React.useState([]);
  const [block, setBlock] = React.useState([]);
  const [totalbook, setTotalBook] = React.useState();
  const [totalblock, setTotalBlock] = React.useState();
  const [totalwallet, setTotalWallet] = React.useState();

  const getAllbook = async () => {
    try {
      const rs = await getAllbooks();
      if (rs.status === 200) {
        setBook(rs.data);
        console.log(rs.data);
      }
    } catch (error) {}
  };
  const getAllBlock =async()=>{
    try {
      const rs = await getAllblock();
      if(rs.status === 200){
        setBlock(rs.data);
      }
    } catch (error) {
      
    }
  }
  const getTotalWallet = async () => {
    try {
      const rs = await getTotalWallets();
      if (rs.status === 200) {
        setTotalWallet(rs.data);
      }
    } catch (error) {}
  };
  const getTotalBook = async () => {
    try {
      const rs = await getTotalBooks();
      if (rs.status === 200) {
        setTotalBook(rs.data);
      }
    } catch (error) {}
  };
  const getTotalBlock = async () => {
    try {
      const rs = await getTotalBlocks();
      if (rs.status === 200) {
        setTotalBlock(rs.data);
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    document.title = "Home Page";
    getTotalBook();
    getAllBlock();
    getAllbook();
    getTotalBlock();
    getTotalWallet();
  }, []);
  const col = [
    {field:'_id',headerName:"Block ID",width:90},
    {field:'prehash',headerName:"Pre-Hash",width:300},
    {field:'data',headerName:"Data",width:310},
    {field:'timestamp',headerName:"Time Stamp",width:200},
    {field:'hash',headerName:"Hash",width:300},
  ]
  const colum =[
    {field:'_id',headerName:"Mã Sách",width:100},
    {field:'name',headerName:"Tên Sách",width:400},
    {field:'nxb',headerName:"NXB",width:200},
    {field:'type',headerName:"Thể Loại",width:150},
    {field:'sl',headerName:"Số lượng",width:50},
    {field:'country',headerName:"Quốc Gia",width:200}
  ]
  const actionColumns =[
    {field:'action',
    headerName:'Action',
    width:70,
    renderCell:(params)=>{
      return(
        <div className="view">
          <Button onClick={()=>history.push('/book/profile/'+params.row._id)}>View</Button>
        </div>
      )
    }
    }
  ]
  return (
    <Wrapper>
      <Header />
      <div className="homeindex">
        <Menu />
        <div className="content">
          <h1>Bảng tin</h1>
          <p style={{ opacity: "0.8" }}>Bảng tin/Giao dịch</p>
          <div className="dashboard">
            <div className="total-books">
              <h3>Tổng số sách</h3>
              <h3> {totalbook}</h3>
              <h7>
                100% <ArrowDropUpOutlinedIcon />
                So với tuần trước
              </h7>
            </div>
            <div className="total-wallet">
              <h3>Tổng ví người dùng</h3>
              <h3> {totalwallet}</h3>
              <h7>
                50% <ArrowDropUpOutlinedIcon />
                So với tuần trước
              </h7>
            </div>
            <div className="total-block">
              <h3>Tổng giao dịch</h3>
              <h3> {totalblock}</h3>
              <h7>
                80% <ArrowDropUpOutlinedIcon />
                So với tuần trước
              </h7>
            </div>
          </div>
          <div className="main-detail">
            <div className="list-book">
              <h1> Sách</h1>
              <p style={{ opacity: "0.8" }}>Thống kê sách có trên hệ thống</p>
              <div style={{ height: 400, width: '100%' ,backgroundColor:'white',padding:'10px'}}>
                <DataGrid
                  rows={book}
                  columns={colum.concat(actionColumns)}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={(row) => row._id}
                  
                />
              </div>
              <h1> Block</h1>
              <p style={{ opacity: "0.8" }}>Thống kê các khối giao dịch  có trên hệ thống</p>
              <div style={{ height: 400, width: '100%' ,backgroundColor:'white',padding:'10px'}}>
                <DataGrid
                  rows={block}
                  columns={col}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={(row) => row._id}
                />
              </div>
              {/* <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="lg"
              >
                <InfoBuy />
              </Dialog> */}
            </div>
            <div className="news">
              <h1>Tin tức</h1>
              <p style={{ opacity: "0.8" }}>Tin tức/Mới nhất</p>
              <div className="main-content">
                {postnew.map((row) => (
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={row.image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {row.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {row.detail.substring(0, 230)}
                        {"..."}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link target="_blank" href={row.link}>
                        Chi tiết
                      </Link>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
};
export const Wrapper = styled.div`
  .list-book {
    padding: 10px;
  }
  .news {
    display: contents;
    margin: 10px;
    .MuiCard-root {
      min-width: 20rem;
      min-height: 20rem;
      margin-right: 10px;
    }
    .main-content {
      display: flex;
      padding: 10px;
    }
  }
  .dashboard {
    background-color: #0d6efd;
    display: flex;
    padding: 20px;
    margin: 10px;
    h3 {
      color: white;
      font-weight: bold;
    }
    h7 {
      color: white;
      font-style: italic;
    }
    .total-books {
      min-width: 25rem;
    }
    .total-wallet {
      min-width: 25rem;
    }
    .total-block {
      min-width: 25rem;
    }
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
const getInfoBookSell = (id) => {
  return postAPI("/get-booksell-bookid/" + id);
};
const onBuyAPI = (id) => {
  return postAPI("/book/buy/" + id);
};
const valueConvert = 24345;

export const InfoBuy = () => {
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
    username = "";
    console.error("Invalid token: " + token);
  }
  const { enqueueSnackbar } = useSnackbar();
  let id = localStorage.getItem("selectedBookId");
  const [infoBook, setInfoBook] = React.useState([]);
  const history = createBrowserHistory({
    forceRefresh: true,
  });
  const getInfoBook = async () => {
    try {
      const rs = await getInfoBookSell(id);
      if (rs.status === 200) {
        setInfoBook(rs["data"]);
        console.log(rs.data);

      }
      
    } catch (error) {}
  };
  const onBuy = async(id) => {
    try {
      const rs = await onBuyAPI(id);
      if (rs.status === 200) {
        console.log(rs.data);
        enqueueSnackbar("Sucessfully", { variant: "success" });
        history.push("/profile/" + username);
      }
      else{
        enqueueSnackbar("Dont Enough Money To Buy", { variant: "error" });
        history.push('/wallet/'+username)
      }
    } catch (error) {}
  };
  React.useEffect(() => {
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
            {"Khả dụng: "}
            {infoBook.amount}
          </h3>
          {infoBook.username == username ? (
            <Button>
              {"Sách của bạn"}{" "}
              {(parseInt(infoBook.price) / valueConvert).toFixed(3)}
              {"$"}
            </Button>
          ) : (
            <Button onClick={() => onBuy(infoBook._id)}>
              {"Mua với "}{" "}
              {(parseInt(infoBook.price) / valueConvert).toFixed(3)}
              {"$"}
            </Button>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
