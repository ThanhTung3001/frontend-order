import style from "./index.module.css";
import Button from '@mui/material/Button'
import { useEffect, useState } from "react";
import InfoDetail from "./InfoDetail";
import HistoryTransaction from "./HistoryTransaction";
import ChangePassword from "./ChangePassword";
import { URL_BACKEND } from '../../constants/index';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from "../../app/reducer/UserSlice";
function ManageUser() {
  const [ChangeBtn,SetChangeBtn] = useState(true);
  const [ItemToogle, SetItemToogle] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleChangeBtn = ()=>{
    if(ChangeBtn){
      SetChangeBtn(false)
    }
    else{
      SetChangeBtn(true)
    }
  }
  const HandleToogle = (index)=>{
     SetItemToogle(index)
  }
  if(ItemToogle == 1){
    return (
     
        <div className="full-width1">
          <div className="container">
            <div
              className="row justify-content-center"
            >
              <div className="col-xl-3 col-11 justify-content-center text-center">
                <div className={style.ContainerCardInfo}>
                  <div className={style.ContainerBlockInfo}>
                    <img
                      className={style.CardImage}
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      alt=""
                    />
                    <span className={style.TitleCard}>{JSON.parse(localStorage.getItem('UserInfo')).user.username}</span>
                  </div>
                  <div>
                    <ul className={style.ListMenu}>
                      <li onClick={()=>{HandleToogle(1)}} className={`${style.ItemCard} ${(ItemToogle === 1) ? `${style.active}` : ``}`}>Thông tin cá nhân</li>
                      <li onClick={()=>{HandleToogle(2)}} className={`${style.ItemCard} ${(ItemToogle === 2) ? `${style.active}` : ``}`}>Lịch sử giao dịch</li>
                      <li onClick={()=>{HandleToogle(3)}} className={`${style.ItemCard} ${(ItemToogle === 3) ? `${style.active}` : ``}`}>Đăng Xuất</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-11 justify-content-center text-center">
                <div className={style.ContainerInfoAccount}>
                  <div className={style.WrapperInfoAccount}>
                    <h1 className={style.TitleAccount}>Thông tin tài khoản</h1>
                    <div className={style.ContainerBtn}>
                     <Button onClick={()=>{HandleChangeBtn()}} variant="contained" color={ChangeBtn ? "error" : "warning"}>CHI TIẾT</Button>
                     <Button onClick={()=>{HandleChangeBtn()}} variant="contained" color={ChangeBtn ? "warning" : "error"}>ĐỔI MẬT KHẨU</Button>
                    </div>
                  </div>
                  {
                    ChangeBtn ? <InfoDetail/> : <ChangePassword/>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      
  );
  }
  else if(ItemToogle === 2){
    return(
      <div
        style={{ padding: "40px 0 40px 0", background: "#D9D9D9" }}
        className="row justify-content-center"
      >
        <div className="col-xl-3 col-11 justify-content-center text-center">
          <div className={style.ContainerCardInfo}>
            <div className={style.ContainerBlockInfo}>
              <img
                className={style.CardImage}
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <span className={style.TitleCard}>Tên người dùng</span>
            </div>
            <div>
              <ul className={style.ListMenu}>
                <li onClick={()=>{HandleToogle(1)}} className={`${style.ItemCard} ${(ItemToogle === 1) ? `${style.active}` : ``}`}>Thông tin cá nhân</li>
                <li onClick={()=>{HandleToogle(2)}} className={`${style.ItemCard} ${(ItemToogle === 2) ? `${style.active}` : ``}`}>Lịch sử giao dịch</li>
                <li onClick={()=>{HandleToogle(3)}} className={`${style.ItemCard} ${(ItemToogle === 3) ? `${style.active}` : ``}`}>Đăng Xuất</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-11 justify-content-center text-center">
           <HistoryTransaction/>
        </div>
      </div>
    )
  }
  else if(ItemToogle === 3){
     dispatch(logout());
     navigate('/login')
     window.location.reload();
  }
}

export default ManageUser;
