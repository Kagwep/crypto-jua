import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAccount, useNetwork } from 'wagmi';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import NavBar from '@/components/NavBar/NavBar.tsx';
import {
  NewProtectedData,
  MyProtectedData,
  OneProtectedData,
  SendEmail,
  SendEmailForm,
  LoginGuard,
  Landing,
  Services
} from './features';
import {
  PROTECTED_DATA,
  CONSENT,
  SEND_EMAIL,
  CREATE,
  HOME,
  SERVICES,
} from './config/path';
import { store } from '@/app/store.ts';
import { initSDK } from '@/app/appSlice.ts';
import { Home } from 'react-feather';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}


const theme = createTheme({
  status: {
    danger: orange[500],
  },
});



function App() {
  const { connector } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    if (!connector) {
      return;
    }
    store.dispatch(initSDK({ connector }));
  }, [connector, chain]);



  

  


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar />
        <div className="mx-auto mt-12 w-[80%] max-w-6xl">
          <Routes>
            <Route
              path={`/${HOME}`}
              element={
                <LoginGuard>
                  <Landing />
                </LoginGuard>
              }
            />
            <Route
              path={`/${SERVICES}`}
              element={
                <LoginGuard>
                  <Services />
                </LoginGuard>
              }
            />
            <Route
              path={`/${PROTECTED_DATA}`}
              element={
                <LoginGuard>
                  <MyProtectedData />
                </LoginGuard>
              }
            />
            <Route
              path={`/${PROTECTED_DATA}/${CONSENT}/:ProtectedDataId`}
              element={
                <LoginGuard>
                  <OneProtectedData />
                </LoginGuard>
              }
            />
            <Route
              path={`/${PROTECTED_DATA}/${CREATE}`}
              element={
                <LoginGuard>
                  <NewProtectedData />
                </LoginGuard>
              }
            />
            <Route
              path={`/${SEND_EMAIL}`}
              element={
                <LoginGuard>
                  <SendEmail />
                </LoginGuard>
              }
            />
            <Route
              path={`/${SEND_EMAIL}/:receiverAddress/:protectedDataAddress`}
              element={
                <LoginGuard>
                  <SendEmailForm />
                </LoginGuard>
              }
            />
            {/* default redirect */}
            <Route path="*" element={<Navigate to={`/${HOME}`} />} />
          </Routes>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
