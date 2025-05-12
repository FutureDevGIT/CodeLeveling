import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SoloLoader from '../../components/common/SoloLoader';
import { JSX } from 'react';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div><SoloLoader /></div>;
  }

  return !isLoggedIn ? children : <Navigate to="/profile" />;
};

export default PublicRoute;
