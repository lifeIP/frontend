import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { observer } from 'mobx-react';
import mainStore from "./store";

import NavigationPanel from './components/NavigationPanel/NavigationPanel';
import LoginPage from './Pages/Auth/Login/LoginPage';
import RegistrationPage from './Pages/Auth/Registration/RegistrationPage';
import MarkUpPage from './Pages/MarkUpPage/MarkUpPage';


function App() {
  return (
    <BrowserRouter>
    {mainStore.visibleNavigationPanel?(<NavigationPanel/>):(<></>)}
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/markup_fullscreen" element={<MarkUpPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);