import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { loadUserAtom } from "../store/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const loadUser = useSetAtom(loadUserAtom);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return children;
};
