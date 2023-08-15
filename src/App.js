import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroScreen from './components/HeroScreen';
import LoginGuard from './guards/LoginGuard';
import AuthenticationComponent from './components/AuthenticationComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<AuthenticationComponent isRegistration />} />
        <Route path='/login' element={<AuthenticationComponent />} />
        {/* <Route path='/' element={<LoginGuard />}> */}
        <Route path='/heroes' element={<HeroScreen />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
