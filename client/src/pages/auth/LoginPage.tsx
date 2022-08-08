import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Backdrop from "../../components/auth/Backdrop";
import InputForm from "../../components/auth/InputForm";
import { selectLoggedInState } from "../../redux/authSlice";

import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const loggedIn = useSelector(selectLoggedInState);

  useEffect(() => {
    if (loggedIn) {
      navigate("/my-list");
    }
  }, [loggedIn]);

  return (
    <div className="login-page-container">
      <div className="login-page-contents-container">
        <div style={{ position: "relative", left: "12.5%" }}>
          <InputForm login={true} />
        </div>
        <div style={{ position: "relative", right: "12.5%", zIndex: -1 }}>
          <Backdrop />
        </div>
      </div>
    </div>
  );
}
