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
import { LoginAction, RegisterAction } from "../../app/action/UserAction";
import { Navigate, useHistory, useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'
import './index.css'
export const Login = () => {
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
    if (!password.error && !username.error) {
      const dataSend = {
        username: username.value,

        password: password.value,
      };
      dispatch(
        LoginAction({
          identifier: username.value,
          password: password.value,
        })
      );
    }
  };
  useEffect(() => {
    if (error) {
      alert("Tài khoản hoặc mật khẩu không đúng");
    } else if (authencated) {
      navigator("/");
    }
  }, [authencated, error, users]);
  return (
    <div className="full-width ">
      <div className="container ">
        <div className="row d-flex justify-content-center ">
          <div className="col-sm-12 col-md-7">
            <div className="row block p-5 items-center">
              <div className="col-sm-12 ">

                <h3 style={{ textAlign: "center", fontWeight: 700 }}>
                  Đăng nhập
                </h3>
              </div>

              <div className="col-sm-12 col-md-8 m-2">
                <TextField
                  fullWidth
                  label="Tên tài khoản hoặc email"
                  placeholder="Tên tài khoản hoặc email"
                  error={username.error}
                  helperText={username.message}
                  value={username.value}
                  onChange={handleChangeUsername}
                />
              </div>

              <div className="col-sm-12 col-md-8 m-2">
                <TextField
                  type="password"
                  label="Mật khẩu"
                  onChange={handleChangePassword}
                  value={password.value}
                  error={password.error}
                  helperText={password.message}
                  fullWidth
                  placeholder="Mật khẩu"
                />
              </div>

              <div className="AroundLoginBtn col-sm-12 col-md-10 d-flex">
                <div className="LoginBtn col-12 col-sm-6 m-2">
                  <Button
                    fullWidth
                    style={{ height: '100%' }}
                    variant="contained"
                    color="error"
                    onClick={handleSubmit}
                  >
                    Đăng nhập
                  </Button>
                </div>
                <div className="col-12 col-sm-6 m-2">
                  <GoogleButton style={window.innerWidth < '420' ? {width : '220px'} : {width : '240px'}} type="light" onClick={() => {
                    (window.location = `${URL_BACKEND}/api/connect/google`)
                  }}>Đăng nhập với Google</GoogleButton>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
