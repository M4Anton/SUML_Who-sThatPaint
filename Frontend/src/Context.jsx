import { createContext, useState } from "react";
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

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { AppContext, AppContextProvider, UserContext, UserContextProvider };
