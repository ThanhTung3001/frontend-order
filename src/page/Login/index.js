import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  InputAdornment,
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
import { Link, Navigate, useHistory, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import GoogleIcon from "@mui/icons-material/Google";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import { toast } from "react-toastify";

//npm i react-facebook-login-button
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
  const [type, setType] = useState(false);

  const handleChangePassword = (e) => {
    const value = e.target.value;
    let a = "";
    if (value.trim() == "") {
      setPassword((prev) => ({
        ...prev,
        error: true,
        value: value,
        message: "M???t kh???u kh??ng ???????c ????? tr???ng!",
      }));
    } else if (!schema.validate(value)) {
      setPassword((prev) => ({
        ...prev,
        error: true,
        message: "M???t kh???u ph???i l???n h??n 2 k?? t??? v?? c?? ??t nh???t 2 k?? t??? in hoa !",
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
        message: "H??? v?? t??n kh??ng ???????c ????? tr???ng!",
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
        message: "T??n t??i kho???n kh??ng ???????c ????? tr???ng!",
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
        message: "Email kh??ng ???????c ????? tr???ng",
      }));
    } else if (!EmailValidator.validate(value)) {
      setEmail((prev) => ({
        ...prev,
        error: true,
        message: "Email kh??ng ????ng ?????nh d???ng !",
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
        message: "M???t kh???u l???p l???i kh??ng tr??ng kh???p!",
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
      toast("T??i kho???n ho???c m???t kh???u kh??ng ????ng");
    } else if (authencated) {
      navigator("/");
    }
  }, [authencated, error, users]);
  return (
    <div className="full-width ">
      <div className="container ">
        <div className="row d-flex justify-content-center ">
          <div className="col-sm-12 col-md-12 col-lg-7">
            <div className="row block p-5">
              <div className="col-sm-12 ">
                <h3 style={{ textAlign: "center", fontWeight: 700 }}>
                  ????ng nh???p
                </h3>
              </div>

              <div className="col-sm-12 col-md-8 m-2">
                <TextField
                  fullWidth
                  label="T??n t??i kho???n ho???c email"
                  placeholder="T??n t??i kho???n ho???c email"
                  error={username.error}
                  helperText={username.message}
                  value={username.value}
                  onChange={handleChangeUsername}
                />
              </div>

              <div className="col-sm-12 col-md-8 m-2">
                <TextField
                  fullWidth
                  type={type == false ? "password" : "text"}
                  label="M???t kh???u"
                  onChange={handleChangePassword}
                  value={password.value}
                  error={password.error}
                  helperText={password.message}
                  placeholder="M???t kh???u"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        onClick={() => setType(!type)}
                        position="end"
                        style={{ cursor: "pointer" }}
                      >
                        {!type ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="col-sm-8 mt-2">
                <div className="col-12">
                  <Button
                    fullWidth
                    style={{ height: "100%" }}
                    variant="contained"
                    color="error"
                    onClick={handleSubmit}
                  >
                    ????ng nh???p
                  </Button>
                </div>
              </div>
              <div className="col-8 mt-3 d-flex justify-content-between">
                <div className="col-6 d-flex justify-content-start">
                  <Link
                    to="/forgot-password"
                    style={{ textDecoration: "none" }}
                  >
                    <p className="description-time" style={{ height: 12 }}>
                      Qu??n m???t kh???u?
                    </p>
                  </Link>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <p className="description-time" style={{ height: 12 }}>
                      ????ng k??
                    </p>
                  </Link>
                </div>
              </div>
              {/* <div className="col-8">
                <Divider textAlign="center"> or</Divider>
              </div>
              <div className="col-12 col-sm-8 ml-0 d-flex justify-content-between">
                <div className="col-sm-12 col-md-6 mr-1 d-flex justify-content-start">
                  <Button
                    fullWidth
                    startIcon={<FacebookIcon />}
                    variant="contained"
                    color="primary"
                    className="containedPrimary"
                    onClick={() => {
                      window.location = `${URL_BACKEND}/api/connect/facebook`;
                    }}
                    style={{
                      fontSize: 11,
                    }}
                  >
                    Facebook
                  </Button>
                </div>

                <div className="col-sm-12 col-md-6 ml-1 d-flex justify-content-start">
                  <Button
                    onClick={() => {
                      window.location = `${URL_BACKEND}/api/connect/google`;
                    }}
                    variant="contained"
                    color="error"
                    fullWidth
                    startIcon={<GoogleIcon />}
                    style={{
                      fontSize: 11,
                    }}
                  >
                    Google
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
