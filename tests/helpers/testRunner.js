const path = require('path');
const { prepareTestFixtures, prepareComparisonDirectories } = require('./fixtures');
const { executeMorphletApplication } = require('./morphlet');
const { compareDirectories, copyExpectedFilesFromActual } = require('./filesystem');
const { generateTestSummary } = require('./summary');

/**
 * Run morphlet application test for a specific morphlet
 * @param {Object} config - Configuration object
 * @param {string} config.morphletName - Name of the morphlet (e.g., 'normalize_readme')
 * @param {string} config.tempDir - Temporary directory for test execution
 * @param {string} config.testsDir - Tests directory root
 * @param {string} config.prompt - The prompt to send to the agent
 * @param {Function} config.preparation - Optional preparation callback (e.g., custom fixture setup)
 * @returns {Object} Test result with success status and differences
 */
const runMorphletApplyTest = async (config) => {
  const { morphletName, tempDir, testsDir, prompt, preparation } = config;

  try {
    // 1. Create fixture preparation callback
    const fixturePreparation = async (workingDir, context) => {
      const fixtureResult = prepareTestFixtures({
        morphletName: context.morphletName,
        tempDir: workingDir,
        testsDir: context.testsDir,
      });
      return fixtureResult;
    };

    // 2. Use custom preparation or default fixture preparation
    const finalPreparation = preparation || fixturePreparation;
    
    // 3. Execute morphlet application
    const context = { morphletName, testsDir };
    const executionResult = await executeMorphletApplication(tempDir, prompt, 120000, null, finalPreparation, context);
    
    // 4. Get expected directory for comparison
    const expectedDir = path.join(__dirname, '..', 'fixtures', morphletName, 'expected');

    // 5. Prepare comparison directories
    const { actualCompareDir } = prepareComparisonDirectories(tempDir, expectedDir);

    // 6. Copy only expected files from actual results for clean comparison
    copyExpectedFilesFromActual(expectedDir, tempDir, actualCompareDir);

    // 7. Compare directories
    const differences = compareDirectories(actualCompareDir, expectedDir);

    // 8. Generate test summary
    const success = differences.length === 0;
    generateTestSummary({
      tempDir,
      claudeOutput: executionResult.output,
      claudeError: executionResult.error,
      differences,
      success,
    });

    return {
      success,
      differences,
      claudeOutput: executionResult.output,
      claudeError: executionResult.error,
    };
  } catch (error) {
    // Generate failure summary
    generateTestSummary({
      tempDir,
      claudeOutput: '',
      claudeError: error.message,
      differences: [`Test execution failed: ${error.message}`],
      success: false,
    });

    throw error;
  }
};

/**
 * Run morphlet capture test for a specific morphlet (placeholder for future implementation)
 * @param {Object} config - Configuration object
 * @returns {Object} Test result with success status
 */
const runMorphletCaptureTest = (config) => {
  // This will be implemented when capture functionality is needed
  throw new Error('Morphlet capture testing not yet implemented');
};

module.exports = {
  runMorphletApplyTest,
  runMorphletCaptureTest,
};
