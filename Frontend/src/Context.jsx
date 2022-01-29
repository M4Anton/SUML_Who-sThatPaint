import { createContext, useEffect, useState } from "react";
const AppContext = createContext();
const UserContext = createContext();

function AppContextProvider({ children }) {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <AppContext.Provider
      value={{
        showLoginPopup,
        setShowLoginPopup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function UserContextProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (userData.id) setAuth(true);
    else setAuth(false);
  }, [userData]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        auth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { AppContext, AppContextProvider, UserContext, UserContextProvider };
