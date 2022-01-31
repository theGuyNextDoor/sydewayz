import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [signinLoading, setSigninLoading] = useState(false);
  const [signuploading, setSignupLoading] = useState(false);
  const [user, setUser] = useState({});
  const [subscribed, setSubscribed] = useState(false);
  const [allTickets, setAllTickets] = useState([]); // Refactor
  const [openTickets, setOpenTickets] = useState([]); // Refactor
  const [closedTickets, setCLosedTickets] = useState([]); // Refactor

  const loginUser = (usrObj) => {
    setUser(usrObj);
    setSubscribed(true);
  };
  const logoutUser = () => {
    setUser({});
    setSubscribed(false);
  };
  const showSigninLoading = (bool) => {
    setSigninLoading(bool);
  };
  const showSignupLoading = (bool) => {
    setSignupLoading(bool);
  };
  const makeTickets = (ticketArr) => { // Refactor
    setOpenTickets(ticketArr);
  };

  return (
    <UserContext.Provider value={{
      signinLoading,
      showSigninLoading,
      signuploading,
      showSignupLoading,
      loginUser,
      logoutUser,
      user,
      subscribed,

      openTickets,
      makeTickets
    }}>
      {children}
    </UserContext.Provider>
  );
}
