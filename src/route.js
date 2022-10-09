import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ManageUser from "./page/ManageUser";
import Contact from "./page/Contact";
import GoogleAuthCallback from "./page/GoogleCallBack";

export const RouteApp = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dat-tiec" element={<BigCategory />} />
        <Route exact path="/cac-loai-tiec" element={<Category />} />
        <Route exact path="/cac-loai-tiec/:id" element={<DetailCategory/>} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/blogs/:id" element={<BlogDetails />} />
        <Route exact path="/recovery-password" element={<RecoveryPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/auth/callback/google" element={<GoogleAuthCallback />} />
        <Route exact path="/quan-ly-tai-khoan" element={<ManageUser/>} />
      </Routes>
     <Footer/>
    </Router>
  );
};
