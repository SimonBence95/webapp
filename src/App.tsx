import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LoginForm from './components/profile/login-form';
import RegistrationForm from './components/profile/registration-form';
import UpdateUserForm from './components/profile/update-user-form';
import ChangePasswordForm from './components/password/change-password-form';
import Profile from './components/profile/profile-page-form';
import HomePage from './components/home/home-page-form';
import Layout from './components/logo/layout';

const App: React.FC = () => (
  <ChakraProvider>
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update" element={<UpdateUserForm />} />
          <Route path="/change-password" element={<ChangePasswordForm />} />
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  </ChakraProvider>
);

export default App;
