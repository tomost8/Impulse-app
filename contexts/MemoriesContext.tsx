import React, { createContext, useContext, useState, useCallback } from 'react';

type Session = { ids: number[]; index: number };
type Ctx = {
  session: Session | null;
  setSession: (s: Session | null) => void;
  setIndex: (i: number) => void;
  getPrevId: () => number | null;
  getNextId: () => number | null;
};

const C = createContext<Ctx>({
  session: null,
  setSession: () => {},
  setIndex: () => {},
  getPrevId: () => null,
  getNextId: () => null,
});

export const MemoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  const setIndex = useCallback((i: number) => setSession(s => (s ? { ...s, index: i } : s)), []);
  const getPrevId = () => (session && session.index > 0 ? session.ids[session.index - 1] : null);
  const getNextId = () => (session && session.index < session.ids.length - 1 ? session.ids[session.index + 1] : null);

  return (
    <C.Provider value={{ session, setSession, setIndex, getPrevId, getNextId }}>
      {children}
    </C.Provider>
  );
};

export const useMemoriesNav = () => useContext(C);