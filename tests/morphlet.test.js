const fs = require('fs');
const path = require('path');
const { runMorphletApplyTest, logTestExecution } = require('./helpers');

describe('Morphlet Tests', () => {
  let tempDir;
  let testFailed = false;

  beforeEach(() => {
    // Create a persistent .logs/test_runs directory under tests
    const baseDir = path.join(__dirname, '.logs', 'test_runs');

    // Create the base .logs/test_runs directory if it doesn't exist
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    // Create a unique subdirectory for this test run with timestamp first
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const testName = expect.getState().currentTestName?.replace(/[^a-zA-Z0-9]/g, '-') || 'unknown';
    tempDir = path.join(baseDir, `${timestamp}-${testName}`);
    fs.mkdirSync(tempDir, { recursive: true });

    testFailed = false;
    logTestExecution({ tempDir, testFailed: false });
  });

  afterEach(() => {
    if (testFailed) {
      logTestExecution({ tempDir, testFailed: true });
    }
    // Note: We don't clean up the test run directory - it persists for inspection
  });

  /**
   * Reusable function to run morphlet application tests
   * @param {string} morphletName - Name of the morphlet (e.g., 'normalize_readme')
   * @param {string} prompt - The prompt to send to the agent
   * @param {Function} preparation - Optional custom preparation callback
   */
  const runMorphletTest = async (morphletName, prompt, preparation = null) => {
    try {
      const result = await runMorphletApplyTest({
        morphletName,
        tempDir,
        testsDir: __dirname,
        prompt,
        preparation,
      });

      if (!result.success) {
        testFailed = true;
        // Fail the test with difference details
        expect(result.differences).toEqual([]);
      }
    } catch (error) {
      testFailed = true;
      throw error;
    }
  };

  // Data provider - list of morphlets to test
  const morphletTestCases = [
    'normalize_readme',
    // Add more morphlets here as they are created
  ];

  // Generate tests for each morphlet
  morphletTestCases.forEach((morphletName) => {
    test(`${morphletName}.morphlet.md`, async () => {
      await runMorphletTest(
        morphletName,
        'Read the instructions in TEST_MORPHLET_APPLY.md and apply the changes described in TEST_MORPHLET.md file to my codebase.',
      );
    });
  });

  test('should handle missing source files gracefully', () => {
    const fixtureReadme = path.join(
      __dirname,
      'fixtures',
      'normalize_readme',
      'baseline',
      'README.md',
    );
    const nonExistentMorphlet = path.join(__dirname, 'fixtures', 'nonexistent.md');

    const targetReadme = path.join(tempDir, 'README.md');
    const targetMorphlet = path.join(tempDir, 'TEST_MORPHLET.md');

    // Copy README.md to temp directory
    fs.copyFileSync(fixtureReadme, targetReadme);

    // Try to copy non-existent morphlet file
    expect(() => {
      fs.copyFileSync(nonExistentMorphlet, targetMorphlet);
    }).toThrow();
  });
});
