# Morphlet Specification

## 1. Introduction

The Morphlet Specification defines a Markdown-based schema for expressing
structured, modular code transformations in a format that is both human-readable
and AI-operable. This specification provides the formal definition for writing,
parsing, and validating Morphlet documents.

Morphlets are designed to describe atomic or composite codebase changes that can
be applied, captured, or verified by agents or developers. The specification
emphasizes consistency, version control, and declarative semantics.

## 2. Document Structure

A Morphlet document consists of the following major sections:

1. Morphlet Metadata Table
2. Application Log Table
3. Context
4. Instructions
5. Verification
6. Notes

Each section must appear in the specified order.

## 3. Morphlet Metadata Table

The Morphlet Metadata Table contains static fields describing the Morphlet's
definition, scope, versioning, and applicability. These fields must be defined
at the beginning of the document under the heading:

```markdown
### 🧬 Morphlet Information
```

| Field              | Type     | Format/Constraints                         | Description                                                     |
|--------------------|----------|--------------------------------------------|-----------------------------------------------------------------|
| Morphlet Version   | string   | SemVer (`X.Y.Z`)                           | Version of the Morphlet Specification this document adheres to. |
| Title              | string   | 1–100 characters                           | A descriptive title for the Morphlet.                           |
| Description        | string   | 1–2 sentences                              | Summary of the change or transformation.                        |
| Author             | string   | Name or organization                       | Origin of the Morphlet.                                         |
| Version            | string   | SemVer (`X.Y.Z`)                           | Version of the Morphlet itself.                                 |
| Created            | string   | ISO 8601 date (`YYYY-MM-DD`)               | Date the Morphlet was authored.                                 |
| Status             | enum     | One of: `draft`, `active`, `deprecated`    | Lifecycle state of the Morphlet.                                |
| Tags               | string[] | Comma-separated keywords                   | Tags for searchability and categorization.                      |
| Applies To Package | string   | Target package or product name             | The software system this Morphlet targets.                      |
| Applies To Version | string   | SemVer constraint (e.g., `>=1.0.0 <2.0.0`) | Version range this Morphlet is applicable to.                   |

## 4. Application Log Table

The Application Log Table captures a specific instance where the Morphlet was
applied. It is useful for auditing and traceability. It must appear immediately
after the metadata table under the heading:

```markdown
### 📄 Application Log
```

| Field      | Type     | Description                                              |
|------------|----------|----------------------------------------------------------|
| Applied By | string   | Name of AI agent or human who applied the Morphlet       |
| Applied On | datetime | Date and time the Morphlet was applied (ISO 8601 format) |
| Comment    | string   | Optional human-readable note about the application       |

## 5. Context Section

The `## 🧠 Context` section provides background information on the rationale
behind the Morphlet. This may include the originating problem, user requests,
feature gaps, or client-specific needs.

## 6. Instructions Section

The `## 🧰 Instructions` section defines one or more executable steps to be
applied to the codebase.

Each step MUST contain:

- A level-3 heading in the format `### Operation: Step Description`, where:
  - `Operation` is one of the supported operation keywords listed below.
  - `Step Description` is a short, human-readable summary of the intent.

- A bullet-point list of key-value fields:
  - `operation:` (**required**) One of the supported operations listed
    below.
  - `file:` (**optional**) Relative path to the file this step modifies. Omit if
    step applies globally.
  - `conditions:` (**optional**) One or more conditions required for this
    step to execute. If conditions are not met, the step MUST be skipped.

- A content block (e.g., code block or configuration snippet) representing the
  new, modified, or resulting content associated with the step. It may include
  code, configuration, documentation, or other materials relevant to the
  specified operation.

### Supported Operations

| Operation | Description                                                                  |
|-----------|------------------------------------------------------------------------------|
| `create`  | Create a new file with the given content.                                    |
| `delete`  | Remove content or entire files.                                              |
| `insert`  | Add new content at a specific point in the file.                             |
| `morph`   | Context-aware transformation that preserves existing content where possible. |
| `move`    | Move content or files from one location to another.                          |
| `patch`   | Apply a structured or unified diff (e.g., external patch file).              |
| `rename`  | Rename a file or identifier.                                                 |
| `replace` | Replace existing content at a known location or pattern.                     |

Each step MUST specify only **one** operation from this list. Composite
transformations must be broken down into multiple steps.

Specification implementors MUST ensure that operations are executed as per the
description above to the best of their ability.

## 7. Verification Section

The `## ✅ Verification` section provides a checklist to confirm successful
Morphlet application. Each verification must begin with `- [ ]`.

## 8. Notes Section

The `## 📝 Notes` section is optional. It can include discussion, edge cases,
rollbacks, or future work.

## 9. Conformance

A Morphlet is conformant with this specification if it:

- Includes all required sections in the correct order
- Uses valid field values in metadata and log tables
- Contains syntactically valid Markdown
- Adheres to defined operations and formats

## 10. Changelog

- `v1.0.1` — Added dual metadata tables and clarified table headings
- `v1.0.0` — Initial release

---

End of Specification
