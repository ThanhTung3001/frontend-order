import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Header from "./layout/header";
import { StyledEngineProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./page/home";
import { RouteApp } from "./route";
import { Footer } from "./layout/footer";
function App() {
  return (
    <>
      <RouteApp />
    </>
  );
}

export default App;
