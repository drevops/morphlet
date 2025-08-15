const { AgentFactory } = require('./agents');

/**
 * Execute morphlet application using the configured AI agent
 * @param {string} workingDir - Directory to run the agent in
 * @param {string} prompt - The prompt to send to the agent
 * @param {number} timeoutMs - Timeout in milliseconds (default: 2 minutes)
 * @param {string} agentType - Optional agent type to use (overrides environment variable)
 * @param {Function} preparation - Optional preparation callback (e.g., fixture setup)
 * @param {Object} context - Optional context object for preparation
 * @returns {Object} Result object with output and error information
 */
const executeMorphletApplication = async (workingDir, prompt, timeoutMs = 120000, agentType = null, preparation = null, context = {}) => {
  try {
    // Create agent instance based on environment variable or provided type
    const agent = AgentFactory.createAgent(agentType);
    
    // Run external preparation callback if provided (e.g., fixture setup)
    if (preparation) {
      await preparation(workingDir, context);
    }
    
    // Run agent's internal preparation (e.g., Git setup for Aider)
    await agent._prepareInternal(workingDir, context);
    
    // Execute the prompt using the selected agent
    const result = await agent.execute(workingDir, prompt, timeoutMs);
    
    return result;
  } catch (error) {
    console.error(`Agent execution failed: ${error.message}`);
    throw error;
  }
};

/**
 * Execute morphlet capture using Claude CLI (for future use)
 * @param {string} workingDir - Directory to run Claude in
 * @param {number} timeoutMs - Timeout in milliseconds
 * @returns {Object} Result object with output and error information
 */
const executeMorphletCapture = (workingDir, timeoutMs = 120000) => {
  // This will be implemented when capture functionality is needed
  throw new Error('Morphlet capture functionality not yet implemented');
};

module.exports = {
  executeMorphletApplication,
  executeMorphletCapture,
};
