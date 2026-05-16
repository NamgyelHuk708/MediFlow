import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [userName, setUserName] = useState('');
  const [userCID, setUserCID] = useState('');
  const [appointment, setAppointment] = useState(null);
  // registered users store: [{ name, cid }]
  const [users, setUsers] = useState([]);

  function registerUser(name, cid) {
    setUsers(prev => [...prev, { name, cid }]);
    setUserName(name);
    setUserCID(cid);
  }

  function loginUser(cid) {
    const found = users.find(u => u.cid === cid);
    if (found) {
      setUserName(found.name);
      setUserCID(found.cid);
      return { ok: true };
    }
    return { ok: false, error: 'No account found for this CID. Please register first.' };
  }

  return (
    <AppContext.Provider value={{
      userName, setUserName,
      userCID,
      appointment, setAppointment,
      users,
      registerUser,
      loginUser,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
