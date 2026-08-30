import { Storage } from "@apps-in-toss/web-framework";

/**
 * 키-값 저장소. Toss Storage를 우선 사용하고, 브릿지가 없으면 localStorage.
 * 나중에 Supabase 등 원격 백엔드로 교체해도 UI는 이 인터페이스만 보면 됩니다.
 */
export type KvStore = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

function localFallback(): KvStore {
  return {
    async getItem(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    async setItem(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        /* private mode 등 */
      }
    },
    async removeItem(key) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
    },
  };
}

function tossStorage(): KvStore {
  const fallback = localFallback();
  return {
    async getItem(key) {
      try {
        const value = await Storage.getItem(key);
        return value;
      } catch {
        return fallback.getItem(key);
      }
    },
    async setItem(key, value) {
      try {
        await Storage.setItem(key, value);
      } catch {
        await fallback.setItem(key, value);
      }
    },
    async removeItem(key) {
      try {
        await Storage.removeItem(key);
      } catch {
        await fallback.removeItem(key);
      }
    },
  };
}

export const kv: KvStore = typeof window === "undefined" ? localFallback() : tossStorage();
