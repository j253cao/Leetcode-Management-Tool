import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { BiLockAlt } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import validator from "validator";
import { useDispatch } from "react-redux";

import "./InputForm.css";
import { formData, invalidInput } from "../../types/inputForm";
import { userSignUp, verifyLogin } from "../../redux/authSlice";
import { AppDispatch } from "../../redux/store";
import { userLogout } from "../../redux/userSlice";

export default function InputForm({ login = true }: { login: boolean }) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [invalidInput, setInvalidInput] = useState<invalidInput>({
    invalidUsername: false,
    invalidEmail: false,
    invalidPassword: false,
    invalidConfirmPassword: false,
    existingEmail: false,
  });
  const [failedLogin, setFailedLogin] = useState<boolean>(false);

  //check if user is logged in, populate user slice if true
  const handleFormSubmit = async () => {
    if (login) {
      const login = await dispatch(verifyLogin({ email, password }));
      if (login.payload.hasOwnProperty("email")) {
        const { email, password } = login.payload;
        setFailedLogin(false);
        navigate("/my-list");
        localStorage.setItem("profile", JSON.stringify({ email, password }));
      } else {
        setFailedLogin(true);
      }
    } else {
      const formData: formData = {
        username: "",
        email: "",
        password: "",
      };
      if (username.trim().length >= 3) {
        formData.username = username.trim();
        setInvalidInput((prevState) => {
          return { ...prevState, invalidUsername: false };
        });
      } else {
        setInvalidInput((prevState) => {
          return { ...prevState, invalidUsername: true };
        });
      }
      if (validator.isEmail(email)) {
        formData.email = email;
        setInvalidInput((prevState) => {
          return { ...prevState, invalidEmail: false };
        });
      } else {
        setInvalidInput((prevState) => {
          return { ...prevState, invalidEmail: true };
        });
      }
      if (password.length >= 9 && confirmPassword === password) {
        formData.password = password;
        setInvalidInput((prevState) => {
          return {
            ...prevState,
            invalidPassword: false,
            invalidConfirmPassword: false,
          };
        });
      } else if (password.length < 9) {
        setInvalidInput((prevState) => {
          return {
            ...prevState,
            invalidPassword: true,
          };
        });
      } else if (confirmPassword !== password) {
        setInvalidInput((prevState) => {
          return {
            ...prevState,
            invalidConfirmPassword: true,
          };
        });
      }
      if (formData.username === "" || formData.email === "" || formData.password === "") {
        return;
      } else {
        const response = await dispatch(userSignUp({ email, username, password }));
        if (response.payload?.token) {
          localStorage.clear();
          await dispatch(userLogout());
          localStorage.setItem(
            "profile",
            JSON.stringify({ email, password: response.payload.user.password }),
          );
          navigate("/my-list");
        } else if (response.payload.response.status === 400) {
          setInvalidInput({ ...invalidInput, existingEmail: true });
        }
      }
    }
  };

  const handleNavigateAuth = () => {
    navigate(login ? "/sign-up" : "/login");
  };
  return (
    <div className="input-form-container">
      <div className="input-form-header">{login ? "Login" : "Sign Up"}</div>
      <div className="input-form-sub-header">
        {login ? "Login and track your progress!" : "Create your account now!"}
      </div>
      {login ? null : (
        <div className="input-form-data-entry-container">
          <BsFillPersonFill size={30} style={{ marginLeft: 10 }} />
          <input
            type="text"
            className="input-form-data-entry"
            placeholder={"Username"}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
        </div>
      )}
      {invalidInput.invalidUsername ? (
        <div className="input-form-data-entry-error">
          <p style={{ fontSize: "0.8em" }}>Username must be at least 3 characters</p>
        </div>
      ) : null}

      <div className="input-form-data-entry-container">
        <MdAlternateEmail size={30} style={{ marginLeft: 10 }} />
        <input
          type="text"
          className="input-form-data-entry"
          placeholder={"Email"}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
      </div>
      {invalidInput.invalidEmail && (
        <div className="input-form-data-entry-error">
          <p style={{ fontSize: "0.8em" }}>Please enter a valid email</p>
        </div>
      )}
      {invalidInput.existingEmail && (
        <div className="input-form-data-entry-error">
          <p style={{ fontSize: "0.8em" }}>User already exists</p>
        </div>
      )}
      <div className="input-form-data-entry-container">
        <BiLockAlt size={30} style={{ marginLeft: 10 }} />
        <input
          type={"password"}
          className="input-form-data-entry"
          placeholder={"Password"}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value.replace(/\s/g, ""));
          }}
        ></input>
      </div>
      {failedLogin ? (
        <div className="input-form-data-entry-error">
          <p style={{ fontSize: "0.8em" }}>Incorrect email or password.</p>
        </div>
      ) : null}
      {invalidInput.invalidPassword ? (
        <div className="input-form-data-entry-error">
          <p style={{ fontSize: "0.8em" }}>Password must be at least 9 characters</p>
        </div>
      ) : null}
      {login ? null : (
        <div className="input-form-data-entry-container">
          <BiLockAlt size={30} style={{ marginLeft: 10 }} />
          <input
            type={"password"}
            className="input-form-data-entry"
            placeholder={"Confirm Password"}
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value.replace(/\s/g, ""));
            }}
          ></input>
        </div>
      )}
      {invalidInput.invalidConfirmPassword ? (
        <div className="input-form-data-entry-error">
          <p style={{ fontSize: "0.8em" }}>Passwords don't match</p>
        </div>
      ) : null}
      <button onClick={handleFormSubmit} className="input-form-button">
        {login ? "Login" : "Sign Up"}
      </button>
      <div className="input-form-footer-container">
        <button onClick={handleNavigateAuth} className="input-form-footer-button">
          {login ? "Don't have an account?" : "Already have an account?"}
        </button>
      </div>
    </div>
  );
}
