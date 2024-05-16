import React from "react";
import { Button } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="text-center p-4">
        © 2024 Copyright:{" "}
        <Button color="link" className="p-0 m-0">
          Chatbot flow builder
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
