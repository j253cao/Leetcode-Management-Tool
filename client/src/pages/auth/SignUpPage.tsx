import InputForm from "../../components/auth/InputForm";
import "./SignUpPage.css";

export default function SignUp() {
  return (
    <div className="sign-up-page-container">
      <InputForm login={false} />
    </div>
  );
}
