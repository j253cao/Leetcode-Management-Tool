import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import MyListPage from "../pages/list/MyListPage";
import { verifyLogin } from "../redux/authSlice";
import { AppDispatch } from "../redux/store";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const persistedLogin = async () => {
      const localUser = localStorage.getItem("profile");
      if (localUser) {
        const { email, password } = JSON.parse(localUser);
        await dispatch(verifyLogin({ email, password }));
      }
    };
    persistedLogin();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/my-list" element={<MyListPage />} />
      </Routes>
    </Router>
  );
}
