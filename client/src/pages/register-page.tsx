import { useAuthContext } from "@/context/auth-context";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { isLoading, signup } = useAuthContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({ fullname, username, password, confirmPassword });
  };

  return (
    <div className="flex flex-col items-center content-center">
      <h1>Register</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="border-zinc-500 border"
          />
        </div>
        <div className="flex flex-col">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-zinc-500 border"
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-zinc-500 border"
          />
        </div>
        <div className="flex flex-col">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-zinc-500 border"
          />
        </div>

        <Link to={"/login"}>Already have an account?</Link>

        <div>
          <button>{isLoading ? "Laoding..." : "Sign Up"}</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

