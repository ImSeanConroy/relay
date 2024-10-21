import { ModeToggle } from "./components/mode-toggle"
import { ThemeProvider } from "@/components/providers/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <ModeToggle />
    </ThemeProvider>
  )
}

export default App
