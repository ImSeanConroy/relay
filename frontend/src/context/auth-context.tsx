import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import Alert from "@/components/alert";

type AuthUserType = {
  id: string;
  fullname: string;
  email: string;
  profilePicture: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type LoginInputs = {
  email: string;
  password: string;
};

type SignupInputs = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ProfileInputs = {
  email?: string;
  fullname?: string;
  status?: string
}

type AuthContextType = {
  authUser: AuthUserType | null;
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
  isLoading: boolean;
  login: (inputs: LoginInputs) => Promise<void>;
  logout: () => Promise<void>;
  signup: (inputs: SignupInputs) => Promise<void>;
  updateProfile: (inputs: ProfileInputs) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  updateProfile: async () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch("/api/auth/profile");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }

        setAuthUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  const login = async (inputs: LoginInputs) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.custom(() => (
          <Alert message={data.error} type="error" />
        ))
        throw new Error(data.error);
      }

      setAuthUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (inputs: SignupInputs) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.custom(() => (
          <Alert message={data.error} type="error" />
        ))
        throw new Error(data.error);
      }

      setAuthUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.custom(() => (
          <Alert message={data.error} type="error" />
        ))
        throw new Error(data.error);
      }

      setAuthUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (inputs: ProfileInputs) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),

      });
      const data = await res.json();

      if (!res.ok) {
        toast.custom(() => (
          <Alert message={data.error} type="error" />
        ))
        throw new Error(data.error);
      } else {
        toast.custom(() => (
          <Alert message="Update Successful!" type="success" />
        ))
      }

      setAuthUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, isLoading, login, logout, signup, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

