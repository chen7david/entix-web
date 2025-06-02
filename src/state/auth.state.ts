import { atomWithStorage } from "jotai/utils";
import { STORAGE_KEYS } from "../constants/keys.constants";

export const accessTokenAtom = atomWithStorage<string | null>(
  STORAGE_KEYS.ACCESS_TOKEN,
  null,
  undefined,
  { getOnInit: true }
);

export const refreshTokenAtom = atomWithStorage<string | null>(
  STORAGE_KEYS.REFRESH_TOKEN,
  null,
  undefined,
  { getOnInit: true }
);
