import { useCallback, useEffect, useState } from "react";
import { socialStore } from "../lib/social.ts";
import type { Comment } from "../types.ts";

export function useComments(postId: string, userKey: string | null) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async () => {
    const next = await socialStore.listComments(postId);
    setComments(next);
  }, [postId]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const add = useCallback(
    async (body: string) => {
      if (!userKey) {
        return;
      }
      setBusy(true);
      try {
        await socialStore.addComment(postId, userKey, body);
        await reload();
      } finally {
        setBusy(false);
      }
    },
    [postId, reload, userKey],
  );

  const remove = useCallback(
    async (commentId: string) => {
      if (!userKey) {
        return;
      }
      setBusy(true);
      try {
        await socialStore.deleteComment(postId, commentId, userKey);
        await reload();
      } finally {
        setBusy(false);
      }
    },
    [postId, reload, userKey],
  );

  return { comments, busy, add, remove };
}
