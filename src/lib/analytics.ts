import { Analytics } from "@apps-in-toss/web-framework";

export function trackScreen(name: string): void {
  try {
    const result = Analytics.screen({ log_name: name });
    if (result && typeof result.catch === "function") {
      void result.catch(() => undefined);
    }
  } catch {
    /* 샌드박스·브라우저에서는 조용히 무시 */
  }
}
