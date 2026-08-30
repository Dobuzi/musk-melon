# 머스크 멜론 (Musk Melon)

토스 앱인토스(Apps in Toss) 비공식 팬·정보 미니앱입니다.
일론 머스크와 테슬라, 스페이스X, xAI 등 관련 기업의 공개된 역사, 비전, 마스터플랜을 한국어로 정리하고, 글에 좋아요와 댓글을 남길 수 있습니다.

이 앱은 테슬라, 스페이스X, xAI, 뉴럴링크, 더 보링 컴퍼니, x 또는 일론 머스크와 무관합니다. 소속·후원·제휴를 주장하지 않으며, 공식 상표·로고를 사용하지 않습니다. 원문 에세이·보도자료를 그대로 옳기지 않고 공개 사실만 요약합니다.

React 18 + TypeScript + Toss Design System(TDS) 스타터 위에 구현했습니다. 인앱결제(IAP)/인앱광고(IAA)는 포함하지 않습니다.

Node.js 24 이상이 필요합니다.

## 화면

- 홈: 비전 조각, 최근 하이라이트, 마스터플랜 티저, 비공식 고지
- 기업: 테슬라, 스페이스X, xAI, 뉴럴링크, 더 보링 컴퍼니, x
- 연대기: 연도 앵커가 있는 수직 타임라인
- 마스터플랜: 2006 / 2016 / 2023 요지 요약
- 글 상세: 본문, 태그, 좋아요, 댓글 작성과 삭제

## 소셜 기능 (v1)

좋아요와 댓글은 이 기기(또는 토스 미니앱 Storage)에만 저장됩니다. 다른 사용자와 공유되는 서버가 없습니다.

- 신원: 토스 앱 안에서는 User.getAnonymousKey, 로컬 브라우저에서는 localStorage에 만든 익명 키
- 저장: 토스 Storage를 우선 사용하고, 브릿지가 없으면 localStorage
- UI는 src/lib/social.ts의 SocialStore 인터페이스만 바라밄니다. 이후 Supabase 같은 백엔드로 교체해도 화면을 다시 쓠지 않아도 됩니다.


## 시작하기

로컬 브라우저에서 미리 볼 수 있습니다. SDK 호출이 실패하면 localStorage로 동작합니다.

## 빌드 / 배포

프로젝트 루트에서 빌드하면 musk-melon.ait 가 생성됩니다. 배포 API 키는 앱인토스 콘솔에서 발급합니다. 표시 이름은 SDK 3부터 콘솔에서 관리합니다.

## 링크

- https://developers-apps-in-toss.toss.im/
- https://apps-in-toss.toss.im/
- https://techchat-apps-in-toss.toss.im/
- https://developers-apps-in-toss.toss.im/development/llms.html

## 스크립트

- dev: Vite 개발 서버
- build: 웹 번들 이후 .ait 생성
- deploy: 앱인토스 배포
- lint: ESLint
