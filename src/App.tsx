// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LoginForm from './components/profile/login-form';
import RegistrationForm from './components/profile/registration-form';
import UpdateUserForm from './components/profile/update-user-form';
import ChangePasswordForm from './components/password/change-password-form';
import Profile from './components/profile/profile-page-form';
import Layout from './components/logo/layout';
import HouseListHufflepuff from './components/GBence/renderer-hufflepuff';
import HouseListSlytherin from './components/GBence/renderer-slytherin';
import HouseListRavenclaw from './components/GBence/renderer-ravenclaw';
import HouseMembers from './components/GBence/house-members';
import HouseListGryffindor from './components/GBence/renderer-gryffindor';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
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
            <Route path="/houses/gryffindor" element={<HouseListGryffindor />} />
            <Route path="/houses/hufflepuff" element={<HouseListHufflepuff />} />
            <Route path="/houses/slytherin" element={<HouseListSlytherin />} />
            <Route path="/houses/ravenclaw" element={<HouseListRavenclaw />} />
            <Route path="/houses/:houseId/members" element={<HouseMembers isLoggedIn={isLoggedIn} />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
