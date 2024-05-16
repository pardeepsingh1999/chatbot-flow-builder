import React from "react";
import { ToastContainer } from "react-toastify";
// import Header from "./Header";
// import Footer from "./Footer";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <>
      <ToastContainer position="bottom-right" />

      <div className="d-flex flex-column">
        {/* <Header /> */}
        <div className="mainContainer">{children}</div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
