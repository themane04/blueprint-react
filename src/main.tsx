import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {ChakraProvider} from "@chakra-ui/react";
import {chakraThemeConfig} from "./core/ui/configs/chakraThemeConfig.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ChakraProvider theme={chakraThemeConfig}>
            <App/>
        </ChakraProvider>
    </StrictMode>
)
