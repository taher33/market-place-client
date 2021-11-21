import { createContext, useContext } from "react";
import { State } from "./types";

export const AppContext = createContext<State>({} as State);

export function useAppContext() {
  return useContext(AppContext);
}
