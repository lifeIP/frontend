import "./App.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./components/Form/Login";
import Registration from "./components/Form/Registration";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [theme, setTheme] = useState(darkTheme);


  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={
              <div>
                <Login />
              </div>}
            />
            <Route path="/registration" element={
              <div>
                <Registration />
              </div>
            } />
            
          </Routes>
        </BrowserRouter>
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;
