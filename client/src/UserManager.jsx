import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [signinLoading, setSigninLoading] = useState(false);
  const [signuploading, setSignupLoading] = useState(false);
  const [user, setUser] = useState({});
  const [subscribed, setSubscribed] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [agent, setAgent] = useState(false);
  const [allTickets, setAllTickets] = useState([]); // Refactor
  const [openTickets, setOpenTickets] = useState([]); // Refactor
  const [closedTickets, setClosedTickets] = useState([]); // Refactor

  const loginUser = (usrObj, role) => {
    setUser(usrObj);

    switch (role) {
      case 'admin':
        setAdmin(true);
        break;
      case 'agent':
        setAgent(true);
        break;
      default:
        setSubscribed(true);
    }
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
  const makeAllTickets = (ticketArr) => {
    setAllTickets(ticketArr);
  };
  const makeStatusTickets = (ticket, status) =>{
    if (status === 'open') {
      setOpenTickets([...openTickets, ticket]);
    } else {
      setClosedTickets([...closedTickets, ticket]);
    }
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

      allTickets,
      openTickets,
      closedTickets,
      makeAllTickets,
      makeStatusTickets,
    }}>
      {children}
    </UserContext.Provider>
  );
}
