import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginGuard = () => {
  const { authToken } = useAuth();
  const loginPath = '/login';

  if (!authToken) {
    return <Navigate to={loginPath} />;
  }

  return <Outlet />;
};

export default LoginGuard;
