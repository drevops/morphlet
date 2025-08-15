const fs = require('fs');
const path = require('path');

/**
 * Generate test summary with Claude output and differences
 * @param {Object} config - Configuration object
 * @param {string} config.tempDir - Temporary directory for test execution
 * @param {string} config.claudeOutput - Output from Claude CLI
 * @param {string} config.claudeError - Error from Claude CLI (if any)
 * @param {Array} config.differences - Array of differences found during comparison
 * @param {boolean} config.success - Whether the test passed
 * @returns {string} Path to the generated summary file
 */
const generateTestSummary = (config) => {
  const { tempDir, claudeOutput, claudeError, differences = [], success = false } = config;

  const summaryPath = path.join(tempDir, 'TEST_MORPHLET_SUMMARY.md');

  let summary;

  if (success && differences.length === 0) {
    // Success case
    summary = `# Test Summary

## Claude CLI Output:
\`\`\`
${claudeOutput.trim() || 'No output captured'}
\`\`\`

## Result: ✅ All files match expected output
`;
  } else {
    // Failure case with differences
    summary = `# Test Summary

## Claude CLI Output:
\`\`\`
${claudeOutput.trim() || 'No output captured'}
\`\`\`

## Claude CLI Error (if any):
\`\`\`
${claudeError || 'No errors'}
\`\`\`

## Differences Found:
${differences.map((diff) => `- ${diff}`).join('\n')}

## Directories for Comparison:
- \`.actual_for_comparison/\` - Actual output (excluding test files)
- \`.expected_for_comparison/\` - Expected output
- Use \`diff -r .actual_for_comparison .expected_for_comparison\` to see detailed differences
`;
  }

  fs.writeFileSync(summaryPath, summary);
  return summaryPath;
};

/**
 * Log test execution details to console
 * @param {Object} config - Configuration object
 * @param {string} config.tempDir - Temporary directory for test execution
 * @param {boolean} config.testFailed - Whether the test failed
 */
const logTestExecution = (config) => {
  const { tempDir, testFailed } = config;

  console.log(`📁 Test run directory: ${tempDir}`);

  if (testFailed) {
    console.log('\n🔍 Test failed! Test run directory preserved for inspection:');
    console.log(`   ${tempDir}`);
    console.log('\n   Browse to this directory to examine:');
    console.log('   - [result files] (actual output from morphlet)');
    console.log('   - .actual_for_comparison/ (clean actual results)');
    console.log('   - .expected_for_comparison/ (expected results)');
    console.log('   - TEST_MORPHLET_SUMMARY.md (test summary with Claude output)');
  }
};

module.exports = {
  generateTestSummary,
  logTestExecution,
};
