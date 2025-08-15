# Morphlet Apply Instructions

This file defines how to apply a Morphlet to a codebase. It is intended to be
used by AI agents or CLI tools that can interpret and execute Markdown-based
Morphlets.

## 1. Purpose

Morphlets define atomic or semantic codebase transformations. This file
describes how to interpret and apply the instructions found in a Morphlet
document.

## 2. How to Use

1. Copy this file (`MORPHLET_APPLY.md`) into your project (or provide it to your
   AI agent).
2. Prompt your agent:

```markdown
Read MORPHLET_APPLY.md and use <your-morphlet-file.md> to apply the changes.
```

By default, no changes should be committed or pushed unless explicitly allowed.

---

## 3. Instruction Step Format

Each instruction step in a Morphlet follows this format:

```markdown
### Operation: Short description of the step

- operation: insert | replace | morph | etc.
- file: path/to/file.ext
- conditions: [optional list of conditions]

\`\`\`<language>
<content to apply>
\`\`\`
```

The agent MUST process steps sequentially, and apply each only if:

- The `operation` is recognized
- The `conditions` are met (if provided)

If any required field is missing or malformed, the step MUST be skipped with a
warning.

---

## 4. Supported Operations

### Insert

- Adds new content to a specific location in the file.
- Agent should locate the **insertion point** using context (e.g., known
  markers, selectors, or preceding comments).
- Content must be added without breaking surrounding syntax or formatting.

### Replace

- Replaces an existing line, block, or fragment in the file.
- Match target by line number, selector, or content pattern.
- Should preserve surrounding structure.

### Delete

- Removes the specified content from the file.
- Conditions may define what must be found before deletion occurs.

### Create

- Writes a new file with the given content.
- Must not overwrite existing files unless explicitly allowed.

### Rename

- Renames a file or identifier.
- The agent must check for conflicts and resolve as needed.

### Move

- Moves content or files from one location to another.
- Agent must ensure correctness of both source and destination.

### Patch

- Applies a `.diff` or `.patch` style content block using line-based patching.
- Requires exact match of pre-existing content structure.

### Morph

- Performs an intelligent transformation that adapts to existing content.
- Agent should interpret the intent of the block and **preserve**, **reorder**,
  or **merge** as needed.
- For example: standardize README section order, inject config fields without
  overriding unrelated ones.
- In cases were there is no existing content, it should behave like `create` and
  copy the content as is. It should not try to adapt the content.
- If the content already exists, it should adapt to the existing structure
  while applying the new changes.

---

## 5. Conditions

Each step may include a `conditions:` field. The agent must evaluate these
before executing the step.

- If the condition is not met, the step must be skipped.
- Conditions are written in natural language or declarative form.
- Examples:
  - `file exists`
  - `section is missing or out of order`
  - `marker comment is present`
  - `function header exists`

---

## 6. Skipping and Error Handling

- If a step fails, it should be logged and skipped without stopping the rest of
  the Morphlet.
- All skipped or failed steps must be reported at the end of the apply process.

---

## 7. Result

The agent should return a report summarizing:

- Which steps were applied
- Which steps were skipped (and why)
- Which files were modified
- Optionally: a diff or patch preview

---

End of Instructions
