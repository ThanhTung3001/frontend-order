import style from "./index.module.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { URL_BACKEND } from "../../constants/index";
import axios from "axios";
function Contact() {
  const [NameCompany, SetNameComPany] = useState("");
  const [AddressCompany, SetAddressCompany] = useState("");
  const [PhoneNumberCompany, SetPhoneNumberCompany] = useState("");
  const [EmailCompany, SetEmailCompany] = useState("");
  const [Data, setData] = useState([]);
  const [img, setImg] = useState(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
  );
  useEffect(() => {
    axios.get(URL_BACKEND + `/api/info-companies?populate=*`).then((res) => {
      const Data = res.data;
      console.log(Data);
      if (Data.data.length > 0) {
        setImg(
          Data.data[0].attributes.QR != null
            ? `${URL_BACKEND}${Data.data[0].attributes.QR.data.attributes.url}`
            : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
        );
      }
      SetNameComPany(Data.data[0].attributes.name);
      SetAddressCompany(Data.data[0].attributes.address);
      SetPhoneNumberCompany(Data.data[0].attributes.phone);
      SetEmailCompany(Data.data[0].attributes.email);
    });
  }, []);
  return (
    <div className="full-width1">
      {" "}
      <div className="container">
        {" "}
        <h1 className={style.TextContactTitle}>Thông tin Liên hệ</h1>{" "}
        <div className="row block">
          <div className={`${style.WrapperInfoCompany} d-flex`}>
            {" "}
            <div className={`${style.ContainerImage}`}>
              <img className={`${style.ImageCompany}`} src={img} alt="" />
            </div>{" "}
            <div className={`${style.ContainerInfoCompany}`}>
              {" "}
              <h1 className={`${style.TextNameCompany}`}>{NameCompany}</h1>{" "}
              <div>
                {" "}
                <div>
                  {" "}
                  <span className={`${style.MenuContactItem}`}>
                    Địa chỉ:{" "}
                  </span>{" "}
                  <span className={`${style.MenuContactDetail}`}>
                    {AddressCompany}
                  </span>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <span className={`${style.MenuContactItem}`}>
                    Số điện thoại:{" "}
                  </span>
                  <span className={`${style.MenuContactDetail}`}>
                    {PhoneNumberCompany}
                  </span>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <span className={`${style.MenuContactItem}`}>Email: </span>
                  <span className={`${style.MenuContactDetail}`}>
                    {EmailCompany}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        </div>{" "}
        <h1 className={`${style.TextContactTitle}`}>Liên hệ với chúng tôi</h1>
        <div className="row block">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <TextField fullWidth placeholder="Họ tên" label="Họ tên *" />
            </div>
            <div className={`${style.reponsive} col-sm-12 col-md-6`}>
              <TextField fullWidth placeholder="Tiêu đề" label="Tiêu đề *" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="row">
                <div className="col-sm-12 mt-4">
                  <TextField
                    fullWidth
                    label="Số điện thoại: *"
                    placeholder="Số điện thoại: *"
                  />
                </div>
                <div className="col-sm-12 mt-4">
                  <TextField
                    fullWidth
                    label="Email: *"
                    placeholder="Email: *"
                  />
                </div>
                <div className="col-sm-12 mt-4">
                  <TextField
                    fullWidth
                    label="Địa chỉ:"
                    placeholder="Địa chỉ:"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="col-sm-12 mt-4">
                <TextField
                  label="Nội dung*"
                  fullWidth
                  placeholder="Nội dung"
                  multiline
                  rows={8}
                  maxRows={20}
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-4">
            <div className=".col-sm-12 d-flex justify-content-center">
              <Button variant="contained">Gửi thông tin</Button>
            </div>
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export { Contact };
