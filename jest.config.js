module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|expo-router)"
  ],
  moduleNameMapper: {
    "^expo/src/winter(.*)$": "<rootDir>/__mocks__/expoWinterMock.js",
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(png|jpg|jpeg|gif|webp|svg|ttf|otf|woff|woff2)$": "<rootDir>/__mocks__/fileMock.js"
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  collectCoverage: true,       
collectCoverageFrom: [
  "app/**/*.{ts,tsx}",
  // Loại trừ bằng cách dùng wildcard để né cái dấu ngoặc (tabs)
  "!app/**/_layout.tsx",
  "!app/**/+not-found.tsx",
  "!app/**/index.tsx",
  "!app/**/sos-detail.tsx",
  "!app/**/contacts.tsx",
  "!app/**/history.tsx",
  "!app/**/profile.tsx",
  "!**/node_modules/**",
  "!**/__tests__/**"
],
  coverageReporters: ["lcov", "text", "text-summary"],
  coverageDirectory: "coverage",
};