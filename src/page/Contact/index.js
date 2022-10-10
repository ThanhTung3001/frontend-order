import style from "./index.module.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { URL_BACKEND } from "../../constants/index";
import * as React from "react";
import axios from "axios";
import dayjs from "dayjs";
function Contact() {
  const [NameCompany, SetNameComPany] = useState("");
  const [AddressCompany, SetAddressCompany] = useState("");
  const [PhoneNumberCompany, SetPhoneNumberCompany] = useState("");
  const [EmailCompany, SetEmailCompany] = useState("");
  const [Data, setData] = useState([]);
  const [img, setImg] = useState("img_emty.png");
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [listType, setListType] = useState([]);
  const [blog, setBlog] = useState([]);
  const [range, setRange] = React.useState(0);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [info, setInfo] = useState({});
  //state for form submit
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");

  //const notify = () => toast("Wow so easy!");
  const handleChangeRange = (event, newValue) => {
    setRange(newValue);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    const data = {
      data: {
        Email: email,
        fullname: fullName,
        content: content,
        address: address,
        phone: phone,
        title: title,
      },
    };
    axios
      .post(URL_BACKEND + "/api/feedbacks", data)
      .then((rs) => {
        if (rs.status != 200) {
          //  alert("Gửi thông tin thất bại");
          toast("Gửi thông tin thất bại");
        } else {
          toast("Gửi thông tin thành công");
        }
      })
      .catch((err) =>
        toast("Gửi thông tin thất bại vui lòng kiểm tra lại các ô yêu cầu ")
      );
  };

  useEffect(() => {
    axios.get(URL_BACKEND + `/api/info-companies?populate=*`).then((res) => {
      const Data = res.data;
      console.log(Data);
      if (Data.data.length > 0) {
        setImg(
          Data.data[0].attributes.QR != null
            ? `${URL_BACKEND}${Data.data[0].attributes.QR.data.attributes.url}`
            : "img_emty.png"
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
        <div className="container">
          <div className="row block">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <TextField
                  fullWidth
                  placeholder="Họ tên"
                  label="Họ tên *"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-6 ">
                <TextField
                  fullWidth
                  placeholder="Tiêu đề"
                  label="Tiêu đề *"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-12 mt-4">
                    <TextField
                      fullWidth
                      label="Email: *"
                      placeholder="Email: *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-12 mt-4">
                    <TextField
                      fullWidth
                      label="Địa chỉ:"
                      placeholder="Địa chỉ:"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-4">
              <div className=".col-sm-12 d-flex justify-content-center">
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleSubmit}
                >
                  Gửi thông tin
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export { Contact };
