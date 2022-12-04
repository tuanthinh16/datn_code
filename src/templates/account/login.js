import React, { Component, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import {useSnackbar} from 'notistack';

import { createBrowserHistory } from 'history';

import '../css/login.css';
import logo from '../images/logo.png';

import axios from 'axios';
import {postAPI} from '../service/api.js';

const onLoginAPI= (data)=>{
  return postAPI("/login",data)
}

export default function Login(){
  const {enqueueSnackbar} = useSnackbar();
  const [data,setData] = useState({username: '', password: ''})
  const token = localStorage.getItem("token");

  const history = createBrowserHistory({
      forceRefresh: true
  });
  // get value
  const onValueChange_Username =(event)=>{
    setData(prev =>({...prev, username:event.target.value}));
  }
  const onValueChange_Password =(event)=>{
    setData(prev =>({...prev, password:event.target.value}));
  }


  
  // api login
  const onLogin = async ()=>{
    const formData = new FormData();
    formData.append('username',data.username);
    formData.append('password',data.password);
    try{
      const rs = await onLoginAPI(formData);
      console.log(rs);
      enqueueSnackbar("Sucessfully",{variant:'success'});
      // if(rs)
      localStorage.setItem('token',rs.data['token']);
      // console.log(parseJwt(rs.data['token']));
      // console.log(rs.data['token']);
      history.push("/");
    }catch(e){
      console.log(e.message);
      enqueueSnackbar("Login Fail. Try Again !!",{variant:'error'});
    }
  }

    return (
        <MDBContainer className="my-5 gradient-form">

      <MDBRow>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src={logo}
                style={{width: '185px'}} alt="logo" onClick={()=>history.push('/')}/>
              <h4 className="mt-1 mb-5 pb-1">Chúng Tôi Là Diễn Đàn PENGUIN</h4>
            </div>

            <p>Vui lòng đăng nhập tài khoản của bạn</p>


            <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' onChange={onValueChange_Username}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'onChange={onValueChange_Password}/>


            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={onLogin}>Sign in</MDBBtn>
              <a className="text-muted" href="#!">Quên mật khẩu?</a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Chưa có tài khoản?</p>
              <MDBBtn outline className='mx-2' color='danger'onClick={()=>history.push('/register')}>
                Tạo Mới
              </MDBBtn>
            </div>

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h2 class="mb-4-1">Diễn Đàn Trao Đổi Và Giao Dịch Sách</h2>
              <p class="small mb-0">Nhằm mang lại trải nghiệm thú vị và tiện ích nhất cho người dùng, đặc biệt là những người đam mê sách. Trang web mang đến sự tiện lợi và nhiều tính năng ưu việt, từ đó kết nối mọi người để tạo nên một cộng đồng vững mạnh và nguồn sách phong phú mỗi ngày. Sự hiện diện của bạn chính là động lực để chúng tôi ngày càng phát triển hiện đại và vững mạnh hơn.
              </p>
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    );
}