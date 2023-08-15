import { Outlet, Navigate } from 'react-router-dom';

const LoginGuard = ({ isLoggedIn }) => {
  const loginPath = '/login';

  if (!isLoggedIn) {
    return <Navigate to={loginPath} />;
  }

  return <Outlet />;
};

export default LoginGuard;
