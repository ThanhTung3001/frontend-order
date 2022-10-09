import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as EmailValidator from "email-validator";
import passwordValidator from "password-validator";
import axios from "axios";
import { URL_BACKEND } from "../../constants";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../app/reducer/UserSlice";
import { RegisterAction } from "../../app/action/UserAction";
import { Navigate, useHistory, useNavigate } from "react-router-dom";

export const Register = () => {
  const { users, authencated, error } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  var schema = new passwordValidator();
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]);
  const [checkPr, setCheckPr] = useState({
    error: false,
    message: "",
    value: true,
  });
  const [password, setPassword] = useState({
    error: false,
    value: "",
    message: "",
  });

  const handleChangePassword = (e) => {
    const value = e.target.value;
    let a = "";
    if (value.trim() == "") {
      setPassword((prev) => ({
        ...prev,
        error: true,
        value: value,
        message: "Mật khẩu không được để trống!",
      }));
    } else if (!schema.validate(value)) {
      setPassword((prev) => ({
        ...prev,
        error: true,
        message: "Mật khẩu phải lớn hơn 2 kí tự và có ít nhất 2 kí tự in hoa !",
        value: value,
      }));
    } else {
      setPassword((prev) => ({
        ...prev,
        error: false,
        message: "",
        value: value,
      }));
    }
  };
  const [fullName, setFullName] = useState({
    error: false,
    value: "",
    message: "",
  });

  const handleChangeFullName = (e) => {
    const value = e.target.value;
    let a = "";
    if (value.trim() == "") {
      setFullName((prev) => ({
        ...fullName,
        error: true,
        value: value,
        message: "Họ và tên không được để trống!",
      }));
    } else {
      setFullName((prev) => ({
        ...prev,
        error: false,
        message: "",
        value: value,
      }));
    }
  };

  const [username, setUsername] = useState({
    error: false,
    value: "",
    message: "",
  });

  const handleChangeUsername = (e) => {
    const value = e.target.value;
    let a = "";
    if (value.trim() == "") {
      setUsername((prev) => ({
        ...prev,
        error: true,
        value: value,
        message: "Tên tài khoản không được để trống!",
      }));
    } else {
      setUsername((prev) => ({
        ...prev,
        error: false,
        message: "",
        value: value,
      }));
    }
  };
  const [email, setEmail] = useState({
    error: false,
    value: "",
    message: "",
  });
  const handleChangeEmail = (e) => {
    const value = e.target.value;
    let a = "";
    if (value.trim() == "") {
      setEmail((prev) => ({
        ...prev,
        error: true,
        value: value,
        message: "Email không được để trống",
      }));
    } else if (!EmailValidator.validate(value)) {
      setEmail((prev) => ({
        ...prev,
        error: true,
        message: "Email không đúng định dạng !",
        value: value,
      }));
    } else {
      setEmail((prev) => ({
        ...prev,
        error: false,
        message: "",
        value: value,
      }));
    }
  };
  const [repeatPassword, setRepeatPassword] = useState({
    error: false,
    value: "",
    message: "",
  });
  const [user, setUser] = useState({});
  const navigator = useNavigate();
  const handleChangeRepeatPassword = (e) => {
    const value = e.target.value;

    if (value !== password.value) {
      setRepeatPassword((prev) => ({
        error: true,
        value: value,
        message: "Mật khẩu lặp lại không trùng khớp!",
      }));
    } else {
      setRepeatPassword((prev) => ({
        error: false,
        value: value,
        message: "",
      }));
    }
  };
  const handleSubmit = async () => {
    if (
      !fullName.error &&
      !email.error &&
      !password.error &&
      !repeatPassword.error &&
      !username.error
    ) {
      const dataSend = {
        FullName: fullName.value,
        username: username.value,
        email: email.value,
        password: password.value,
      };
      dispatch(RegisterAction(dataSend));
    }
  };
  useEffect(() => {
    if (error) {
      alert("Email hoặc username đã tồn tại");
    } else if (authencated) {
      alert("Đăng ký thành công, tự động chuyển hướng đến trang chủ");
      navigator("/");
    }
  }, [authencated, error, users]);
  return (
    <div className="full-width ">
      <div className="container ">
        <div className="row d-flex justify-content-center ">
          <div className="col-sm-12 col-md-7">
            <div className="row block p-5">
              <div className="col-sm-12">
                <h3 style={{ textAlign: "center", fontWeight: 700 }}>
                  Đăng ký
                </h3>
              </div>
              <div className="col-12 col-sm-10 col-md-12 col-lg-10 mt-4">
                <TextField
                  fullWidth
                  placeholder="Họ và tên"
                  error={fullName.error}
                  helperText={fullName.message}
                  value={fullName.value}
                  onChange={handleChangeFullName}
                />
              </div>
              <div className="col-12 col-sm-10 col-md-12 col-lg-10 m-2">
                <TextField
                  fullWidth
                  placeholder="Tên tài khoản"
                  error={username.error}
                  helperText={username.message}
                  value={username.value}
                  onChange={handleChangeUsername}
                />
              </div>
              <div className="col-12 col-sm-10 col-md-12 col-lg-10 m-2">
                <TextField
                  type="email"
                  fullWidth
                  placeholder="Email"
                  error={email.error}
                  helperText={email.message}
                  value={email.value}
                  onChange={handleChangeEmail}
                />
              </div>

              <div className="col-12 col-sm-10 col-md-12 col-lg-10 m-2">
                <TextField
                  type="password"
                  onChange={handleChangePassword}
                  value={password.value}
                  error={password.error}
                  helperText={password.message}
                  fullWidth
                  placeholder="Mật khẩu"
                />
              </div>
              <div className="col-12 col-sm-10 col-md-12 col-lg-10 m-2">
                <TextField
                  type="password"
                  fullWidth
                  placeholder="Xác nhận mật khẩu"
                  onChange={handleChangeRepeatPassword}
                  value={repeatPassword.value}
                  error={repeatPassword.error}
                  helperText={repeatPassword.message}
                />
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-sm-10 col-md-12 col-lg-10 mt-3 d-flex justify-content-start align-items-start p-0">
                  <FormGroup> 
                    <FormControlLabel
                      control={<Checkbox className="align-items-start" checked={true} />}
                      label="Tôi đã đọc và đồng ý với Điều khoản sử dụng và Chính sách quyền riêng tư"
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="col-12 col-sm-8 col-md-12 col-lg-10 mt-5">
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={handleSubmit}
                >
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
