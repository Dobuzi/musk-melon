import { adaptive } from "@toss/tds-colors";
import { BoardRow, Button, ListHeader, Paragraph, Post, Top } from "@toss/tds-mobile";
import { useEffect } from "react";
import { masterPlans } from "../data/content.ts";
import { trackScreen } from "../lib/analytics.ts";

type Props = {
  onOpenPost: (postId: string) => void;
};

export function MasterPlanScreen({ onOpenPost }: Props) {
  useEffect(() => {
    trackScreen("masterplan");
  }, []);

  return (
    <>
      <Top
        title={<Top.TitleParagraph size={22}>마스터플랜</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph size={15}>
            2006 · 2016 · 2023 공개 요지 요약
          </Top.SubtitleParagraph>
        }
      />
      <div style={{ padding: "0 24px 16px" }}>
        <Paragraph.Text typography="t6" color={adaptive.grey600}>
          테슬라 블로그와 인베스터 데이에서 공개된 뼈대를 우리말로 다시 썼습니다. 긴 원문을
          복사하지 않았고, 수치·일정은 회사 자료를 따라야 합니다.
        </Paragraph.Text>
      </div>

      {masterPlans.map((plan) => (
        <div key={plan.id} style={{ marginBottom: 8 }}>
          <ListHeader
            title={
              <ListHeader.TitleParagraph color={adaptive.grey800}>
                {plan.title}
              </ListHeader.TitleParagraph>
            }
            description={
              <ListHeader.DescriptionParagraph>{plan.subtitle}</ListHeader.DescriptionParagraph>
            }
            descriptionPosition="bottom"
          />
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <BoardRow title="요지 펼쳐 보기" initialOpened>
              {plan.points.map((point) => (
                <BoardRow.Text key={point}>{`· ${point}`}</BoardRow.Text>
              ))}
              <BoardRow.Text>{plan.note}</BoardRow.Text>
            </BoardRow>
          </ul>
          <div style={{ padding: "8px 24px 16px" }}>
            <Button size="medium" variant="weak" display="block" onClick={() => onOpenPost(plan.postId)}>
              이 플랜 글로 열기
            </Button>
          </div>
        </div>
      ))}

      <div style={{ padding: "8px 24px 32px" }}>
        <Post.H4>비전과 맞물리는 두 축</Post.H4>
        <Post.Paragraph>
          마스터플랜은 지구 위의 에너지·이동을 지속 가능하게 바꾸자는 그림입니다. 그와 별도로,
          스페이스X 쪽 서사는 화성을 포함한 다행성 거점을 말합니다. 둘 다 ‘문명이 한 가지 방식,
          한 행성에만 묶이지 않게 하자’는 문제로 자주 묶여 이야기됩니다.
        </Post.Paragraph>
      </div>
    </>
  );
}
