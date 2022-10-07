import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_BACKEND } from "../../constants";

export const RegisterAction = createAsyncThunk(
  "register/User",
  async (user) => {
    const { data, status, request } = await axios.post(
      `${URL_BACKEND}/api/auth/local/register`,
      user
    );
    localStorage.setItem("UserInfo", JSON.stringify(data));
    return data;
    // setUser(data);
  }
);
export const LoginAction = createAsyncThunk("login/User", async (user) => {
  const { data, status, request } = await axios.post(
    `${URL_BACKEND}/api/auth/local`,
    user
  );
  localStorage.setItem("UserInfo", JSON.stringify(data));
  return data;
});
export const getMeAction = createAsyncThunk("getMe/User", async (token) => {
  const { data } = await axios.get(
    URL_BACKEND + "/api/users/me?populate=deep,3",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return data;
});
