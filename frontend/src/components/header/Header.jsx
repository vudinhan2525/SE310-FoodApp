import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";

export default function Header() {
  const { setShowLoginModal, isLoggedIn } = useContext(AuthContext);
  return (
    <div className="flex px-24 justify-between">
      <p>Header</p>
      <div
        className="cursor-pointer"
        onClick={() => {
          if (!isLoggedIn) {
            setShowLoginModal(true);
          }
        }}
      >
        Login
      </div>
    </div>
  );
}
