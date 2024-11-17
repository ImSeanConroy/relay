import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context.tsx";
import { ConversationContextProvider } from "./context/conversation-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ConversationContextProvider>
          <App />
        </ConversationContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
