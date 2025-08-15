// Jest setup file for Morphlet tests

// Global test timeout for AI operations
jest.setTimeout(180000); // 3 minutes

// Global beforeAll setup
beforeAll(() => {
  console.log('🧬 Starting Morphlet test suite...');
});

// Global afterAll cleanup
afterAll(() => {
  console.log('✅ Morphlet test suite completed');
});

// Custom matchers for better test assertions
expect.extend({
  toBeValidMarkdown(received) {
    const pass = typeof received === 'string' && received.includes('#');
    if (pass) {
      return {
        message: () => `Expected ${received} not to be valid markdown`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${received} to be valid markdown`,
        pass: false,
      };
    }
  },

  toContainSection(received, section) {
    const pass = typeof received === 'string' && received.includes(`## ${section}`);
    if (pass) {
      return {
        message: () => `Expected ${received} not to contain section "${section}"`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${received} to contain section "${section}"`,
        pass: false,
      };
    }
  },
});

// Enable console output for debugging failed tests
// Suppress console output during tests unless verbose or in case of failures
if (!process.env.VERBOSE_TESTS && !process.env.DEBUG_TESTS) {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: console.warn,
    error: console.error,
  };
}
