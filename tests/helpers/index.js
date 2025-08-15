// Filesystem utilities
const {
  copyDirectorySync,
  compareDirectories,
  copyExpectedFilesFromActual,
} = require('./filesystem');

// Morphlet execution
const { executeMorphletApplication, executeMorphletCapture } = require('./morphlet');

// Test fixture management
const { prepareTestFixtures, prepareComparisonDirectories } = require('./fixtures');

// Test summary and logging
const { generateTestSummary, logTestExecution } = require('./summary');

// Test runners
const { runMorphletApplyTest, runMorphletCaptureTest } = require('./testRunner');

// Agent system
const { BaseAgent, ClaudeAgent, AiderAgent, AgentFactory } = require('./agents');

module.exports = {
  // Filesystem utilities
  copyDirectorySync,
  compareDirectories,
  copyExpectedFilesFromActual,

  // Morphlet execution
  executeMorphletApplication,
  executeMorphletCapture,

  // Test fixture management
  prepareTestFixtures,
  prepareComparisonDirectories,

  // Test summary and logging
  generateTestSummary,
  logTestExecution,

  // Test runners (main entry points)
  runMorphletApplyTest,
  runMorphletCaptureTest,

  // Agent system
  BaseAgent,
  ClaudeAgent,
  AiderAgent,
  AgentFactory,
};
