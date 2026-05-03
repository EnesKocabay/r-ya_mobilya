import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Şimdilik Firebase'i bekleme, direkt içeri al
  const [user, setUser] = useState({ name: "Enes" }); 
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);