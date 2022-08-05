import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Backdrop from '../../components/auth/Backdrop';
import InputForm from '../../components/auth/InputForm';
import { verifyLogin } from '../../redux/authSlice';
import { AppDispatch } from '../../redux/store';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const persistedLogin = async () => {
      const localUser = localStorage.getItem('profile');
      if (localUser) {
        const { email, password } = JSON.parse(localUser);
        await dispatch(verifyLogin({ email, password }));
        navigate('/my-list');
      }
    };
    persistedLogin();
  }, []);
  return (
    <div className="login-page-container">
      <div className="login-page-contents-container">
        <div style={{ position: 'relative', left: '12.5%' }}>
          <InputForm login={true} />
        </div>
        <div style={{ position: 'relative', right: '12.5%', zIndex: -1 }}>
          <Backdrop />
        </div>
      </div>
    </div>
  );
}
