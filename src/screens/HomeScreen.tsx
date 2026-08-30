import { adaptive } from "@toss/tds-colors";
import { List, ListHeader, ListRow, Top } from "@toss/tds-mobile";
import { useEffect } from "react";
import { DisclaimerCard } from "../components/DisclaimerCard.tsx";
import { PostCard } from "../components/PostCard.tsx";
import { getFeaturedPosts, masterPlans } from "../data/content.ts";
import { trackScreen } from "../lib/analytics.ts";

type Props = {
  onOpenPost: (postId: string) => void;
  onOpenMasterPlan: () => void;
};

export function HomeScreen({ onOpenPost, onOpenMasterPlan }: Props) {
  useEffect(() => {
    trackScreen("home");
  }, []);

  const featured = getFeaturedPosts();
  const visions = featured.filter((post) => post.kind === "vision");
  const highlights = featured.filter((post) => post.kind !== "vision");

  return (
    <>
      <Top
        title={<Top.TitleParagraph size={22}>머스크 멜론</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph size={15}>
            비공식 팬·정보 앱 · 비전, 기업, 연대기
          </Top.SubtitleParagraph>
        }
      />
      <DisclaimerCard />

      <ListHeader
        title={
          <ListHeader.TitleParagraph color={adaptive.grey800}>비전 한 조각</ListHeader.TitleParagraph>
        }
        description={
          <ListHeader.DescriptionParagraph>
            다행성 문명과 지속 가능한 에너지
          </ListHeader.DescriptionParagraph>
        }
        descriptionPosition="bottom"
      />
      <List>
        {visions.map((post) => (
          <PostCard key={post.id} post={post} onOpen={onOpenPost} />
        ))}
      </List>

      <ListHeader
        title={
          <ListHeader.TitleParagraph color={adaptive.grey800}>최근 하이라이트</ListHeader.TitleParagraph>
        }
        description={
          <ListHeader.DescriptionParagraph>
            공개된 연대기에서 골라 온 이정표
          </ListHeader.DescriptionParagraph>
        }
        descriptionPosition="bottom"
      />
      <List>
        {highlights.map((post) => (
          <PostCard key={post.id} post={post} onOpen={onOpenPost} />
        ))}
      </List>

      <ListHeader
        title={
          <ListHeader.TitleParagraph color={adaptive.grey800}>마스터플랜</ListHeader.TitleParagraph>
        }
        right={
          <ListHeader.RightArrow onClick={onOpenMasterPlan}>더 보기</ListHeader.RightArrow>
        }
      />
      <List>
        {masterPlans.map((plan) => (
          <ListRow
            key={plan.id}
            withTouchEffect
            arrowType="right"
            onClick={() => onOpenPost(plan.postId)}
            contents={
              <ListRow.Texts type="2RowTypeA" top={plan.dateLabel} bottom={plan.title} />
            }
          />
        ))}
      </List>
    </>
  );
}
