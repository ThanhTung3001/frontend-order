import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as EmailValidator from "email-validator";
import axios from "axios";
import { URL_BACKEND } from "../../constants";
import { toast } from "react-toastify";
import PasswordValidator from "password-validator";

export const RecoveryPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState({
    error: false,
    value: "",
    message: "",
  });
  var schema = new PasswordValidator();
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
  const [repeatPassword, setRepeatPassword] = useState({
    error: false,
    value: "",
    message: "",
  });
  const [password, setPassword] = useState({
    error: false,
    value: "",
    message: "",
  });
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
  const handleSubmit = async () => {
    if (email.error == false) {
      const { data, status } = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: {
          email: email.value,
        },
        url: URL_BACKEND + "/api/auth/forgot-password",
      });
      if (status === 200) {
        toast("Gửi thông tin thành công, vui lòng kiểm tra mail của bạn");
      } else {
        toast("Gửi thông tin thất bại");
      }
    } else {
      toast("Mail không hợp lệ");
    }
  };
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
  const code = searchParams.get("code");
  const submitGetPass = async () => {
    if (
      password.error == false &&
      repeatPassword.error == false &&
      password.value === repeatPassword.value
    ) {
      const { data, status } = await axios({
        url: URL_BACKEND + "/api/auth/reset-password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          password: password.value,
          passwordConfirmation: repeatPassword.value,
          code: code,
        },
      });
      if (status === 200) {
        toast("Đổi mật khẩu thành công");
      } else {
        toast("Đổi mật khẩu thất bại");
      }
    }
  };
  if (code == null || code == "") {
    return (
      <div className="full-width">
        <div className="container  d-flex flex-column justify-content-center align-items-center">
          <div
            className="row block d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: 350, width: "100%" }}
          >
            <div className="row d-flex justify-content-center">
              <div className="col-12 col-sm-8 col-md-4 d-flex justify-content-center">
                <TextField
                  type="email"
                  fullWidth
                  label="Nhập email của bạn"
                  placeholder="Nhập email của bạn"
                  error={email.error}
                  helperText={email.message}
                  value={email.value}
                  onChange={handleChangeEmail}
                />
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-3">
              <div className="col-12 col-sm-8 col-md-4 d-flex justify-content-center">
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Khôi phục mật khẩu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="full-width">
        <div
          className="container  d-flex flex-column justify-content-center align-items-center"
          style={{ height: 600 }}
        >
          <div
            className="row block d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: 350, width: "100%" }}
          >
            <div className="row d-flex justify-content-center">
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-sm-8 col-md-4 d-flex justify-content-center">
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
              </div>
              <div className="row mt-2 d-flex justify-content-center">
                <div className="col-12 col-sm-8 col-md-4 d-flex justify-content-center">
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
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-3">
              <div className="col-12 col-sm-8 col-md-4 d-flex justify-content-center">
                <Button
                  color="error"
                  variant="contained"
                  onClick={submitGetPass}
                >
                  Đổi mật khẩu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
