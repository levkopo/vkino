import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {StoreContext} from "./stores/StoreContext.tsx";
import {rootStore} from "./stores/RootStore.ts";
import {AdaptivityProvider, ConfigProvider} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';
import './index.css'

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
