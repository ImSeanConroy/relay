import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

interface ThemeCnotextType {
  theme: string;
  setTheme: (newTheme: string) => void;
}

const ThemeContext = createContext<ThemeCnotextType | undefined>(undefined);

export const useThemeContext = (): ThemeCnotextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeContent must be used within a ThemeContextProvider"
    );
  }
  return context;
};

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const storedTheme = localStorage.getItem("chat-theme") || "coffee";
  const [theme, setTheme] = useState(storedTheme);

  const setThemeAndPersist = (newTheme: string) => {
    localStorage.setItem("chat-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeAndPersist }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
