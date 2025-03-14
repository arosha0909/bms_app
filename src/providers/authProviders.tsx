import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../models/user";

export type AuthData = [User | undefined, (user: User) => void, () => void];

const AuthContext = React.createContext<AuthData>([undefined, () => {}, () => {}]);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [image, setImage] = useImage() as ImageData;
  const navigate = useNavigate();

  const clearCrispSessionLocalStorage = () => {
    const crispSessionPrefix = "crisp-client/session/";

    // Get all keys from local storage
    const keys = Object.keys(localStorage);

    // Filter and remove keys that match the Crisp session prefix
    keys.forEach(key => {
      if (key.startsWith(crispSessionPrefix)) {
        localStorage.removeItem(key);
      }
    });
  };

  const logout = () => {
    navigate(`/signin`, { replace: true });
    localStorage.removeItem("token");
    clearCrispSessionLocalStorage();
    setUser({});
    setImage({});
    //refresh the client browser after signout for safe end Crisp chat session
    window.location.reload();
  };

  return <AuthContext.Provider value={[user, setUser, logout]}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

type UserData = [User | undefined, (user: User | undefined) => void];
const UserContext = React.createContext<UserData>([undefined, () => ({})]);

export default UserContext;