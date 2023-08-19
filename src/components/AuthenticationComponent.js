import { useState } from 'react';
import { Paper, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { registerTrainer, authenticateTrainer } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import '../assets/css/authentication.css';
import Swal from 'sweetalert2';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '10px',
  [theme.breakpoints.down('sm')]: {
    width: '80%'
  },
  [theme.breakpoints.up('md')]: {
    width: '45%'
  },
  [theme.breakpoints.up('lg')]: {
    width: '35%'
  }
}));

function AuthenticationComponent({ isRegistration }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formatErrors, setFormatErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const formatValidator = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = { ...formatErrors };

    if (!emailPattern.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'Password must contain at least one capital letter.';
    } else if (!/\d/.test(password)) {
      errors.password = 'Password must contain at least one digit.';
    } else if (!/\W/.test(password)) {
      errors.password = 'Password must contain at least one non-alphanumeric character.';
    }

    setFormatErrors(errors);

    if (errors.email === '' && errors.password === '') {
      return false;
    }

    if (Object.keys(errors).length) {
      return true;
    }
  };

  const onChange = (field, value) => {
    if (field === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }

    setFormatErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const changeTabs = (path) => {
    setEmail('');
    setPassword('');
    setFormatErrors({});
    navigate(path);
  };

  const handleLogin = async () => {
    const res = await authenticateTrainer(email, password);
    login(res.token, res.trainerId);
    if (!res.success) return Swal.fire('', res.error, 'error');
    navigate('/heroes');
  };

  const handleRegister = async () => {
    const res = await registerTrainer(email, password);
    setEmail('');
    setPassword('');
    if (!res.success) return Swal.fire('', res.error, 'error');
    Swal.fire('Registration successful', '', 'success');
    navigate('/login');
  };

  const handleSubmit = async () => {
    if (formatValidator() && isRegistration) return;

    if (isRegistration) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='authentication-con'>
      <StyledPaper elevation={3}>
        <div className='auth-title'>{isRegistration ? 'Register to become a trainer!' : 'Welcome back, Trainer!'}</div>
        <div>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Email'
            value={email}
            error={Boolean(formatErrors.email)}
            helperText={formatErrors.email}
            onChange={(e) => onChange('email', e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            value={password}
            error={isRegistration && Boolean(formatErrors.password)}
            helperText={isRegistration && formatErrors.password}
            onChange={(e) => onChange('password', e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <Button fullWidth variant='contained' onClick={handleSubmit} className='auth-btn'>
            {isRegistration ? 'Register' : 'Login'}
          </Button>
        </div>
        {isRegistration ? (
          <div className='mt-20'>
            Already a member?{' '}
            <span className='auth-link' onClick={() => changeTabs('/login')}>
              {' '}
              Login
            </span>
          </div>
        ) : (
          <div className='mt-20'>
            Not a member?{' '}
            <span className='auth-link' onClick={() => changeTabs('/register')}>
              {' '}
              Sign up
            </span>
          </div>
        )}
      </StyledPaper>
    </div>
  );
}

export default AuthenticationComponent;
