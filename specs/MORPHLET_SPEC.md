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

The `## 🧰 Instructions` section defines one or more executable steps. Each step
must contain:

- A title heading (`### N. Step Name`)
- A list of:
  - `Target File`: relative path
  - `Operation`: one of `insert`, `replace`, `create`, `delete`, `rename`,
    `move`
  - `Target Location`: line number, selector, or marker comment
- A code block with the transformation content

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
