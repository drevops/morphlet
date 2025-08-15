/**
 * Base class for AI agents
 * All agent implementations should extend this class
 */
class BaseAgent {
  constructor(name) {
    this.name = name;
  }

  /**
   * Execute a prompt using this agent
   * @param {string} workingDir - Directory to run the agent in
   * @param {string} prompt - The prompt to send to the agent
   * @param {number} timeoutMs - Timeout in milliseconds
   * @returns {Object} Result object with output and error information
   */
  async execute(workingDir, prompt, timeoutMs = 120000) {
    throw new Error(`execute() method must be implemented by ${this.constructor.name}`);
  }

  /**
   * Internal agent-specific preparation (called after external preparation callback)
   * @param {string} workingDir - Directory where agent will run
   * @param {Object} context - Context object with additional info
   * @returns {Object} Preparation result
   */
  async _prepareInternal(workingDir, context = {}) {
    // Default implementation does nothing
    return { success: true };
  }

  /**
   * Get the name of this agent
   * @returns {string} Agent name
   */
  getName() {
    return this.name;
  }

  /**
   * Validate that the agent is available/installed
   * @returns {boolean} True if agent is available
   */
  isAvailable() {
    throw new Error(`isAvailable() method must be implemented by ${this.constructor.name}`);
  }

  /**
   * Get agent-specific configuration requirements
   * @returns {Array} Array of required configuration keys
   */
  getRequiredConfig() {
    return [];
  }
}

module.exports = BaseAgent;
