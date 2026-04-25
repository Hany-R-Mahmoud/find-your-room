# PaperclipAI vs Multica Reliability Comparison

**Date**: 2026-04-25
**Scope**: Local evidence from this machine

## Summary

PaperclipAI looks more dependable than Multica as a local service and
coordination surface, but the evidence does not yet prove it is dependable for
repo-changing implementation work.

The strongest difference is workspace behavior:

- Multica failed the critical repo/workdir contract during the Civic Trust test.
  Agents often ran in isolated workdirs that did not contain the repo or spec.
- Paperclip has a more durable local installation with launchd, persistent data,
  health endpoint, database backups, agent wrappers, and company-level artifact
  folders.

That makes Paperclip operationally stronger, but it still needs a repo-write
smoke test before it should be trusted for real implementation.

## Evidence Collected

### PaperclipAI Service Evidence

Local files and commands show:

- Launch agent exists at
  `/Users/hanyramadan/Library/LaunchAgents/ai.paperclip.host.plist`.
- Launchd log path:
  `/Users/hanyramadan/.paperclip/logs/launchd.log`.
- Error log path:
  `/Users/hanyramadan/.paperclip/logs/launchd.error.log`.
- Health endpoint responded:
  `GET http://127.0.0.1:3101/api/health`.
- Health response included:
  - `status: ok`
  - version `2026.403.0`
  - deployment mode `authenticated`
  - deployment exposure `private`
  - `authReady: true`
  - `bootstrapStatus: ready`
- Launchd service check reported:
  - `paperclip launchctl: loaded (ai.paperclip.host)`
- Recent logs show heartbeat activity every 30 seconds:
  - `heartbeat timer tick enqueued runs`
  - `checked: 2`
  - `enqueued: 2`
  - `skipped: 0`
- Logs show automatic database backup completion.
- Backup directory contains hourly backups, including
  `paperclip-20260425-231321.sql` at about 67 MB.

### PaperclipAI Agent/Artifact Evidence

Local Paperclip company files show:

- Reusable agent library exists at
  `/Users/hanyramadan/.paperclip/instances/default/companies/ab655f75-2c9f-448e-a41c-72ff2c0ebfa8/AGENT_LIBRARY.md`.
- The library lists 20 reusable agents:
  CEO, Orchestrator, Co-Pilot, Pilot, Implementer, Architect, Debugger,
  Reviewer, Tester, Researcher, Docs, Composer, Diagrams, Impeccable, Stitch,
  Data AI, Performance, Ops, Security, and History.
- Agent wrapper files exist under each Paperclip agent directory as
  `instructions/AGENTS.md`.
- Persistent agent artifacts exist:
  - `agents/b6658942-.../execution/ttm-42-plan.md`
  - `agents/9270ea1f-.../work/TTM-50-visual-direction.md`

Those artifacts are real local files. They show Paperclip agents produced
inspectable planning/design outputs in the expected persistent company area.

### PaperclipAI Weaknesses Found

Paperclip is not flawless:

- `paperclip-service-status.sh` reported `paperclip health: down`, while direct
  `curl -s http://127.0.0.1:3101/api/health` returned `status: ok`. That means
  operator tooling has drift or environment mismatch.
- `paperclip_ctl.py summary` failed from this Codex sandbox because:
  - health request hit an `Operation not permitted` sandbox path
  - API key was not available to the helper
- Logs contain prior embedded PostgreSQL startup failures on 2026-04-13.
- Logs contain many expected authenticated-mode 401/403 responses from
  unauthenticated API/UI calls.
- The improvement guide says wrappers were still too thin, role success
  contracts were weak, routing overlap existed, and local control tooling had
  drift.

So Paperclip has better local service maturity, but still needs hardening around
auth, helper configuration, wrapper quality, and verification contracts.

## Multica Evidence Recap

The Multica diagnostic found:

- Creating an assigned issue did not enqueue a run.
- Manual `issue rerun` was required to start the smoke test.
- Attempt 1 wrote the requested file into the real local checkout, then the run
  was marked failed with `runtime_offline`.
- Multica retried automatically.
- Attempt 2 completed in an isolated Multica workdir:
  `/Users/hanyramadan/multica_workspaces_desktop-api.multica.ai/.../workdir`.
- That workdir was not a git repository.
- The agent still reported DONE from the wrong workdir.
- Earlier Civic Trust agents blocked because their workdirs did not contain the
  app repo or approved spec.

That is a direct failure of the repo execution contract.

## Comparison

| Measure | PaperclipAI | Multica |
| --- | --- | --- |
| Local service health | Health endpoint returns OK; launchd loaded | Daemon running |
| Persistent data | Embedded Postgres, local storage, hourly backups | Server/daemon state, but repo workdirs were inconsistent |
| Agent roster | 20 local company agents documented in `AGENT_LIBRARY.md` | Agents exist and can be assigned |
| Execution visibility | Logs, heartbeat runs, company files, persistent agent artifacts | Run history and messages available |
| Repo/workdir reliability | Not proven for this repo; needs smoke test | Failed: workers often lacked repo/spec or used wrong workdir |
| Artifact evidence | Existing local planning/design artifacts found | Smoke file existed once, but retry wrote elsewhere |
| Failure behavior | Prior DB/auth/helper issues visible in logs | False DONE from wrong workdir; runtime status mismatch |
| Operator tooling | Richer but drifted; helper auth/status issues | CLI usable, but issue creation did not imply execution |

## Verdict

PaperclipAI appears better than Multica for persistent local orchestration:

- better service packaging
- better local logs
- better persistence
- better backups
- clearer agent library
- inspectable agent-owned artifacts

But PaperclipAI is not yet proven better for implementation delivery in this
repo. The missing proof is the same proof Multica failed:

1. create a task
2. wake the agent
3. confirm it starts in the correct git repo
4. produce a local file change
5. run verification
6. have Codex confirm the diff

Until that passes repeatedly, Paperclip should be considered promising but not
fully dependable for repo-changing work.

## Recommended Dependability Ladder

Before using Paperclip for real `find-your-room` implementation:

1. Fix the helper status/auth drift:
   - make `paperclip-service-status.sh` agree with direct `/api/health`
   - make `paperclip_ctl.py summary` work with the correct auth context
2. Run a Paperclip repo-write smoke test for this repo:
   - create `docs/find-your-room/paperclip-smoke-test.md`
   - require `pwd`
   - require `git rev-parse --show-toplevel`
   - require `git status --short`
   - require changed files in this checkout
3. Run the smoke test across at least three agents:
   - Co-Pilot
   - Implementer
   - Tester
4. Accept Paperclip for docs/planning only after three clean runs.
5. Accept Paperclip for small code edits only after five clean repo-write runs.
6. Keep Codex as the final verifier for all repo diffs.

## Practical Conclusion

PaperclipAI was more dependable than Multica in local service behavior and
artifact persistence. Multica failed earlier at the exact point that matters:
workers did not reliably operate inside the intended git checkout.

For now:

- use local Codex for implementation
- keep Multica paused
- consider Paperclip the better candidate for future orchestration
- do not depend on Paperclip for code changes until it passes repo-write smoke
  tests in `find-your-room`
