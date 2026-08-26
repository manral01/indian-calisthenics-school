import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Analytics } from "@vercel/analytics/react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { Home } from "./pages/Home";
import { TrainingPage } from "./components/TrainingPage";

function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderContent = () => {
    if (currentPath === "/training/calisthenics") {
      return (
        <TrainingPage
          programId="calisthenics"
          onNavigateHome={() => navigateTo("/")}
        />
      );
    }
    if (currentPath === "/training/kids") {
      return (
        <TrainingPage
          programId="kids"
          onNavigateHome={() => navigateTo("/")}
        />
      );
    }
    return <Home onNavigate={navigateTo} />;
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {renderContent()}
      <Analytics />
    </ThemeProvider>
  );
}

export default App;
