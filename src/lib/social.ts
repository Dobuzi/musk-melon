import type { Comment } from "../types.ts";
import { kv } from "./kv.ts";

export type LikeState = { count: number; liked: boolean };

export type SocialStore = {
  getLikeState: (postId: string, userKey: string) => Promise<LikeState>;
  toggleLike: (postId: string, userKey: string) => Promise<LikeState>;
  listComments: (postId: string) => Promise<Comment[]>;
  addComment: (postId: string, userKey: string, body: string) => Promise<Comment>;
  deleteComment: (postId: string, commentId: string, userKey: string) => Promise<void>;
};

function likesKey(postId: string) {
  return `mm:likes:${postId}`;
}

function commentsKey(postId: string) {
  return `mm:comments:${postId}`;
}

async function readJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await kv.getItem(key);
  if (!raw) {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function createLocalSocialStore(): SocialStore {
  return {
    async getLikeState(postId, userKey) {
      const users = await readJson<string[]>(likesKey(postId), []);
      return { count: users.length, liked: users.includes(userKey) };
    },
    async toggleLike(postId, userKey) {
      const users = await readJson<string[]>(likesKey(postId), []);
      const next = users.includes(userKey)
        ? users.filter((id) => id !== userKey)
        : [...users, userKey];
      await kv.setItem(likesKey(postId), JSON.stringify(next));
      return { count: next.length, liked: next.includes(userKey) };
    },
    async listComments(postId) {
      const comments = await readJson<Comment[]>(commentsKey(postId), []);
      return comments.slice().sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    },
    async addComment(postId, userKey, body) {
      const trimmed = body.trim();
      if (!trimmed) {
        throw new Error("empty");
      }
      const comments = await readJson<Comment[]>(commentsKey(postId), []);
      const comment: Comment = {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `c-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        postId,
        userKey,
        body: trimmed.slice(0, 500),
        createdAt: new Date().toISOString(),
      };
      await kv.setItem(commentsKey(postId), JSON.stringify([...comments, comment]));
      return comment;
    },
    async deleteComment(postId, commentId, userKey) {
      const comments = await readJson<Comment[]>(commentsKey(postId), []);
      const next = comments.filter(
        (comment) => !(comment.id === commentId && comment.userKey === userKey),
      );
      await kv.setItem(commentsKey(postId), JSON.stringify(next));
    },
  };
}

/**
 * v1은 기기 로컬(토스 Storage 또는 localStorage).
 * 서버가 생기면 이 팩토리만 Supabase 구현으로 바꾸면 됩니다.
 */
export const socialStore: SocialStore = createLocalSocialStore();
