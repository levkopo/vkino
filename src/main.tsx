import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {StoreContext, rootStore} from "./stores";
import {AdaptivityProvider, ConfigProvider} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <StoreContext value={rootStore}>
            <ConfigProvider>
                <AdaptivityProvider>
                    <App />
                </AdaptivityProvider>
            </ConfigProvider>
        </StoreContext>
    </BrowserRouter>
  </StrictMode>,
)
