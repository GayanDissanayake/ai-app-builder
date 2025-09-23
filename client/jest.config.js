module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!axios)/"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(svg|jpg|jpeg|png|gif)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
