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
import ProjectPage from "./Pages/Project/ProjectPage/ProjectPage";
import { Box } from "@mui/material";
import ProjectSettingsPage from "./Pages/Project/ProjectSettingsPage/ProjectSettingsPage";
import ProjectsPage from "./Pages/Project/ProjectsPage/ProjectsPage";
import WorkingFieldForTasks from "./Pages/Project/WorkingFieldForTasks/WorkingPage";
import Footer from "./components/Footer/MyFooter";
import VersionGeneration from "./Pages/Project/VersionGeneration/VersionGeneration";


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
    
      return (
        <Box marginBottom="1.85vh">
          <MyHeader selectedTheme={selectedTheme === lightTheme ? true : false} changeTheme={changeTheme} />
        </Box>
      );
    
  }

  return (
    <ThemeProvider theme={selectedTheme}>
      <BrowserRouter>
        <RenderHeader />
        <Routes>


          {/* +++++++++++++++++ */}
          {/* +++++++++++++++++ */}
          {/* Работа с проектом */}
          <>
            <Route path="/create-project" element={
              <div>
                <CreateProjectPage />
              </div>}
            />
            <Route path="/project" element={
              <div>
                <ProjectPage />
              </div>}
            />
            <Route path="/projects" element={
              <div>
                <ProjectsPage/>
              </div>}
            />
            <Route path="/project-settings" element={
              <div>
                <ProjectSettingsPage/>
              </div>}
            />
            <Route path="/working-field" element={
              <div>
                <WorkingPage />
              </div>}
            />
            <Route path="/task" element={
              <div>
                <WorkingFieldForTasks />
              </div>}
            />
            <Route path="/upload-images" element={
              <div>
                <UploadImagesPage />
              </div>}
            />
            <Route path="/version-generation" element={
              <div>
                <VersionGeneration />
              </div>}
            />
          </>
          {/* Работа с проектом */}
          {/* ----------------- */}
          {/* ----------------- */}



          {/* ++++++++++++++++++++++ */}
          {/* ++++++++++++++++++++++ */}
          {/* Работа с пользователем */}
          <>
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
            <Route path="/profile" element={
              <div>
                <ProfilePage />
              </div>}
            />
            <Route path="/" element={
              <div>
                <HomePage />
              </div>}
            />
          </>
          {/* Работа с пользователем */}
          {/* ---------------------- */}
          {/* ---------------------- */}



          <Route path="/about" element={
            <div>
              <AboutPage />
            </div>}
          />
          <Route path="/welcome" element={
            <div>
              <WelcomePage />
            </div>}
          />

        </Routes>
      </BrowserRouter>
      <Footer/>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
