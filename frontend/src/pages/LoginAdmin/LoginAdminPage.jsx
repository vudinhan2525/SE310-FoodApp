import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import ReactLoading from "react-loading";
import authApi from "@/apis/authApi";

const LoginAdminPage = () => {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem("admin", "admin");
    window.location.href = "/admin";
  };

  return (
    <div className="flex h-screen items-center justify-center gap-8 bg-gray-100">
      <img src="assets\images\login-image.png" alt="" className="hidden max-w-[100%] md:block" />
      <div className="flex w-[30%] min-w-[400px] flex-col gap-5 rounded-xl bg-white px-3 py-4 shadow-2xl">
        <div className="bg-gradient-to-r from-[#3372FE] via-[#318BEE] to-[#30A2DF] bg-clip-text text-[25px] font-semibold text-transparent">Login your account</div>
        <hr className="" />
        <input ref={usernameInput} required className="rounded-xl border border-[#D1D5DB] p-3 text-[16px] caret-[#318BEE] focus:outline-[#318BEE]" placeholder="Username" />
        <input
          ref={passwordInput}
          required
          type="password"
          className="rounded-xl border border-[#D1D5DB] p-3 text-[16px] caret-[#318BEE] focus:outline-[#318BEE]"
          placeholder="Password"
        />
        <button
          className={cn("flex h-[50px] justify-center rounded-xl p-3 text-[16px] text-white", isLoading ? "cursor-default bg-gray-500" : "cursor-pointer bg-[#3371FF]")}
          type="submit"
          onClick={handleLogin}
        >
          {isLoading ? <ReactLoading type="spin" width={"25px"} height={"25px"} /> : "Sign in"}
        </button>
        <p className={cn("flex self-center text-[12px] font-light text-red-600", isIncorrect ? "block" : "hidden")}>Your password or username is incorrect</p>
      </div>
    </div>
  );
};

export default LoginAdminPage;
