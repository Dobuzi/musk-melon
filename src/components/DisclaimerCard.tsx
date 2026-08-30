import { adaptive } from "@toss/tds-colors";
import { Paragraph } from "@toss/tds-mobile";
import { DISCLAIMER } from "../data/content.ts";

export function DisclaimerCard() {
  return (
    <div
      style={{
        margin: "8px 20px 16px",
        padding: "14px 16px",
        borderRadius: 16,
        backgroundColor: adaptive.grey50,
      }}
    >
      <Paragraph.Text
        typography="t7"
        color={adaptive.grey600}
        fontWeight="medium"
        style={{ display: "block", marginBottom: 6 }}
      >
        비공식 앱
      </Paragraph.Text>
      <Paragraph.Text typography="t6" color={adaptive.grey700}>
        {DISCLAIMER}
      </Paragraph.Text>
    </div>
  );
}
