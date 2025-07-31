import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const renderForm = () => {
    switch (currentForm) {
      case 'login':
        return <Login onSwitchForm={setCurrentForm} />;
      case 'register':
        return <Register onSwitchForm={setCurrentForm} />;
      case 'forgot':
        return <ForgotPassword onSwitchForm={setCurrentForm} />;
      default:
        return <Login onSwitchForm={setCurrentForm} />;
    }
  };

  return <>{renderForm()}</>;
};

export default AuthPage;
