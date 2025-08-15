const fs = require('fs');
const path = require('path');
const { copyDirectorySync } = require('./filesystem');

/**
 * Prepare test fixture directories and files for morphlet testing
 * @param {Object} config - Configuration object
 * @param {string} config.morphletName - Name of the morphlet (e.g., 'normalize_readme')
 * @param {string} config.tempDir - Temporary directory for test execution
 * @param {string} config.testsDir - Tests directory root (defaults to __dirname/..)
 * @returns {Object} Paths to prepared fixtures and files
 */
const prepareTestFixtures = (config) => {
  const { morphletName, tempDir, testsDir = path.join(__dirname, '..') } = config;

  // Define source paths
  const fixtureDir = path.join(testsDir, 'fixtures', morphletName);
  const baselineDir = path.join(fixtureDir, 'baseline');
  const expectedDir = path.join(fixtureDir, 'expected');
  const morphletSource = path.join(testsDir, '..', 'examples', `${morphletName}.morphlet.md`);
  const applyInstructions = path.join(testsDir, '..', 'MORPHLET_APPLY.md');

  // Define target paths (with TEST_MORPHLET prefix for infrastructure files)
  const targetMorphlet = path.join(tempDir, 'TEST_MORPHLET.md');
  const targetApplyInstructions = path.join(tempDir, 'TEST_MORPHLET_APPLY.md');

  // Verify source directories and files exist
  const missingPaths = [];
  if (!fs.existsSync(baselineDir)) missingPaths.push(baselineDir);
  if (!fs.existsSync(expectedDir)) missingPaths.push(expectedDir);
  if (!fs.existsSync(morphletSource)) missingPaths.push(morphletSource);
  if (!fs.existsSync(applyInstructions)) missingPaths.push(applyInstructions);

  if (missingPaths.length > 0) {
    throw new Error(`Missing required fixture files: ${missingPaths.join(', ')}`);
  }

  // Copy baseline directory contents to temporary directory
  copyDirectorySync(baselineDir, tempDir);

  // Copy morphlet and instructions with TEST_MORPHLET prefix
  fs.copyFileSync(morphletSource, targetMorphlet);
  fs.copyFileSync(applyInstructions, targetApplyInstructions);

  // Verify files were copied
  if (!fs.existsSync(targetMorphlet)) {
    throw new Error(`Failed to copy morphlet file to: ${targetMorphlet}`);
  }
  if (!fs.existsSync(targetApplyInstructions)) {
    throw new Error(`Failed to copy apply instructions to: ${targetApplyInstructions}`);
  }

  return {
    paths: {
      fixtureDir,
      baselineDir,
      expectedDir,
      morphletSource,
      applyInstructions,
      targetMorphlet,
      targetApplyInstructions,
    },
    success: true,
  };
};

/**
 * Create comparison directories for test results
 * @param {string} tempDir - Temporary directory for test execution
 * @param {string} expectedDir - Expected results directory
 * @returns {Object} Paths to comparison directories
 */
const prepareComparisonDirectories = (tempDir, expectedDir) => {
  const actualCompareDir = path.join(tempDir, '.actual_for_comparison');
  const expectedCompareDir = path.join(tempDir, '.expected_for_comparison');

  // Copy expected directory to show what we're comparing against
  copyDirectorySync(expectedDir, expectedCompareDir);

  // Create actual comparison directory
  fs.mkdirSync(actualCompareDir, { recursive: true });

  return {
    actualCompareDir,
    expectedCompareDir,
  };
};

module.exports = {
  prepareTestFixtures,
  prepareComparisonDirectories,
};
