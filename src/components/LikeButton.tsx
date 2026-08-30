import { Button } from "@toss/tds-mobile";
import { useLike } from "../hooks/useLike.ts";

type Props = {
  postId: string;
  userKey: string | null;
};

export function LikeButton({ postId, userKey }: Props) {
  const { count, liked, busy, toggle } = useLike(postId, userKey);
  const label = liked ? `좋아요 취소 · ${count}` : `좋아요 · ${count}`;

  return (
    <Button
      size="medium"
      variant={liked ? "fill" : "weak"}
      display="block"
      disabled={!userKey || busy}
      onClick={() => {
        void toggle();
      }}
    >
      {label}
    </Button>
  );
}
