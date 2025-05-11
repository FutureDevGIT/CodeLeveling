import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SoloLoader from '../../components/common/SoloLoader';

const AuthRedirect: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      navigate(isLoggedIn ? '/profile' : '/login');
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) return <SoloLoader />;

  return null;
};

export default AuthRedirect;