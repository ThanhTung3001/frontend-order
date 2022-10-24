import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_BACKEND } from "../../constants";


export const initInfoCompany=createAsyncThunk("InitInfoCompany",async () => {
    const {data}= await axios.get(URL_BACKEND + `/api/info-companies?populate=*`);
    return data;
    // setUser(data);
  });
  