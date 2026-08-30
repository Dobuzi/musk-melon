export type CompanyId =
  | "tesla"
  | "spacex"
  | "xai"
  | "neuralink"
  | "boring"
  | "x";

export type PostKind = "vision" | "event" | "masterplan" | "highlight";

export type TabId = "home" | "companies" | "timeline" | "masterplan";

export type Post = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  year: number;
  dateLabel: string;
  companyIds: CompanyId[];
  kind: PostKind;
  featured?: boolean;
  summary: string;
};

export type Company = {
  id: CompanyId;
  name: string;
  nameEn: string;
  letter: string;
  foundedLabel: string;
  tagline: string;
  about: string;
  whyStarted: string;
  products: string[];
  milestonePostIds: string[];
};

export type TimelineItem = {
  id: string;
  year: number;
  dateLabel: string;
  title: string;
  summary: string;
  postId?: string;
  companyIds: CompanyId[];
};

export type MasterPlan = {
  id: string;
  part: string;
  year: number;
  dateLabel: string;
  title: string;
  subtitle: string;
  points: string[];
  note: string;
  postId: string;
};

export type Comment = {
  id: string;
  postId: string;
  userKey: string;
  body: string;
  createdAt: string;
};

export type Route =
  | { name: "tabs"; tab: TabId }
  | { name: "company"; companyId: CompanyId }
  | { name: "post"; postId: string };
