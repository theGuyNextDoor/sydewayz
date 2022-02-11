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
  const [allRequests, setAllRequests] = useState([]);
  const [openRequests, setOpenRequests] = useState([]);
  const [closedRequests, setClosedRequests] = useState([]);

  const handleMessage = (message) => {
    alert(message); // CREATE CUSTOM ALERT
  };

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
  const addRequest = (request) => {
    setAllRequests([...allRequests, request]);
    setOpenRequests([...openRequests, request]);
  };

  return (
    <UserContext.Provider value={{
      handleMessage,

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
      addRequest,
    }}>
      {children}
    </UserContext.Provider>
  );
}
