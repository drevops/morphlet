const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const BaseAgent = require('./BaseAgent');

/**
 * Claude Code CLI agent implementation
 */
class ClaudeAgent extends BaseAgent {
  constructor() {
    super('claude');
  }

  /**
   * Execute a prompt using Claude CLI
   * @param {string} workingDir - Directory to run Claude in
   * @param {string} prompt - The prompt to send to Claude
   * @param {number} timeoutMs - Timeout in milliseconds
   * @returns {Object} Result object with output and error information
   */
  async execute(workingDir, prompt, timeoutMs = 120000) {
    if (!fs.existsSync(workingDir)) {
      throw new Error(`Working directory does not exist: ${workingDir}`);
    }

    // Use provided prompt with add-dir to restrict access to working directory only
    const restrictedDir = path.resolve(workingDir);
    const command = `echo "${prompt}" | claude --model sonnet --allowedTools "Edit,Write,Read" --add-dir "${restrictedDir}" -p`;

    let claudeOutput = '';
    let claudeError = '';
    let success = false;

    try {
      const result = execSync(command, {
        cwd: workingDir,
        encoding: 'utf8',
        timeout: timeoutMs,
      });
      claudeOutput = result.toString();
      success = true;
    } catch (error) {
      claudeError = error.message;
      claudeOutput = error.stdout?.toString() || '';
      const stderr = error.stderr?.toString() || '';

      console.error('Claude code command failed:', error.message);
      console.error('stdout:', claudeOutput);
      console.error('stderr:', stderr);

      throw new Error(`Claude code execution failed: ${error.message}`);
    }

    return {
      output: claudeOutput,
      error: claudeError,
      success,
    };
  }

  /**
   * Check if Claude CLI is available
   * @returns {boolean} True if Claude is available
   */
  isAvailable() {
    try {
      execSync('claude --version', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get Claude-specific configuration requirements
   * @returns {Array} Array of required configuration keys
   */
  getRequiredConfig() {
    return []; // No specific environment variables required
  }
}

module.exports = ClaudeAgent;
