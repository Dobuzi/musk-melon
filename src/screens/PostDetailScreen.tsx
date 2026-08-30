import { adaptive } from "@toss/tds-colors";
import {
  Badge,
  Paragraph,
  Post,
  TopNavigation,
  TopNavigationBackButton,
} from "@toss/tds-mobile";
import { useEffect } from "react";
import { CommentSection } from "../components/CommentSection.tsx";
import { LikeButton } from "../components/LikeButton.tsx";
import { postById } from "../data/content.ts";
import { trackScreen } from "../lib/analytics.ts";

type Props = {
  postId: string;
  userKey: string | null;
  onBack: () => void;
};

export function PostDetailScreen({ postId, userKey, onBack }: Props) {
  const post = postById[postId];

  useEffect(() => {
    trackScreen("post_detail");
  }, [postId]);

  if (!post) {
    return (
      <>
        <TopNavigation
          withSafeAreaTop={false}
          leading={<TopNavigationBackButton aria-label="뒤로" onClick={onBack} />}
          content="글 상세"
        />
        <div style={{ padding: 24 }}>
          <Paragraph.Text typography="t5" color={adaptive.grey600}>
            글을 찾을 수 없습니다.
          </Paragraph.Text>
        </div>
      </>
    );
  }

  return (
    <>
      <TopNavigation
        withSafeAreaTop={false}
        leading={<TopNavigationBackButton aria-label="뒤로" onClick={onBack} />}
        content="글 상세"
      />
      <div style={{ padding: "12px 24px 8px" }}>
        <Paragraph.Text typography="t7" color={adaptive.grey500}>
          {post.dateLabel}
        </Paragraph.Text>
        <Post.H2>{post.title}</Post.H2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "8px 0 16px" }}>
          {post.tags.map((tag) => (
            <Badge key={tag} size="small" variant="weak" color="green">
              {tag}
            </Badge>
          ))}
        </div>
        {post.body.split("\n\n").map((paragraph) => (
          <Post.Paragraph key={paragraph.slice(0, 24)}>{paragraph}</Post.Paragraph>
        ))}
      </div>
      <div style={{ padding: "8px 24px 16px" }}>
        <LikeButton postId={post.id} userKey={userKey} />
      </div>
      <CommentSection postId={post.id} userKey={userKey} />
    </>
  );
}
