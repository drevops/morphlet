const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const BaseAgent = require('./BaseAgent');

/**
 * Aider CLI agent implementation
 */
class AiderAgent extends BaseAgent {
  constructor() {
    super('aider');
  }

  /**
   * Internal preparation for Aider - set up Git repository
   * @param {string} workingDir - Directory where agent will run
   * @param {Object} context - Context object with additional info
   * @returns {Object} Preparation result
   */
  async _prepareInternal(workingDir, context = {}) {
    try {
      // Initialize git repository
      execSync('git init', { cwd: workingDir, stdio: 'ignore' });

      // Configure git user for test commits
      execSync('git config user.name "Test Runner"', { cwd: workingDir, stdio: 'ignore' });
      execSync('git config user.email "test@example.com"', { cwd: workingDir, stdio: 'ignore' });

      // Stage and commit all files (initial state)
      execSync('git add .', { cwd: workingDir, stdio: 'ignore' });
      execSync('git commit -m "Initial test setup"', { cwd: workingDir, stdio: 'ignore' });

      return { success: true };
    } catch (error) {
      throw new Error(`Failed to prepare Git repository for Aider: ${error.message}`);
    }
  }

  /**
   * Execute a prompt using Aider CLI
   * @param {string} workingDir - Directory to run Aider in
   * @param {string} prompt - The prompt to send to Aider
   * @param {number} timeoutMs - Timeout in milliseconds
   * @returns {Object} Result object with output and error information
   */
  async execute(workingDir, prompt, timeoutMs = 120000) {
    if (!fs.existsSync(workingDir)) {
      throw new Error(`Working directory does not exist: ${workingDir}`);
    }

    // Build Aider command with optional model parameter
    let command = `aider --message "${prompt}" --yes --auto-commits`;
    
    // Add model parameter if TEST_AIDER_MODEL environment variable is set
    if (process.env.TEST_AIDER_MODEL) {
      command += ` --model ${process.env.TEST_AIDER_MODEL}`;
    }
    
    command += ' .';

    let aiderOutput = '';
    let aiderError = '';
    let success = false;

    try {
      const result = execSync(command, {
        cwd: workingDir,
        encoding: 'utf8',
        timeout: timeoutMs,
      });
      aiderOutput = result.toString();
      success = true;
    } catch (error) {
      aiderError = error.message;
      aiderOutput = error.stdout?.toString() || '';
      const stderr = error.stderr?.toString() || '';

      console.error('Aider command failed:', error.message);
      console.error('stdout:', aiderOutput);
      console.error('stderr:', stderr);

      throw new Error(`Aider execution failed: ${error.message}`);
    }

    return {
      output: aiderOutput,
      error: aiderError,
      success,
    };
  }

  /**
   * Check if Aider CLI is available
   * @returns {boolean} True if Aider is available
   */
  isAvailable() {
    try {
      execSync('aider --version', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get Aider-specific configuration requirements
   * @returns {Array} Array of required configuration keys
   */
  getRequiredConfig() {
    return []; // Aider supports multiple providers
  }
}

module.exports = AiderAgent;
