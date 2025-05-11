import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthRedirect = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return null;
};

export default AuthRedirect;
