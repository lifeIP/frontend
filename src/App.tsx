import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './Pages/Auth/Login/LoginPage';
import RegistrationPage from './Pages/Auth/Registration/RegistrationPage';
import NavigationPanel from './NavigationPanel/NavigationPanel';
import MarkUpPage from './Pages/MarkUpPage/MarkUpPage';

import { observer } from 'mobx-react';
import mainStore from "./store";




function App() {
  return (
    <BrowserRouter>
    {mainStore.visibleNavigationPanel?(<NavigationPanel/>):(<></>)}
      <Routes>
        <Route path="/upload" element={<LoginPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/markup_fullscreen" element={<MarkUpPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);
