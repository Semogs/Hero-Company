import { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { register, login } from '../services/authService';
import '../css/authentication.css';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2)
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2)
}));

function AuthenticationComponent({ isRegistration }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistration) {
        await register(username, password);
      } else {
        await login(username, password);
      }
      navigate('/heroes'); // Redirect after successful action
    } catch (error) {
      // Handle error (display message or set state)
      console.error('Authentication error:', error);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <StyledPaper elevation={3}>
        <Typography component='h1' variant='h5'>
          {isRegistration ? 'Trainer Registration' : 'Trainer Login'}
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledSubmitButton type='submit' fullWidth variant='contained' color='primary'>
            {isRegistration ? 'Register' : 'Login'}
          </StyledSubmitButton>
        </StyledForm>
        <Box mt={2}>
          {isRegistration ? (
            <div>
              Already a member?{' '}
              <span className='link' onClick={() => navigate('/login')}>
                {' '}
                Login
              </span>
            </div>
          ) : (
            <div>
              Not a member?{' '}
              <span className='link' onClick={() => navigate('/register')}>
                {' '}
                Sign up
              </span>
            </div>
          )}
        </Box>
      </StyledPaper>
    </Container>
  );
}

export default AuthenticationComponent;
