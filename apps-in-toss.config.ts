import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  // 표시 이름은 SDK 3부터 콘솔에서 관리합니다. 예: 머스크 멜론
  appName: 'musk-melon',
  brand: {
    primaryColor: '#3DBA7C', // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
  },
  permissions: [],
  webBundleDir: 'dist',
});
