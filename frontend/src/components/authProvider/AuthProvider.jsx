import authApi from "@/apis/authApi";
import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };
  const ckLogged = async () => {
    const response = await authApi.isLoggedIn();
    if (response.message === "success") {
      setIsLoggedIn(true);
      setUserData(response.user);
    }

    setLoading(false);
  };
  useEffect(() => {
    ckLogged();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userData,
        setUserData,
        showLoginModal,
        setShowLoginModal,
        showLogoutModal,
        setShowLogoutModal,
      }}
    >
      {loading ? <div></div> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
