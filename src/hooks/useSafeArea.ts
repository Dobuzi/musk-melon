import { useEffect, useState } from "react";
import { readSafeArea, type Insets } from "../lib/safeArea.ts";

export function useSafeArea(): Insets {
  const [insets, setInsets] = useState<Insets>(() => readSafeArea());

  useEffect(() => {
    setInsets(readSafeArea());
  }, []);

  return insets;
}
