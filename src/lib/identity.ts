import { User } from "@apps-in-toss/web-framework";
import { kv } from "./kv.ts";

const LOCAL_KEY = "mm:anon-key";

export async function getAnonymousUserKey(): Promise<string> {
  try {
    if (User.getAnonymousKey.isSupported()) {
      const result = await User.getAnonymousKey();
      if (result?.type === "HASH" && result.hash) {
        return result.hash;
      }
    }
  } catch {
    /* 브라우저·미지원 버전 */
  }

  const existing = await kv.getItem(LOCAL_KEY);
  if (existing) {
    return existing;
  }

  const created =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? `local-${crypto.randomUUID()}`
      : `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  await kv.setItem(LOCAL_KEY, created);
  return created;
}
