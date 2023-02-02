import React, { useState } from "react";
import Modal from "./Modal";
const Footer = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <footer className="footer">
        <div className="attribution">
          <a href="https://coinmarketcap.com" target="_blank">
            Link 1{"     |     "}
          </a>
          <a href="https://coingecko.com" target="_blank">
            Link 2{"     |     "}
          </a>
        </div>

        <button className="rules" onClick={toggle}>
          Rules
        </button>
      </footer>
      {modal ? <Modal toggle={toggle} /> : null}
    </>
  );
};

export default Footer;
