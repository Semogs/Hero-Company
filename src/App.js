import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import HeroScreen from './components/HeroScreen';
import LoginGuard from './guards/LoginGuard';
import AuthenticationComponent from './components/AuthenticationComponent';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path='/register' element={<AuthenticationComponent isRegistration />} />
          <Route path='/login' element={<AuthenticationComponent />} />
          <Route element={<LoginGuard />}>
            <Route index element={<Navigate to='/heroes' />} />
            <Route path='/heroes' element={<HeroScreen />} />
          </Route>
          <Route path='/heroes' element={<HeroScreen />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
