import { useCallback, useEffect, useState } from "react";
import { socialStore, type LikeState } from "../lib/social.ts";

const EMPTY: LikeState = { count: 0, liked: false };

export function useLike(postId: string, userKey: string | null) {
  const [state, setState] = useState<LikeState>(EMPTY);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!userKey) {
      return;
    }
    let cancelled = false;
    void socialStore.getLikeState(postId, userKey).then((next) => {
      if (!cancelled) {
        setState(next);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [postId, userKey]);

  const toggle = useCallback(async () => {
    if (!userKey || busy) {
      return;
    }
    setBusy(true);
    try {
      const next = await socialStore.toggleLike(postId, userKey);
      setState(next);
    } finally {
      setBusy(false);
    }
  }, [busy, postId, userKey]);

  return { ...state, busy, toggle };
}
