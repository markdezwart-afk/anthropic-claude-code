# CV & Wensen

Plaats hier de input voor de job-orchestrator subagent:

- `cv.pdf` — je CV als PDF (werkervaring, opleiding, skills, talen, etc.)
- `wensen.md` — optioneel: extra voorkeuren (locatie, contractvorm, thuiswerk-ratio, reistijd, no-go's, talen van de werkvloer, etc.)

De orchestrator en de drie job-finder subagents lezen deze bestanden automatisch.

## Starten

Vraag in Claude Code:

> Start de `job-orchestrator` en zoek passende vacatures.

De orchestrator roept dan de drie subagents (`job-finder-financial`, `job-finder-social`, `job-finder-ecological`) parallel aan, categoriseert de resultaten in `vacatures/<categorie>/` en schrijft een overzicht naar `vacatures/overzicht.md`.
