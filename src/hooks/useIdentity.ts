import { useEffect, useState } from "react";
import { getAnonymousUserKey } from "../lib/identity.ts";

export function useIdentity() {
  const [userKey, setUserKey] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getAnonymousUserKey().then((key) => {
      if (!cancelled) {
        setUserKey(key);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return userKey;
}
