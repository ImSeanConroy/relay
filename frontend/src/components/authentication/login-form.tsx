import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";

import { useAuthContext } from "@/context/auth-context";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isLoading, login } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Username</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-base-content/40" />
          </div>
          <input
            type="text"
            placeholder="JoeDoe01"
            className={`input input-bordered w-full pl-10`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Password</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-base-content/40" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            className={`input input-bordered w-full pl-10`}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-base-content/40" />
            ) : (
              <Eye className="h-5 w-5 text-base-content/40" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="h-5 w-5 animate-spin" />} Log in
      </button>
    </form>
  );
};

export default LoginForm;
