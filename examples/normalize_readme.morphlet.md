# Morphlet: Normalize README Sections

## 🧬 Morphlet information

| Field              | Value                                                                   |
|--------------------|-------------------------------------------------------------------------|
| Morphlet Version   | 1.0.0                                                                   |
| Title              | Enforce Standard README Structure                                       |
| Description        | Ensures `README.md` contains standardized sections in a specific order. |
| Author             | Alex Skrypnyk (<alex@drevops.com>)                                      |
| Version            | 1.0.0                                                                   |
| Created            | 2025-08-15                                                              |
| Status             | active                                                                  |
| Tags               | readme, markdown, docs, standardization                                 |
| Applies To Package | any                                                                     |
| Applies To Version | >=0.0.0                                                                 |

## 📄 Application Log

| Field      | Value                                       |
|------------|---------------------------------------------|
| Applied By | [🚧 AI Agent Name or Human Name]            |
| Applied On | [🚧 YYYY-MM-DD HH:MM:SS]                    |
| Comment    | [🚧 Optional comment about the application] |

---

## 🧠 Context

This Morphlet addresses inconsistencies in `README.md` structure across
repositories. It standardizes the order of key documentation sections to improve
readability, navigation, and downstream automation (e.g. changelog generators,
site docs, etc.).

This is useful for open source and internal repos that have drifted over time or
never established a README layout standard.

---

## 🧰 Instructions

### Morph: Normalize README sections

- operation: morph
- file: README.md
- conditions: any of the following sections are missing or appear out of order:
  - Features
  - Installation
  - Usage
  - Maintenance
  - License

```markdown
## Features

Briefly list the key features or capabilities of the project.

## Installation

Provide step-by-step instructions to install the project or dependency.

## Usage

Explain how to run or use the project, including CLI commands, examples, or API
usage.

## Maintenance

Outline who maintains the project, how to report bugs, or how to contribute
fixes.

## License

Include license type (e.g. MIT, Apache 2.0) and a link to the full license file
if available.
```

---

## ✅ Verification

- [ ] All five sections appear in the correct order
- [ ] No duplicate or conflicting section headings exist
- [ ] Markdown renders properly
- [ ] File passes linting if applicable (e.g. markdownlint)

---

## 📝 Notes

- This Morphlet is intended as a baseline doc hygiene improvement.
- It can be extended with template content pulled from org-level documentation
  standards.
- In future Morphlets, the content of each section can be validated for
  completeness or keywords.
