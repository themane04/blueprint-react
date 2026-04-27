import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";
import "./i18n";
import theme from "./theme";
import { customColorModeManager } from "./theme/manager";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider
      theme={theme}
      colorModeManager={customColorModeManager}
    >
      <App />
    </ChakraProvider>
  </StrictMode>
);
