import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [signinLoading, setSigninLoading] = useState(false);
  const [signuploading, setSignupLoading] = useState(false);
  const [user, setUser] = useState({});
  const [endUser, setEndUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [agent, setAgent] = useState(false);
  const [allRequests, setAllRequests] = useState([]); // Refactor
  const [openRequests, setOpenRequests] = useState([]); // Refactor
  const [closedRequests, setClosedRequests] = useState([]); // Refactor

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
        setEndUser(true);
    }
  };
  const logoutUser = () => {
    setUser({});
    setAdmin(false);
    setAgent(false);
    setEndUser(false);
  };
  const showSigninLoading = (bool) => {
    setSigninLoading(bool);
  };
  const showSignupLoading = (bool) => {
    setSignupLoading(bool);
  };
  const makeRequests = (requestArr, status) => {
    if (status === 'open') {
      setOpenRequests(requestArr);
    } else if (status === 'closed') {
      setClosedRequests(requestArr);
    } else {
      setAllRequests(requestArr);
    }
  };

  return (
    <UserContext.Provider value={{
      signinLoading,
      showSigninLoading,

      signuploading,
      showSignupLoading,

      user,
      loginUser,
      logoutUser,
      endUser,
      agent,
      admin,

      allRequests,
      openRequests,
      closedRequests,
      makeRequests,
    }}>
      {children}
    </UserContext.Provider>
  );
}
