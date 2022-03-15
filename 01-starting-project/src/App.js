import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContex from './store/auth-contex';

function App() {

  // state will be refreshed when refreshing the bage => loging info will be lost
  // we need to check if there was a user logged in before
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() =>{
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if(storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
      }
  }, [] // [] => if logged in before run useEffect only once 
  );

  const loginHandler = (email, password) => {
    // We should of course check the DB for valid email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1'); // stor isLoggedIn = 1 in local storage
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
        // all components wrapped with this contex and their children also
        // will have acces to what is stored in it 
        // the value attribute is the data will be shared with other components
        // here we are passing the logged in state and also the log out handler FUNCTION
        // so all components know if we logged in and also we can logout from any where
      <AuthContex.Provider
        value={{
          isLoggedIn: isLoggedIn,
          onLogout: logoutHandler
        }}
      >
        <MainHeader/>
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContex.Provider>
  );
}

export default App;
