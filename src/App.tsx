// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LoginForm from './components/profile/login-form';
import RegistrationForm from './components/profile/registration-form';
import UpdateUserForm from './components/profile/update-user-form';
import ChangePasswordForm from './components/password/change-password-form';
import Profile from './components/profile/profile-page-form';
import HomePage from './components/home/home-page-form';
import Layout from './components/logo/layout';
import HouseDetails from './components/GBence/house-details';


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/update" element={<UpdateUserForm />} />
            <Route path="/change-password" element={<ChangePasswordForm />} />
            <Route path="/houses" element={<HouseDetails isLoggedIn={isLoggedIn} />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;