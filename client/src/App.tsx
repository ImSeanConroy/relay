import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

function App() {
  return (
    <div className="bg-white dark:bg-[#313338]">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
            <Route path="/" index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;