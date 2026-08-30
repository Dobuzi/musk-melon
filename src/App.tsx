import { Tab } from "@toss/tds-mobile";
import { useCallback, useMemo, useState } from "react";
import { useIdentity } from "./hooks/useIdentity.ts";
import { useSafeArea } from "./hooks/useSafeArea.ts";
import { CompaniesScreen } from "./screens/CompaniesScreen.tsx";
import { CompanyDetailScreen } from "./screens/CompanyDetailScreen.tsx";
import { HomeScreen } from "./screens/HomeScreen.tsx";
import { MasterPlanScreen } from "./screens/MasterPlanScreen.tsx";
import { PostDetailScreen } from "./screens/PostDetailScreen.tsx";
import { TimelineScreen } from "./screens/TimelineScreen.tsx";
import type { CompanyId, Route, TabId } from "./types.ts";
import "./App.css";

const TABS: { id: TabId; label: string }[] = [
  { id: "home", label: "홈" },
  { id: "companies", label: "기업" },
  { id: "timeline", label: "연대기" },
  { id: "masterplan", label: "마스터플랜" },
];

function App() {
  const userKey = useIdentity();
  const insets = useSafeArea();
  const [tab, setTab] = useState<TabId>("home");
  const [stack, setStack] = useState<Route[]>([]);

  const current = stack[stack.length - 1];

  const openPost = useCallback((postId: string) => {
    setStack((prev) => [...prev, { name: "post", postId }]);
  }, []);

  const openCompany = useCallback((companyId: CompanyId) => {
    setStack((prev) => [...prev, { name: "company", companyId }]);
  }, []);

  const goBack = useCallback(() => {
    setStack((prev) => prev.slice(0, -1));
  }, []);

  const openMasterPlanTab = useCallback(() => {
    setStack([]);
    setTab("masterplan");
  }, []);

  const tabIndex = useMemo(() => TABS.findIndex((item) => item.id === tab), [tab]);

  const main = (
    <>
      <Tab
        size="small"
        onChange={(index) => {
          const next = TABS[index];
          if (next) {
            setTab(next.id);
          }
        }}
      >
        {TABS.map((item, index) => (
          <Tab.Item key={item.id} selected={index === tabIndex}>
            {item.label}
          </Tab.Item>
        ))}
      </Tab>
      {tab === "home" && (
        <HomeScreen onOpenPost={openPost} onOpenMasterPlan={openMasterPlanTab} />
      )}
      {tab === "companies" && <CompaniesScreen onOpenCompany={openCompany} />}
      {tab === "timeline" && <TimelineScreen onOpenPost={openPost} />}
      {tab === "masterplan" && <MasterPlanScreen onOpenPost={openPost} />}
    </>
  );

  return (
    <div
      className="app-shell"
      style={{
        paddingTop: insets.top,
        paddingBottom: Math.max(insets.bottom, 16),
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {current?.name === "post" ? (
        <PostDetailScreen postId={current.postId} userKey={userKey} onBack={goBack} />
      ) : current?.name === "company" ? (
        <CompanyDetailScreen
          companyId={current.companyId}
          onBack={goBack}
          onOpenPost={openPost}
        />
      ) : (
        main
      )}
    </div>
  );
}

export default App;
