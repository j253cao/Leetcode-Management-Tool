import Backdrop from "../../components/auth/Backdrop";
import InputForm from "../../components/auth/InputForm";
import "./LoginPage.css";
export default function LoginPage() {
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
