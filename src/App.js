import "./App.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import MyHeader from "./components/Header/MyHeader";
import HomePage from "./Pages/Home/HomePage";
import AboutPage from "./Pages/About/AboutPage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import WelcomePage from "./Pages/Welcome/WelcomePage";

import LoginPage from "./Pages/Auth/Login/LoginPage";
import RegistrationPage from "./Pages/Auth/Registration/RegistrationPage";
import WorkingPage from "./Pages/Project/WorkingField/WorkingPage"
import CreateProjectPage from "./Pages/Project/CreateProject/CreateProjectPage";
import UploadImagesPage from "./Pages/Project/UploadImages/UploadImagesPage";


const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      paper: '#fffbf1',
      default: '#e0dede',
    },
  },
});



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#101010',
    },
  },
});

function App() {
  const [cookies, setCookie] = useCookies(['my_theme']);

  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (cookies.my_theme === undefined) {
      setCookie('my_theme', true, { path: '/' });
      return lightTheme;
    }
    else {
      if (cookies.my_theme) return lightTheme;
      else return darkTheme;
    }
  });

  function changeTheme() {
    if (selectedTheme === lightTheme) setSelectedTheme(darkTheme);
    else setSelectedTheme(lightTheme);
    setCookie('my_theme', selectedTheme === lightTheme ? false : true, { path: '/' });
  }

  const [header] = useState(0);
  function RenderHeader() {
    if (header) {
      return <MyHeader selectedTheme={selectedTheme === lightTheme ? true : false} changeTheme={changeTheme} />
    }
    else {
      return <MyHeader selectedTheme={selectedTheme === lightTheme ? true : false} changeTheme={changeTheme} />
    }
  }


  return (
    <ThemeProvider theme={selectedTheme}>
      <BrowserRouter>
        <RenderHeader />
        <Routes>
          <Route path="/" element={
            <div>
              <HomePage />
            </div>}
          />
          <Route path="/upload-images" element={
            <div>
              <UploadImagesPage/>
            </div>}
          />
          <Route path="/create-project" element={
            <div>
              <CreateProjectPage/>
            </div>}
          />
          <Route path="/working-field" element={
            <div>
              <WorkingPage/>
            </div>}
          />
          <Route path="/welcome" element={
            <div>
              <WelcomePage />
            </div>}
          />
          <Route path="/login" element={
            <div>
              <LoginPage />
            </div>}
          />
          <Route path="/registration" element={
            <div>
              <RegistrationPage />
            </div>
          } />
          <Route path="/about" element={
            <div>
              <AboutPage />
            </div>}
          />
          <Route path="/profile" element={
            <div>
              <ProfilePage />
            </div>}
          />

        </Routes>
      </BrowserRouter>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
