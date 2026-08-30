import { ListRow } from "@toss/tds-mobile";
import type { Post } from "../types.ts";
import { CompanyAvatar } from "./CompanyAvatar.tsx";
import { companyById } from "../data/content.ts";

type Props = {
  post: Post;
  onOpen: (postId: string) => void;
};

export function PostCard({ post, onOpen }: Props) {
  const primary = post.companyIds[0];
  const company = primary ? companyById[primary] : undefined;

  return (
    <ListRow
      onClick={() => onOpen(post.id)}
      withTouchEffect
      arrowType="right"
      verticalPadding="large"
      left={
        company ? (
          <CompanyAvatar companyId={company.id} letter={company.letter} />
        ) : undefined
      }
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={post.dateLabel}
          middle={post.title}
          bottom={post.summary}
        />
      }
    />
  );
}
