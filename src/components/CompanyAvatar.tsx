import { adaptive } from "@toss/tds-colors";
import type { CompanyId } from "../types.ts";

const PALETTE: Record<CompanyId, { bg: string; fg: string }> = {
  tesla: { bg: adaptive.red50, fg: adaptive.red600 },
  spacex: { bg: adaptive.blue50, fg: adaptive.blue600 },
  xai: { bg: adaptive.purple50, fg: adaptive.purple600 },
  neuralink: { bg: adaptive.teal50, fg: adaptive.teal600 },
  boring: { bg: adaptive.orange50, fg: adaptive.orange600 },
  x: { bg: adaptive.grey100, fg: adaptive.grey700 },
};

type Props = {
  companyId: CompanyId;
  letter: string;
  size?: number;
};

export function CompanyAvatar({ companyId, letter, size = 40 }: Props) {
  const palette = PALETTE[companyId];
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: 12,
        backgroundColor: palette.bg,
        color: palette.fg,
        fontWeight: 700,
        fontSize: size * 0.42,
        flexShrink: 0,
      }}
    >
      {letter}
    </span>
  );
}
