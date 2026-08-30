import { SafeArea } from "@apps-in-toss/web-framework";

export type Insets = { top: number; bottom: number; left: number; right: number };

const ZERO: Insets = { top: 0, bottom: 0, left: 0, right: 0 };

export function readSafeArea(): Insets {
  try {
    const insets = SafeArea.get();
    if (
      insets &&
      typeof insets.top === "number" &&
      typeof insets.bottom === "number"
    ) {
      return insets;
    }
  } catch {
    /* 호스트 미주입 */
  }
  return ZERO;
}
