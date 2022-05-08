import { createContext, ReactNode, useContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

const AppContext = createContext({} as any);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }: Props) {
  const [token, setToken] = useState('');
  const state = {
    token,
    setToken,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}
