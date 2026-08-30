import { adaptive } from "@toss/tds-colors";
import { List, ListHeader, ListRow, Top } from "@toss/tds-mobile";
import { useEffect } from "react";
import { CompanyAvatar } from "../components/CompanyAvatar.tsx";
import { companies } from "../data/content.ts";
import { trackScreen } from "../lib/analytics.ts";
import type { CompanyId } from "../types.ts";

type Props = {
  onOpenCompany: (companyId: CompanyId) => void;
};

export function CompaniesScreen({ onOpenCompany }: Props) {
  useEffect(() => {
    trackScreen("companies");
  }, []);

  return (
    <>
      <Top
        title={<Top.TitleParagraph size={22}>기업</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph size={15}>
            머스크가 세우거나 이끄는 회사 · 비공식 정리
          </Top.SubtitleParagraph>
        }
      />
      <ListHeader
        title={
          <ListHeader.TitleParagraph color={adaptive.grey800}>여섯 곳</ListHeader.TitleParagraph>
        }
        description={
          <ListHeader.DescriptionParagraph>
            로고 없이 이름과 공개 사실만 적습니다
          </ListHeader.DescriptionParagraph>
        }
        descriptionPosition="bottom"
      />
      <List>
        {companies.map((company) => (
          <ListRow
            key={company.id}
            withTouchEffect
            arrowType="right"
            verticalPadding="xlarge"
            onClick={() => onOpenCompany(company.id)}
            left={<CompanyAvatar companyId={company.id} letter={company.letter} />}
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top={company.name}
                bottom={`${company.tagline} · ${company.foundedLabel}`}
              />
            }
          />
        ))}
      </List>
    </>
  );
}
