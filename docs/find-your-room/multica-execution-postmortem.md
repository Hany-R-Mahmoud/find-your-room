# Multica Execution Postmortem

**Date**: 2026-04-25
**Status**: Multica paused; local Codex execution is the active path

## Context

The Civic Trust Visual Redesign Handoff spec was approved and converted into
Multica issues. The user later reported that the backlog did not show the work
clearly, many tasks did not start, other tasks appeared blocked, and no useful
file changes were visible in the project folder.

The same redesign work has now been handled through the local Codex workflow.

## Diagnostic Smoke Test

On 2026-04-25, Codex ran a limited diagnostic exception against Multica issue
`SOK-11`: "Multica smoke test: repo write and evidence return."

The task was intentionally tiny: create only
`docs/find-your-room/multica-smoke-test.md`, then report changed files and git
evidence.

Results:

- Creating the assigned issue did not enqueue work. The issue stayed in
  `backlog`, `issue runs` returned `[]`, and the daemon reported
  `active_task_count: 0`.
- Manual `issue rerun` did enqueue work and the daemon reported one active
  task.
- Attempt 1 wrote the requested file into the real local checkout and posted a
  DONE comment, but the run was still marked `failed` with
  `failure_reason: runtime_offline`.
- Because attempt 1 was marked failed, Multica launched attempt 2.
- Attempt 2 completed in an isolated Multica workdir:
  `/Users/hanyramadan/multica_workspaces_desktop-api.multica.ai/.../cd65df5b/workdir`.
- That workdir was not a git repository, so `git status` failed there.
- Attempt 2 still reported DONE, even though the file was written to a Multica
  workdir rather than the intended project checkout.

This confirms that Multica can start agents and can write files, but the
execution contract is unreliable unless the correct repo checkout and git state
are guaranteed before task assignment.

## What Went Wrong

The disappointing outcome appears to be a workflow integration failure, not a
spec-quality failure.

Observed issues:

- Multica issue creation did not translate into visible, trustworthy backlog
  progress for the user.
- Agent execution state was opaque: tasks could be created while still not
  visibly starting or producing artifacts.
- Blocked tasks did not feed a useful recovery loop back into Codex.
- There was no reliable file-change handoff into this repo, so even completed
  or attempted remote work did not produce inspectable diffs.
- The repo workflow expected local, reviewable artifacts, while Multica added a
  second state system that was not dependable enough to be the source of truth.
- Some agents marked work DONE even when they were operating in the wrong
  workdir or could not run git verification.
- Runtime status could disagree with visible task behavior: an attempt that
  wrote a file and commented DONE was still recorded as failed, causing a retry.

## Likely Causes

These are inferences from the observed behavior, not internal Multica logs:

- Issue records and agent execution were decoupled: creating issues did not
  guarantee work started.
- Backlog visibility and project filtering were unreliable enough that the user
  could not verify state from the UI.
- Remote agents did not have a strong enforced contract to return concrete repo
  changes, changed file paths, verification output, and blocker details.
- The handoff had too many moving parts for an unproven integration: issue
  creation, assignment, agent startup, repo access, file writes, and progress
  reporting all had to work.
- There was no local preflight confirming each Multica agent could edit the
  target workspace before meaningful work was assigned.
- Multica worker directories were not consistently initialized as git checkouts
  of the target repository.
- Issue creation and assignment did not automatically create a run; a separate
  `issue rerun` was required in the smoke test.
- The agent completion contract did not require "wrong workdir" or "not a git
  repository" to be treated as BLOCKED.

## Evidence From Failed Civic Trust Issues

The earlier Civic Trust issues show the same failure pattern:

- `SOK-3` Security and `SOK-4` Product blocked because
  `specs/006-civic-trust-redesign-handoff/spec.md` did not exist in the worker
  workspace.
- `SOK-6` Stitch blocked because the worker workspace did not contain the app
  codebase or spec.
- `SOK-7` Tester blocked because implementation had not been delivered and the
  upstream execution issue was already blocked.

These failures happened even though the spec and code did exist in the real
local checkout. The blocker was Multica workspace provisioning, not missing
project work.

## Fix Plan Before Re-Enabling Multica

Multica should not be used for meaningful execution again until all of these
preflights pass:

1. **Repo checkout preflight**: Each worker run must begin in a git repository
   for `find-your-room`, not a generic Multica workdir.
2. **Path preflight**: `pwd`, `git rev-parse --show-toplevel`, and
   `test -f specs/006-civic-trust-redesign-handoff/spec.md` must succeed before
   the agent starts work.
3. **Write preflight**: The agent must create or update a harmless file and
   produce a visible `git status --short` result from the target repo.
4. **Run-state preflight**: Creating an assigned issue must either enqueue a run
   automatically or Codex must explicitly call `issue rerun` and verify the run
   starts.
5. **Completion gate**: If `git status` cannot run, the agent must mark the task
   BLOCKED, not DONE.
6. **Artifact gate**: Every final comment must include:
   - actual `work_dir`
   - `git rev-parse --show-toplevel`
   - changed files
   - commands run
   - blocker status
7. **Codex verification gate**: Codex must verify the resulting diff in this
   local checkout before accepting the task as complete.

Recommended issue template:

```text
Before doing the task:
1. Run pwd.
2. Run git rev-parse --show-toplevel.
3. Run test -f AGENTS.md.
4. Run test -f <spec path>.
5. If any command fails, stop and mark BLOCKED.

Definition of done:
- git status --short from the target repo shows expected files
- final comment includes work_dir, git root, files changed, commands run
- task is BLOCKED if the worker is not inside the target git repo
```

Recommended operational change:

- Codex should create at most one Multica issue at a time until the full loop is
  proven: issue visible, run started, correct repo checkout, file changed,
  comment posted, local diff verified.

## Decision

Multica is paused for this project.

Until explicitly re-enabled by the user:

- no Multica CLI/API commands should be sent
- no new Multica issues should be created
- no project progress should depend on Multica backlog state
- local Spec Kit specs, local agents, docs, tests, and git-visible file changes
  are the source of truth

## Replacement Workflow

For approved specs:

1. Keep planning, research, and decisions in `docs/`.
2. Create or update the Spec Kit spec and get approval.
3. Execute locally through the relevant `agent-*` flow.
4. Verify with local commands and inspectable diffs.
5. Update docs and roadmap after completion.

## Lessons

- External orchestration should not be trusted for meaningful execution until a
  small smoke test proves issue visibility, agent startup, repo write access,
  and artifact return.
- A task is not complete unless this repository shows the expected file changes
  and verification evidence.
- Backlog tools are coordination aids; local repo artifacts remain the source of
  truth.
