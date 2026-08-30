import { adaptive } from "@toss/tds-colors";
import { List, ListHeader, ListRow, Paragraph, Top } from "@toss/tds-mobile";
import { useEffect, useMemo } from "react";
import { timeline } from "../data/content.ts";
import { trackScreen } from "../lib/analytics.ts";

type Props = {
  onOpenPost: (postId: string) => void;
};

export function TimelineScreen({ onOpenPost }: Props) {
  useEffect(() => {
    trackScreen("timeline");
  }, []);

  const years = useMemo(() => {
    const map = new Map<number, typeof timeline>();
    for (const item of timeline) {
      const list = map.get(item.year) ?? [];
      list.push(item);
      map.set(item.year, list);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, []);

  return (
    <>
      <Top
        title={<Top.TitleParagraph size={22}>연대기</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph size={15}>
            페이팔 시절부터 테슬라·스페이스X·xAI까지
          </Top.SubtitleParagraph>
        }
      />
      <div style={{ padding: "0 24px 8px" }}>
        <Paragraph.Text typography="t6" color={adaptive.grey600}>
          공개된 이정표만 연도 순으로 모아 두었습니다. 글이 있는 항목을 누르면 상세에서 좋아요와
          댓글을 남길 수 있습니다.
        </Paragraph.Text>
      </div>
      {years.map(([year, items]) => (
        <section key={year} id={`year-${year}`}>
          <ListHeader
            title={
              <ListHeader.TitleParagraph color={adaptive.grey800}>{year}</ListHeader.TitleParagraph>
            }
          />
          <List>
            {items.map((item) => (
              <ListRow
                key={item.id}
                withTouchEffect={Boolean(item.postId)}
                arrowType={item.postId ? "right" : undefined}
                onClick={item.postId ? () => onOpenPost(item.postId!) : undefined}
                contents={
                  <ListRow.Texts type="2RowTypeA" top={item.title} bottom={item.summary} />
                }
              />
            ))}
          </List>
        </section>
      ))}
    </>
  );
}
