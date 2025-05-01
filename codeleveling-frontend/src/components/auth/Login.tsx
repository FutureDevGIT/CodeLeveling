// src/components/auth/Login.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const Login: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0f0f0f, #1a1a2e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            background: 'rgba(30, 30, 50, 0.9)',
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#00bcd4' }}>
            Login
          </Typography>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: '#ccc' },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: '#ccc' },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              background: 'linear-gradient(to right, #00bcd4, #3f51b5)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(to right, #3f51b5, #00bcd4)',
              },
            }}
          >
            Enter the Dungeon
          </Button>
          <Typography align="center" mt={2} sx={{ color: '#aaa' }}>
          Not a hunter yet? <Link to="/signup" style={{ color: '#00bcd4' }}>Sign up</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
