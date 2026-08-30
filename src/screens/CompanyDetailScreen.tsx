import { adaptive } from "@toss/tds-colors";
import {
  List,
  ListHeader,
  ListRow,
  Paragraph,
  Post,
  TopNavigation,
  TopNavigationBackButton,
} from "@toss/tds-mobile";
import { useEffect } from "react";
import { CompanyAvatar } from "../components/CompanyAvatar.tsx";
import { companyById, postById } from "../data/content.ts";
import { trackScreen } from "../lib/analytics.ts";
import type { CompanyId } from "../types.ts";

type Props = {
  companyId: CompanyId;
  onBack: () => void;
  onOpenPost: (postId: string) => void;
};

export function CompanyDetailScreen({ companyId, onBack, onOpenPost }: Props) {
  const company = companyById[companyId];

  useEffect(() => {
    trackScreen(`company_${companyId}`);
  }, [companyId]);

  if (!company) {
    return null;
  }

  return (
    <>
      <TopNavigation
        withSafeAreaTop={false}
        leading={<TopNavigationBackButton aria-label="뒤로" onClick={onBack} />}
        content={company.name}
      />
      <div style={{ padding: "16px 24px 8px", display: "flex", gap: 14, alignItems: "center" }}>
        <CompanyAvatar companyId={company.id} letter={company.letter} size={52} />
        <div>
          <Paragraph.Text typography="t4" fontWeight="bold" color={adaptive.grey900}>
            {company.name}
          </Paragraph.Text>
          <div />
          <Paragraph.Text typography="t6" color={adaptive.grey600}>
            {company.nameEn} · {company.foundedLabel}
          </Paragraph.Text>
        </div>
      </div>

      <div style={{ padding: "8px 24px 16px" }}>
        <Post.H4>무엇을 하는 회사인가</Post.H4>
        <Post.Paragraph>{company.about}</Post.Paragraph>
        <Post.H4>왜 시작했나</Post.H4>
        <Post.Paragraph>{company.whyStarted}</Post.Paragraph>
        <Post.H4>주요 제품 · 활동</Post.H4>
        <Post.Ul>
          {company.products.map((item) => (
            <Post.Li key={item}>{item}</Post.Li>
          ))}
        </Post.Ul>
      </div>

      <ListHeader
        title={
          <ListHeader.TitleParagraph color={adaptive.grey800}>관련 연대기</ListHeader.TitleParagraph>
        }
        description={
          <ListHeader.DescriptionParagraph>
            눌러 글 상세에서 좋아요·댓글을 남길 수 있습니다
          </ListHeader.DescriptionParagraph>
        }
        descriptionPosition="bottom"
      />
      <List>
        {company.milestonePostIds.map((postId) => {
          const post = postById[postId];
          if (!post) {
            return null;
          }
          return (
            <ListRow
              key={post.id}
              withTouchEffect
              arrowType="right"
              onClick={() => onOpenPost(post.id)}
              contents={
                <ListRow.Texts type="2RowTypeA" top={post.dateLabel} bottom={post.title} />
              }
            />
          );
        })}
      </List>
    </>
  );
}
