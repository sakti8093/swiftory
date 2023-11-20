import React, { useContext, useState } from "react";
import registerstyle from "../register/register.module.css";
import eye from "../../assets/svg/eye.svg";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/authContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Register = ({ type }) => {
  const { login } = useContext(AuthContext);
  const [showPassword, setPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getUrl = () => {
    if (type === "login") {
      return `${BASE_URL}/login`;
    } else {
      return `${BASE_URL}/register`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = getUrl();
    fetch(`${URL}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message);
        } else {
          setIsError(false);
          localStorage.setItem(
            "login",
            JSON.stringify({
              token: data.token,
            })
          );
          login(data.username);
          toast.success("Success");
        }
      })
      .catch((err) => {
        setIsError(true);
        toast.error(err?.message || "something went wrong");
      });
  };

  return (
    <div className={registerstyle.wrapper}>
      <div>
        <p className={registerstyle.text}>Login to SwipTory</p>
        <form
          onSubmit={handleSubmit}
          onChange={handleChange}
          className={registerstyle.registerform}
        >
          <label>Username</label>
          <input name="username" />
          <label>Password</label>
          <div className={registerstyle.passwordwrappwer}>
            <input type={showPassword ? "text" : "password"} name="password" />
            <img
              onClick={() => setPassword(!showPassword)}
              className={registerstyle.eye}
              src={eye}
            />
          </div>
          {isError && (
            <p className={registerstyle.error}>Please enter valid username</p>
          )}
          <button className={registerstyle.loginbtn}>
            {type === "login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};
