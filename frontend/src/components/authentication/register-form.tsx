import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useState } from "react";

import { useAuthContext } from "@/context/auth-context";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isLoading, signup } = useAuthContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({ fullname, email, password, confirmPassword: password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Full Name</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="size-5 text-base-content/40" />
          </div>
          <input
            type="text"
            className={`input input-bordered w-full pl-10 rounded-lg`}
            placeholder="John Doe"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Email</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="size-5 text-base-content/40" />
          </div>
          <input
            type="text"
            className={`input input-bordered w-full pl-10 rounded-lg`}
            placeholder="JoeDoe01"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Password</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="size-5 text-base-content/40" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            className={`input input-bordered w-full pl-10 rounded-lg`}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center rounded-lg"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="size-5 text-base-content/40" />
            ) : (
              <Eye className="size-5 text-base-content/40" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full rounded-lg"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="h-5 w-5 animate-spin" />} Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
