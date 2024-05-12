import * as React from 'react'
import { ChakraProvider, Container, Flex } from '@chakra-ui/react'
import { theme } from './theme';
import { PotterLogo, SearchPage } from './components';
import { Route, Routes } from 'react-router-dom';
import { PotterProvider } from "./state"
import { LoginPage } from './components/login/login-page';
import { AuthProvider, ProtectedRoute } from './auth';
import { ProfilePage } from './components/profile/profile-page';
import { ProfileButton } from './components/profile/profile-button';
import { PotterEditor } from './components/potter-editor';
import { PotterListPage } from './components/potter-list';

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <PotterProvider>
        <Container maxWidth="7xl">
          <Flex justifyContent="space-between" marginBottom="4" alignItems="center">
            <PotterLogo />
            <ProfileButton />
          </Flex>
          <Routes>
            <Route path="/" element={< SearchPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
          <PotterListPage />
          <PotterEditor />
        </Container>
      </PotterProvider>
    </AuthProvider>
  </ChakraProvider>
)
