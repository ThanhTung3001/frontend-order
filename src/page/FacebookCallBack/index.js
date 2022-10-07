import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_BACKEND } from "../../constants";
import { useDispatch } from "react-redux";
import { login } from "../../app/reducer/UserSlice";

function FacebookCallBack() {
  const [auth, setAuth] = useState();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location) {
      return;
    }
    const { search } = location;
    axios({
      method: "GET",
      url: `${URL_BACKEND}/api/auth/facebook/callback${search}`,
    })
      .then((res) => {
        // console.log(res.data)
        return res.data;
      })
      .then(setAuth);
    if (auth) {
      dispatch(login(auth));
      navigate("/");
      localStorage.setItem("UserInfo", JSON.stringify(auth));
    }
  }, [location, auth]);
}

export default FacebookCallBack;
