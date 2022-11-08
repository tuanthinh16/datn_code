import React from 'react'
import styled from 'styled-components'

export const Footer = () => {
  return (
    <Wrapper>
      <div className='container-footer'>
        <div className='f1'>
          <h1>About Us</h1>
          <hr/>
          <p>diễn đàn chúng tôi mang lại một sự trải nghiệm mới mẻ cho người dùngdiễn đàn chúng tôi mang lại một sự trải nghiệm mới mẻ cho người dùngdiễn đàn chúng tôi mang lại một sự trải nghiệm mới mẻ cho người dùngdiễn đàn chúng tôi mang lại một sự trải nghiệm mới mẻ cho người dùngdiễn đàn chúng tôi mang lại một sự trải nghiệm mới mẻ cho người dùngdiễn đàn chúng tôi mang lại một sự trải nghiệm mới mẻ cho người dùngdiễn đàn chúng tôi mang lại một sự trải nghiệm mới mẻ cho người dùngdiễn đàn chúng tôi mang lại một sự trải nghiệm mới mẻ cho người dùng</p>
        </div>
        <div className='f2'>
          <h1>Contact</h1>
          <hr/>
          <p>Email: tuanthinhdz@gmail.com</p>
          <p>Phone: 0335833737</p>
          <p>Address: 566 Núi Thành,Hòa Cường Nam, Hải Châu, Đà Nẵng</p>
        </div>
        <div className='f3'>
          <h1>Help</h1>
          <hr/>
          <p> Mọi vấn đề thắc mắc và góp ý hãy liên hệ với chung tôi tại <a href='#'>Trung tâm trợ giúp</a></p>
        </div>
      </div>
    </Wrapper>
  )
}
export const Wrapper = styled.div`
    .container-footer{
      display: flex;
      background-color: rgb(95, 112, 163);
      position: absolute;
      min-width: 100%;
      padding: 10px;
      .f1{
        min-width: 20rem;
        max-width: 35%;
        border-right: 1px solid black;
        padding: 20px;
      }
      .f2{
        min-width: 20rem;
        max-width: 35%;
        border-right: 1px solid black;
        padding: 20px;
      }
      }
      .f3{
        min-width: 20rem;
        max-width: 30%;
        /* border-right: 1px solid black; */
        padding: 20px;
        a{
          text-decoration: none;
          color:black;
        }
        a:hover{
          color:green;
        }
      }
    
`
