<!-- markdownlint-disable-next-line MD041 -->
<p align="center">
  <a href="" rel="noopener">
  <img width=100px height=100px src="logo.png" alt="morphlet logo"></a>
</p>

<h1 align="center">Morphlet<br/>AI-driven changeset spec</h1>

<div align="center">

[![GitHub Issues](https://img.shields.io/github/issues/drevops/morphlet.svg)](https://github.com/drevops/morphlet/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/drevops/morphlet.svg)](https://github.com/drevops/morphlet/pulls)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/drevops/morphlet)
![LICENSE](https://img.shields.io/github/license/drevops/morphlet)
![Renovate](https://img.shields.io/badge/renovate-enabled-green?logo=renovatebot)

</div>

## What is Morphlet?

A _morphlet_ is a structured, declarative specification — like a recipe — that
describes a specific set of code changes to be applied to a codebase.

Morphlets are designed to be AI-readable and human-auditable. They provide the
data and instructions required for an AI coding agent to apply consistent,
context-aware changes across a codebase.

Each morphlet captures the intent, scope, and exact transformation steps needed
to evolve a codebase — such as modifying configuration, refactoring logic, or
updating styles — in a reusable, version-aware format.

Importantly, a morphlet is not the tool or actor that performs the
transformation. It is the _input_ to such a tool — a standalone unit of change
that tells an AI agent _what_ to do and _why_, without being tied to any
particular implementation.

## Why Morphlet?

Sometimes it is not enough or possible to maintain or apply a code patch/diff to
introduce a change in a codebase. In the pre-AI era, we used to store code
snippets in gists or text files, and then would selectively copy-paste parts
of them into the codebase, adjusting them to fit the context. This was
error-prone, time-consuming, and hard to maintain. It would also be hard to
share such changes with others.

In the AI era, we can do better. Morphlets are a way to formalize this process
and make it more structured, reusable, and AI-friendly.

Morphlets allow you to maintain your own library of recorded changes as Markdown
files that can be smartly and flexibly applied to a codebase by AI agents or
humans.

Morphlets provide a [format](specs) for describing changes
and tools to apply them, making it easier to evolve codebases over time without
losing track of what was done, why, and how.

## What is this repository?

This repository provides the Morphlet specification, tools, and examples to help
you create, apply, and maintain morphlets in your projects.

We also provide a [template](MORPHLET_TEMPLATE.md) for creating new morphlets,
as well as [capture](MORPHLET_CAPTURE.md) and [apply](MORPHLET_APPLY.md)
instructions for using morphlets with AI agents.

We automatically test the template and instructions with AI agents to make
sure that the instructions are clear and actionable.

## Features

- AI-readable and human-auditable specifications for code changes
- Structured, declarative format using Markdown
- Version-aware and context-aware transformations
- Reusable morphlets that can be applied across different projects
- Template-based creation and standardized application process
- Built-in validation and verification steps

## Installation

1. Copy the [morphlet template](MORPHLET_TEMPLATE.md) to your project
2. Copy [MORPHLET_CAPTURE.md](MORPHLET_CAPTURE.md) or [MORPHLET_APPLY.md](MORPHLET_APPLY.md) depending on your needs
3. Use with your AI agent following the instructions in the copied files

## Usage

You can _create_ and _apply_ morphlets.

### Creating a morphlet

1. Copy the [morphlet template](MORPHLET_TEMPLATE.md) to a new file in your
   project.
2. Copy [MORPHLET_CAPTURE.md](MORPHLET_CAPTURE.md) file to your project.
3. Prompt your AI agent: `Read MORPHLET_CAPTURE.md and fill in <your morphlet file>.`

By default, the agent will capture the changes in the codebase either for
uncommitted files or for the last commit.

### Applying a morphlet

1. Copy [MORPHLET_APPLY.md](MORPHLET_APPLY.md) file to your project.
2. Prompt your AI agent: `Read the instructions in MORPHLET_APPLY.md and apply the changes described in <your morphlet file> to my codebase.`

By default, the agent will apply the morphlet changes to the codebase. No code
will be committed or pushed automatically.

### Examples

Head over to the [examples](examples/) directory to see some morphlets.

## Maintenance

Similar to how you maintain patches in your codebase, you can maintain
morphlets in a dedicated directory in your project. We suggest creating a
`morphlets/` directory in the root of your project to store all morphlets.

Applied morphlets will have a date it was applied and validation checks
filled in for each document.

The morphlet spec will be evolving over time, so you may need to update
your morphlets to keep them compatible with the latest version of the morphlet
spec. We will provide a migration guide for each morphlet version update.

## License

MIT License - see LICENSE file for details.

---
_This repository was created using the [Scaffold](https://getscaffold.dev/)
project template_
