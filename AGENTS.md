# AGENTS.md

MonoCode is a desktop GUI for external agent CLIs (Claude Code, Codex, Cursor, OpenCode, …). Two codebases share this repo: the Tauri 2 + React 19 desktop app (`src/`, `src-tauri/`) and a headless Node "host" (`host/`) that runs the same TypeScript adapters for remote sessions. This is a Windows-first fork: the Expo mobile app, its Rust transport (`crates/mobile-link`), and the phone pairing feature were removed, but macOS/Linux desktop code is deliberately kept so upstream fixes still merge.

## Verify before finishing

- `npm run check` — the main CI gate: `vitest run`, `tsc --noEmit`, `cargo fmt --check`, `cargo clippy --workspace --all-targets -- -D warnings`, `cargo test`. It does **not** run host tests or browser tests; CI runs those as separate jobs, so run them yourself when you touch `host/`, adapters, or transcripts.
- `npm run check:web` / `npm run check:rust` — same checks, one side only.
- Single test: `npx vitest run src/features/workspace/model/layout.test.ts` (the root config collects only `src/**/*.test.ts`). `npx vitest run -t "name"` narrows by test name.
- `npm run test:host` — builds `build/host/monocode-host.mjs` via `pretest:host`, then runs serially because suites launch real git/node processes.
- Browser tests: `npx playwright install chromium webkit` once, then `npm run test:browser`. It starts its own Vite on :1435 (chromium + webkit, 1 worker) and is required for transcript, scroll, and layout changes — happy-dom unit tests cannot see real geometry. Specs share a few fixtures (`tests/browser/<name>.html` + `.tsx`, e.g. `workspace-performance.html` hosts most workspace specs) that render real components with a fake Tauri IPC (`window.__TAURI_INTERNALS__` or `tests/browser/tauriFixture.ts`); several throw on an unexpected command, so new Tauri calls made from rendered code need a fixture stub.
- There is no ESLint or Prettier gate for the desktop app — `prettier` is a runtime dependency of the in-app editor. Don't reformat unrelated files.

## Non-obvious rules

- Root Vitest environment is `node`. UI tests must be `.test.ts` (the include pattern never matches `.tsx`) and opt into DOM with a `// @vitest-environment happy-dom` docblock.
- `tsconfig.json` excludes `src/**/*.test.ts`, so `tsc --noEmit` does not typecheck tests.
- Some suites skip themselves silently. `workspace-performance.spec.ts` is skipped unless `MONOCODE_PERFORMANCE=1` (`tests/browser/performance.config.ts`); the markdown frame-time assertions only run with `MARKDOWN_PERFORMANCE=1`; Antigravity's real/soak suites need `AGY_REAL=1` / `AGY_SOAK=1` plus the installed binary. All `*Live.test.ts` files are fully mocked and do run in CI.
- A provider is not wired up until four registries agree: `HarnessId`/`HARNESSES` (`src/features/sessions/model/session.ts`), `REMOTE_PROVIDERS` (`src/features/connections/model/protocol.ts`), `registerBuiltinHarnesses` (`src/integrations/harness/core/register.ts`), and `hostProviders` (`host/providers.ts`). `host/providers.test.ts` asserts they match, and per-model metadata also lives in `src/features/sessions/model/models.ts`. `CONTRIBUTING.md` currently asks for no new providers.
- File/Git commands also work on connected machines only if they are added in three places: the Rust command in `src-tauri/src/lib.rs`'s `generate_handler!`, `HOST_COMMANDS` plus any path translation in `src/features/connections/model/remoteCommands.ts`, and `WORKSPACE_COMMANDS` plus a handler in `host/workspace-commands.ts`. Feature code should call the wrappers in `src/platform/tauri/fs.ts`, whose private `invoke` is `invokeWorkspace`; that is what routes `remote://` paths to the owning machine.
- Session DB schema changes go at the end of `migrate()` in `src-tauri/src/session_store.rs` as a new `if current < N` block (currently 19); earlier blocks are history and must not be rewritten. The same file holds the schema and its tests.
- `.gitattributes` pins `*.sh` to LF because `remote_bootstrap.sh` is embedded with `include_str!` and sent to Unix hosts. Keep shell scripts LF; the Rust code normalizes CRLF defensively but the checked-in file must stay LF. `host/windows-acl.ps1` is embedded both by `remote_ssh.rs` and into the host bundle by `host/build.mjs`, so editing it changes remote setup too.
- `vendor/portable-pty` is an excluded, locally patched crate (atomic Windows ConPTY job assignment). Don't bump, reformat, or "fix" it; read its `UPSTREAM.md` first.
- Version bumps: `npm run set-version -- 0.16.1` rewrites `package.json`, both lockfile versions, the workspace `Cargo.toml`, `tauri.conf.json`, and `Cargo.lock`. A release tag must match all of those and have a `## [x.y.z]` CHANGELOG heading; prerelease tags publish only the beta updater feed (`scripts/release-channel.cjs`).
- `src/instructions/inbox.md` is a runtime prompt shipped inside the app, not repository guidance.
- `CONTRIBUTING.md` defers large Tauri-specific refactors while Rust + GPUI migration work continues on branch `mc/migrate-monocode-to-gpui`.
- The remaining plan is `docs/i18n-zh-plan.md` (Simplified Chinese UI); it is not implemented yet. The mobile-removal half is done and recorded in `docs/windows-only-plan.md`.

## Where things live

- `src/main.tsx` — boot: primes home dir and provider binary paths, lazily imports `App.tsx`.
- `src/app/` — composition, window shell, updater/quit lifecycle. `App.tsx` is the desktop dispatch hub and is very large.
- `src/features/<name>/` — feature behavior with tests beside it, split into `ui/`, `model/`, `data/`, and `hooks/` where needed. `sessions`, `monos`, and `inbox` are the heaviest.
- `src/integrations/harness/` — provider-independent core (`core/registry.ts` `HarnessAdapter` lifecycle, `core/child.ts` process backend) plus one folder per provider (`*Adapter.ts` + pure `*Protocol.ts`).
- `src/platform/tauri/` — browser-to-Tauri adapters for filesystem, PTY, clipboard, platform.
- `src-tauri/src/` — PTYs, filesystem/git, SQLite session store, windows/tray, remote SSH. Every Tauri command is registered in one `generate_handler!` list in `lib.rs`, a merge-conflict hotspot — append to the end.
- `host/` — headless host server; `host/cli.ts` bundles to `build/host/monocode-host.mjs` and reuses `src/` adapters through `ChildBackend`. Lifecycle, pairing, and SSH behavior are documented in `docs/remote-access.md`.

## Run it

- `npm run tauri dev` — desktop app (Vite pinned to :1420). `npm run dev` alone is only the web UI.
- `npm run dev:stable` / `npm run tauri:stable` — stable channel; watch and HMR disabled.
- `npm run host:build` then `npm run host` — run the headless host (Node 24+). `npm run host:package -- --all` builds all six archives with a pinned Node runtime.
- `npm run build:linux` / `build:fedora` / `build:windows` — platform bundles under `target/release/bundle/`; see `docs/building.md`.
- `quick-composer.html` and `mono-chat.html` are separate Vite entries with their own roots (`src/features/quick-composer/main.tsx`, `src/features/monos/floatingMain.tsx`); keep the workspace app out of them.
- Node 20+ for the desktop (`npm run check` runs it on Node 20; browser/host CI jobs use Node 24, the host requires 24+). On Node 26, prefix web checks with `NODE_OPTIONS=--no-experimental-webstorage` to keep happy-dom tests working.
