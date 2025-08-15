const ClaudeAgent = require('./ClaudeAgent');
const AiderAgent = require('./AiderAgent');

/**
 * Factory for creating AI agent instances
 */
class AgentFactory {
  constructor() {
    this.agents = new Map();
    this._registerAgents();
  }

  /**
   * Register all available agent types
   * @private
   */
  _registerAgents() {
    this.agents.set('claude', ClaudeAgent);
    this.agents.set('aider', AiderAgent);
  }

  /**
   * Create an agent instance based on environment variable or default
   * @param {string} [agentType] - Agent type to create (overrides environment variable)
   * @returns {BaseAgent} Agent instance
   */
  createAgent(agentType = null) {
    // Use provided agent type, or fall back to environment variable, or default to claude
    const selectedAgent = agentType || process.env.TEST_AGENT || 'claude';

    if (!this.agents.has(selectedAgent)) {
      const availableAgents = Array.from(this.agents.keys()).join(', ');
      throw new Error(
        `Unknown agent type: ${selectedAgent}. Available agents: ${availableAgents}`,
      );
    }

    const AgentClass = this.agents.get(selectedAgent);
    const agent = new AgentClass();

    // Validate that the agent is available
    if (!agent.isAvailable()) {
      throw new Error(
        `Agent '${selectedAgent}' is not available. Please ensure it is installed and accessible in PATH.`,
      );
    }

    // Check required configuration
    const requiredConfig = agent.getRequiredConfig();
    const missingConfig = requiredConfig.filter((key) => !process.env[key]);
    if (missingConfig.length > 0) {
      console.warn(
        `Warning: Missing environment variables for ${selectedAgent}: ${missingConfig.join(', ')}`,
      );
    }

    return agent;
  }

  /**
   * Get list of available agent types
   * @returns {Array} Array of agent type names
   */
  getAvailableAgents() {
    return Array.from(this.agents.keys());
  }

  /**
   * Register a new agent type
   * @param {string} name - Agent type name
   * @param {Class} AgentClass - Agent class that extends BaseAgent
   */
  registerAgent(name, AgentClass) {
    this.agents.set(name, AgentClass);
  }
}

// Export singleton instance
module.exports = new AgentFactory();
