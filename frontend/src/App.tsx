import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useThemeContext } from "./context/theme-context.tsx";
import AuthLayout from "./components/layouts/auth-layout.tsx";
import NonAuthLayout from "./components/layouts/non-auth-layout.tsx";
import HomePage from "./pages/home-page.tsx";
import LoginPage from "./pages/login-page.tsx";
import RegisterPage from "./pages/register-page.tsx";
import SettingsPage from "./pages/settings-page.tsx";

function App() {
  const { theme } = useThemeContext();

  return (
    <div data-theme={theme}>
      <Routes>
        {/* Authenticated Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" index element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Non-Authenticated Routes */}
        <Route element={<NonAuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
