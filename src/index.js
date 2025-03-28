import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MyHeader from './components/Header/MyHeader';
import MyFooter from './components/Footer/MyFooter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <MyHeader />
        <App />
        <MyFooter />
    </div>
);
