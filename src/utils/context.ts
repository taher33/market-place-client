import { createContext, useContext } from "react";
import { Search, State } from "./types";

export const AppContext = createContext<State>({} as State);

export function useAppContext() {
  return useContext(AppContext);
}

export const searchCtx = createContext<Search>({});

export function useSearchCtx() {
  return useContext(searchCtx);
}
