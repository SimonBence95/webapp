import { ChakraProvider, Container, Flex } from '@chakra-ui/react';
import { theme } from './theme';
import { PotterLogo } from './components';
import { Route, Routes, Link } from 'react-router-dom';
import { LoginPage } from './components/login/login-page';
import { AuthProvider, ProtectedRoute } from './auth';
import { ProfilePage } from './components/profile/profile-page';
import HomePage from './components/homepage/homepage'; 
import { ProfileButton } from "./components/profile/profile-button";
import RegistrationForm from './components/registration/registration-form';
import UpdateProfileForm from './components/profile/update-profile';

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Container maxWidth="7xl">
        <Flex justifyContent="space-between" marginBottom="4" alignItems="center">
          <PotterLogo />
          <ProfileButton />
        </Flex>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/" element={<UpdateProfileForm />} />
        </Routes>
      </Container>
    </AuthProvider>
  </ChakraProvider>
);

export default App;
