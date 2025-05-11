import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SoloLoader from '../../components/common/SoloLoader';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div><SoloLoader /></div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
