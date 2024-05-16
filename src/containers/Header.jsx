import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

const Header = () => {
  return (
    <Navbar color="secondary" dark>
      <NavbarBrand href="/">Chatbot flow builder</NavbarBrand>
    </Navbar>
  );
};

export default Header;
