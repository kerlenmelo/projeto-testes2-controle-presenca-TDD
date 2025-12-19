module.exports = {
  testEnvironment: 'node',


  testMatch: [
    '**/src/backend/tests/**/*.test.js'
  ],

  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/frontend/'
  ],


  clearMocks: true,

  verbose: true
};
