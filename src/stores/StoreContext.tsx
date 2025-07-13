import {createContext, useContext} from 'react';
import {RootStore} from './RootStore';

export const StoreContext = createContext<RootStore | null>(null);

export const useStore = () => {
    const context = useContext(StoreContext);
    if (context === null) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};