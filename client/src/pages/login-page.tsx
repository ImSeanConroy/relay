import { useAuthContext } from "@/context/auth-context";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isLoading, login } = useAuthContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className="flex flex-col items-center content-center">
      <h1>Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

        <Link to={"/register"}>Don't have an account?</Link>

        <div>
          <button>{isLoading ? "Laoding..." : "Login"}</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

