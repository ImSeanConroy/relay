import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import HomePage from "./pages/home-page.tsx";
import LoginPage from "./pages/login-page.tsx";
import RegisterPage from "./pages/register-page.tsx";
import { useAuthContext } from "./context/auth-context.tsx";

function App() {
  const { authUser, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white dark:bg-[#313338]">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route
            path="/"
            index
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register"
            element={!authUser ? <RegisterPage /> : <Navigate to={"/"} />}
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
