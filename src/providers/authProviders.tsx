import { createContext, useContext, useState } from "react";
import { User } from "../models/user";

type AuthData = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
