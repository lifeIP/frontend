import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Auth/Login/LoginPage';
import RegistrationPage from './pages/Auth/Registration/RegistrationPage';
import NavigationPanel from './NavigationPanel/NavigationPanel';
import MarkUpPage from './pages/MarkUpPage/MarkUpPage';

function App() {
  return (
    <BrowserRouter>
    <NavigationPanel/>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/markup_fullscreen" element={<MarkUpPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
