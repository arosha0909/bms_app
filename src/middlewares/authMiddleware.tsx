import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/authProviders";
import { AuthService } from "../services/authService";

const Authmiddleware = (props: any) => {
  const { user, setUser } = useAuth();
  const [localUser, setLocalUser] = useState(user);
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setIsErr] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem("ct-token"));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await AuthService.getMe();

        if (res?.success && res?.data) {
          setUser(res.data);
          setLocalUser(res.data);
        } else {
          setIsErr(true);
        }
      } catch (error) {
        setIsErr(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);


  if (!token || isErr) return <Navigate to="/sign-in" replace />;
  if (isLoading) return <div>Loading...</div>;

  return user && props.allowed.includes(user.role) ? <Outlet /> : <Navigate to="/not-found" replace />;

};

export default Authmiddleware;
