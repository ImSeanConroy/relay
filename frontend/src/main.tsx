import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context.tsx";
import { ConversationContextProvider } from "./context/conversation-context.tsx";
import { SocketContextProvider } from "./context/socket-context.tsx";
import { ThemeContextProvider } from "./context/theme-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <SocketContextProvider>
            <ConversationContextProvider>
              <App />
            </ConversationContextProvider>
          </SocketContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>
);
