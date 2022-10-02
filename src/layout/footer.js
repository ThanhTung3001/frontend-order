import { Button, TextField, Divider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { URL_BACKEND } from "../constants";
import "./style.css";

export const Footer = () => {
  const [emailSubmit, setEmailSubmit] = useState("");
  const [companyInfo, setCompanyInfo] = useState([]);
  const onSubmitEmailSend = () => {
    if (emailSubmit == null) {
      toast("Email không đúng định dạng");
    } else {
      let dataSend = {
        data: {
          email: emailSubmit,
        },
      };
      axios.post(URL_BACKEND + "/api/emaill-submits", dataSend).then((rs) => {
        if (rs.status != 200) {
          //  alert("Gửi thông tin thất bại");
          toast("Email không đúng định dạng");
        } else {
          toast("Gửi thông tin thành công");
        }
      });
    }
  };
  useEffect(() => {
    axios.get(URL_BACKEND + `/api/info-companies?populate=*`).then((rs) => {
      let { data } = rs;
      if (data.data.length > 0) {
        setCompanyInfo(data.data);
        // console.log(data.data);
      }
      //setBlog(data.data);
    });
  }, []);
  if (companyInfo.length > 0) {
    return (
      <>
        <div className="container-fluid">
          <div className="row block-top">
            <div className="row d-flex justify-content-between mb-2">
              <div className="col-sm-6">
                <h5>Đăng ký nhận thêm thông tin Các ưu đãi riêng biệt</h5>
              </div>
              <div className="col-sm-6 d-flex justify-content-end">
                <div className="col-sm-6">
                  <TextField
                    fullWidth
                    onChange={(e) => setEmailSubmit(e.target.value)}
                    placeholder="Nhập email của bạn"
                    style={{ marginRight: 20 }}
                  />
                </div>
                <div className="col-sm-2 d-flex jusitfy-content-end">
                  <Button
                    className="ml-5"
                    variant="contained"
                    onClick={onSubmitEmailSend}
                  >
                    Gửi
                  </Button>
                </div>
              </div>
            </div>
            <Divider />
            <div className="row mt-2 footer">
              <div className="col-sm-3 ">
                <img src="logo_color.png" />
                <div className="row mt-2 mb-2">
                  <div className="col">{companyInfo[0].attributes.Slogan}</div>
                </div>
                <Divider light />
                <div className="row mt-2">
                  <h4>{companyInfo[0].attributes.name}</h4>
                  <p>Địa chỉ: {companyInfo[0].attributes.address}</p>
                  <p>Email: {companyInfo[0].attributes.email} </p>
                  <p>Sđt: {companyInfo[0].attributes.phone}</p>
                </div>
              </div>
              <div className="col-sm-3">
                <h6>Chính sách bảo mật</h6>
                <h6>Thông tin chuyển khoản</h6>
                <h6>Hướng dẫn đặt hàng</h6>
              </div>
              <div className="col-sm-3">
                <h6>Chính sách đổi trả</h6>
                <h6>Câu hỏi thường gặp</h6>
                <h6>Điều khoản sử dụng</h6>
              </div>
              <div className="col-sm-3">
                <h6>Phí & khu vực giao hàng</h6>
                <h6>Bảng tin công ty</h6>
                <h6>Điều khoản sử dụng</h6>
              </div>
            </div>
            <div className="row"></div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};
