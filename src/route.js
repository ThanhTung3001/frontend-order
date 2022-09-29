import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Footer } from "./layout/footer";
import Header from "./layout/header";
import { Login } from "./page/Login";
import { Home } from "./page/home";
import { RecoveryPassword } from "./page/RecoverPassword";
import { NotFound } from "./page/NotFound";
import { BigCategory } from "./page/BigCategory";
import { Blogs } from "./page/Blogs";
import { Category } from "./page/category";
import { DetailCategory } from "./page/category/details";
import { BlogDetails } from "./page/Blogs/blogDetails";
import { Register } from "./page/Register";

export const RouteApp = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dat-tiec" element={<BigCategory />} />
        <Route exact path="/cac-loai-tiec" element={<Category />} />
        <Route exact path="/cac-loai-tiec/:id" element={<DetailCategory />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/blogs/:id" element={<BlogDetails />} />
        <Route exact path="/recovery-password" element={<RecoveryPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};
