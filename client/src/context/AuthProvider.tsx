import { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthProviderContext = createContext<
  | {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logOutUser: () => void
  }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cookies, setCookies, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();

  const logOutUser = () => {
    setUser(null)
    removeCookie('user')
    setCookies("user", null)
  }

  useEffect(() => {
    if (cookies && cookies.user) {
      setUser(cookies.user);
    }
    else {
      setUser(null)
    }
  }, [cookies.user, navigate]);

  return (
    <AuthProviderContext.Provider value={{ user, logOutUser, setUser }}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
