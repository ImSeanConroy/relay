import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import MainLayout from "./components/main-layout";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

function App() {
  return (
    <div className="bg-white dark:bg-[#313338]">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
