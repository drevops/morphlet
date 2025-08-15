# Morphlet Test Harness

This directory contains the Jest-based test harness for validating morphlet applications.

## Setup

Install dependencies:

```bash
cd tests
npm install
```

## Running Tests

```bash
# Run all tests (uses claude by default)
npm test

# Run tests with a specific agent
TEST_AGENT=claude npm test
TEST_AGENT=aider npm test

# Run tests with Aider using a specific model
export ANTHROPIC_API_KEY=<your_anthropic_api_key>
TEST_AGENT=aider TEST_AIDER_MODEL=claude-3-5-sonnet-20241022 npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with verbose output
npm run test:verbose

# Code quality and formatting
npm run lint           # Check formatting and code quality
npm run lint-fix       # Auto-fix formatting and code issues
```

## Agent Configuration

The test harness supports multiple AI agents via the `TEST_AGENT` environment variable:

- **`claude`** (default) - Claude Code CLI
- **`aider`** - Aider CLI
- Additional agents can be added by extending the agent system

### Agent Requirements

**Claude Agent:**

- Requires: `claude` CLI installed and accessible
- Environment: `CLAUDE_API_KEY` (optional warning if missing)
- Features: Directory restriction, file access control

**Aider Agent:**

- Requires: `aider` CLI installed and accessible  
- Environment: `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` (optional warning if missing)
- Configuration: `TEST_AIDER_MODEL` - Optional model specification (e.g., `claude-3-5-sonnet-20241022`)
- Features: Git integration, auto-commits

## Test Structure

- `morphlet.test.js` - Main test file with clean, focused test logic
- `helpers/` - Modular helper utilities
  - `index.js` - Main exports for all helper functions
  - `filesystem.js` - File operations (copy, compare directories)
  - `morphlet.js` - AI agent execution logic
  - `fixtures.js` - Test fixture preparation and setup
  - `summary.js` - Test summary generation and logging
  - `testRunner.js` - Main test orchestration (apply/capture)
  - `agents/` - AI agent implementations
    - `BaseAgent.js` - Abstract base class for all agents
    - `ClaudeAgent.js` - Claude Code CLI implementation
    - `AiderAgent.js` - Aider CLI implementation
    - `AgentFactory.js` - Factory for creating agent instances
    - `index.js` - Agent exports
- `fixtures/` - Test fixture files organized by morphlet
  - `normalize_readme/` - Fixtures for normalize_readme morphlet
    - `baseline/` - Initial state (before morphlet application)
      - `README.md` - Input README file
      - `[other files...]` - Any other files in the baseline state  
    - `expected/` - Expected state (after morphlet application)
      - `README.md` - Expected README after changes
      - `[other files...]` - Any other files that should be modified/created
  - `[morphlet_name]/` - Add new morphlet fixtures here with same structure
- `.logs/test_runs/` - Test execution logs (gitignored, persists after test runs)
  - `YYYY-MM-DDTHH-MM-SS-sssZ-test-name/` - Timestamped test run directories
- `package.json` - Test dependencies and configuration
- `jest.config.js` - Jest configuration
- `jest.setup.js` - Jest setup and custom matchers

## Code Standards

- **ESLint**: Code quality and consistency checking
- **Prettier**: Automatic code formatting
- **Standards**:
  - Single quotes for strings
  - 2-space indentation
  - Semicolons required
  - 100 character line length
  - Trailing commas in multiline structures

## How It Works

1. **Modular Architecture**: Clean separation of concerns using helper modules
   - `testRunner.js` orchestrates the entire test process
   - `fixtures.js` handles test setup and file preparation
   - `morphlet.js` executes Claude CLI commands
   - `filesystem.js` provides file operations and comparisons
   - `summary.js` generates test reports and logs
2. **Data-driven approach**: Tests are generated from a list of morphlet names
3. **Auto-discovery**: Looks for fixtures in `fixtures/[morphlet_name]/` directories
4. **Multi-file support**: Handles morphlets that modify multiple files and directories
5. **Clean separation**: Uses `TEST_MORPHLET*` prefix to exclude test infrastructure from comparisons

## Adding New Morphlet Tests

### For Apply (Application) Tests

1. Create a new directory under `fixtures/` with your morphlet name (e.g., `fixtures/my_morphlet/`)
2. Add `baseline/` directory with initial files and `expected/` directory with expected results
3. Ensure the corresponding `.morphlet.md` file exists in `examples/`
4. Add the morphlet name to the `morphletTestCases` array in `morphlet.test.js`

### For Capture Tests (Future)

The helper modules are already structured to support capture functionality:

- `helpers/morphlet.js` includes `executeMorphletCapture()` placeholder
- `helpers/testRunner.js` includes `runMorphletCaptureTest()` placeholder
- Agent system supports both apply and capture operations
- Simply implement the capture logic when needed

### Adding New Agents

1. Create a new agent class extending `BaseAgent` in `helpers/agents/`
2. Implement required methods: `execute()`, `isAvailable()`, `getRequiredConfig()`
3. Register the agent in `AgentFactory.js`
4. Test with `TEST_AGENT=your_agent npm test`

## Debugging Failed Tests

When a test fails, check the `.logs/test_runs/` directory for the most recent test run:

```bash
ls -la tests/.logs/test_runs/
cd tests/.logs/test_runs/2025-01-15T10-30-45-123Z-normalize-readme-morphlet-md/
cat TEST_SUMMARY.md
```

## Requirements

- Node.js and npm
- `claude code` CLI must be installed and available in PATH
- Access to Claude API (for running the actual morphlet application)

## Adding New Tests

1. Create new fixture files in `fixtures/` directory
2. Add test cases in `*.test.js` files
3. Use the provided custom matchers for better assertions:
   - `toBeValidMarkdown()` - Check if content is valid markdown
   - `toContainSection(section)` - Check if markdown contains a specific section

## Environment Variables

- `VERBOSE_TESTS=1` - Enable verbose console output during tests
- `NODE_ENV=test` - Set automatically during test runs
