import navcss from "./navbar.module.css";
import hamburger from "../../assets/svg/hamburger.svg";
import cross from "../../assets/svg/cross.svg";
import { useState } from "react";
import Modal from "../modal/modal";
import { Register } from "../register/Register";

const NavBar = ({ loggedInState }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div className={navcss.nav}>
        <p className={navcss.header}>SwipTory</p>
        <div className={navcss.navbtn}>
          <button
            onClick={() => setShowRegister(true)}
            className={navcss.registerbtn}
          >
            Register Now
          </button>
          <button
            onClick={() => {
              setShowLogin(true);
            }}
            className={navcss.signinbtn}
          >
            Sign In
          </button>
        </div>
        <div className={navcss.hamburger} onClick={() => setOpenMenu(true)}>
          <img src={hamburger} />
        </div>
      </div>
      {openMenu && (
        <div className={navcss.navmenu}>
          <img onClick={() => setOpenMenu(false)} src={cross} />
          <div className={navcss.menubtncontainer}>
            <button
              onClick={() => {
                setOpenMenu(false);
                setShowRegister(true);
              }}
              className={navcss.registerbtn}
            >
              Login
            </button>
            <button className={navcss.signinbtn}>Register</button>
          </div>
        </div>
      )}
      {showRegister && (
        <Modal
          handleModalHide={() => {
            setShowRegister(false);
          }}
          children={<Register type="register" />}
        />
      )}
      {showLogin && (
        <Modal
          handleModalHide={() => {
            setShowLogin(false);
          }}
          children={<Register type="login" />}
        />
      )}
    </>
  );
};

export default NavBar;
