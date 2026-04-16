# Primers

Concise reference documents for formal vocabulary and background concepts the doctoral reading programme relies on. Each primer covers a single domain at a level of detail calibrated to what the reading programme actually needs, not comprehensive textbook coverage.

## What lives here

| File | Covers | Relates to |
|---|---|---|
| [`decision-theory.md`](decision-theory.md) | Preferences, orderings, utility (ordinal and cardinal), completeness, transitivity, dominance, partial orderings, parity. | Foundational for the other primers. Read first. |
| [`game-theory.md`](game-theory.md) | Games, Nash equilibrium, ESS, coordination games, cooperative vs non-cooperative, replicator dynamics, vector-valued games. | Builds on decision theory. |
| [`social-choice-theory.md`](social-choice-theory.md) | Aggregation problem, Pareto principles, Arrow's theorem, eligible and maximal sets, Sen's framework including positional objectivity. | Builds on decision theory. |
| [`gaus-vocabulary.md`](gaus-vocabulary.md) | Terms specific to Gerald Gaus's work: Deliberative Model, reconciliation-coordination game, inherent utility, Bicchieri's k_n, the strategic model of justification, the six-element perspective model. | Builds on all three formal primers above. Author-specific rather than domain-general. |

All four created 2026-04-11 to support reading of Gaus §§9.3, 10.3, 19.3 and 20 without stalling on foreign terms.

## Convention

Primers are living documents. Add entries as new concepts surface in the reading. Each entry: the definition in 2-4 sentences, a concrete example where useful, and a note on where the concept shows up in the thesis context. British English, flat encyclopedic tone, no Oxford commas, no em dashes.

**One primer per domain.** If a new mathematical or theoretical domain becomes relevant, create a new primer file rather than overloading an existing one. Cross-reference between files using relative links. Reserve author-specific vocabulary files (`{surname}-vocabulary.md`) for terms that are truly specific to one author's work and build on the domain primers.

**Primers are reference documents, not source content.** They are NOT absorbed into the wiki via `/wiki absorb`. They exist to speed up the reading work that feeds into the absorb pipeline, not to be compiled into encyclopedia articles.

## Candidate future primers

As the reading programme progresses, these are the primer files that will probably be needed:

- **`riemannian-geometry.md`** — metric tensor, geodesic, curvature, tangent space, connection, fibre bundles. For when Schutz, Lee and Boumal become relevant.
- **`convex-analysis.md`** — pointed cones, dual cones, polyhedral representations, generalised inequalities, conic duality, convex optimisation basics. For Boyd & Vandenberghe and Ehrgott.
- **`bayesian-decision-theory.md`** — Bayesian belief revision, prior and posterior, coherence, subjective probability, scoring rules. For Bradley 2017 *Decision Theory with a Human Face*.
- **`evolutionary-dynamics.md`** — fitness landscapes, replicator equation extensions, Lyapunov stability, shifting balance theory, quasi-species. For Hofbauer & Sigmund, Alexander 2023, Wright 1932.
- **`philosophy-of-science.md`** — structural realism, theory-ladenness of observation, thick concepts, observer-independent vs observer-relative facts, Putnam on fact/value. For Ladyman & Ross, Putnam & Walsh, Searle, Väyrynen.
- **`bradley-vocabulary.md`** — Bradley-specific terms from the 2022 paper: Outcome Anonymity, State Dominance and Pareto for Equivalent Outcomes in Bradley's specific forms, the mainstream rationality theories he compares to, the Sure-Thing Principle, his ambiguity-aversion framing.
- **`thesis-vocabulary.md`** — thesis-specific terminology once stable: structural equilibrium, configuration manifold, cone bundle, position-vector, variable geometry, tiered defensibility. Write this last, after the terminology has settled.

Add entries to the table above as each primer gets created.
