---
title: Social Choice Theory Primer
description: Concise reference for the formal vocabulary of social choice theory. Aggregation problem, Pareto principles, Arrow's theorem, eligible and maximal sets, Sen's framework.
type: primer
created: 2026-04-11
last_updated: 2026-04-11
---

# Social Choice Theory Primer

Concise reference for social choice theory vocabulary. Scoped to what the reading programme needs, not comprehensive textbook coverage. Builds on the decision theory vocabulary in [`decision-theory.md`](decision-theory.md): preferences, orderings, dominance and the ordinal/cardinal distinction are assumed.

Each entry gives the definition in two to four sentences, a concrete example where useful, and a note on where the concept shows up in the thesis context. See [`README.md`](README.md) for convention and related primers.

## Contents

- Aggregation problem
- Pareto dominance and Pareto unanimity
- Arrow's impossibility theorem
- Eligible set and maximal set
- Sen's framework

---

## Aggregation problem

**Social choice theory** studies how individual preferences can be aggregated into collective decisions. Given N individuals each with their own preference ordering over options, what is the "social" preference ordering? The aggregation problem is the formal question of whether such aggregation can be done satisfying various reasonable conditions.

Arrow's theorem (see below) shows that no aggregation rule can satisfy all of a set of plausible conditions simultaneously. This is the field's foundational impossibility result. Bradley 2022's result is in the same tradition but for social evaluation under ambiguity.

## Pareto dominance and Pareto unanimity

**Pareto dominance**: option A Pareto-dominates option B if every individual ranks A at least as well as B and at least one individual ranks A strictly better. An option is **Pareto-efficient** (or Pareto-optimal) if no other option dominates it.

**Pareto unanimity**: if every individual strictly prefers A to B, the social ranking should place A above B. This is the weakest form of the Pareto principle and is almost universally accepted.

**Strong Pareto**: social betterness supervenes positively on individual betterness. This is one of Bradley 2022's three weak conditions. **Pareto for Equivalent Outcomes** is Bradley 2022's specific version, weaker than Strong Pareto in certain respects. The thesis proposes to preserve the structural analogues of State Dominance and Pareto while replacing impartial evaluation with situated assessment.

## Arrow's impossibility theorem

**Arrow's theorem** (1951) proves that no social choice rule can simultaneously satisfy: unrestricted domain (any preferences allowed), non-dictatorship (no single individual determines the outcome), Pareto unanimity and independence of irrelevant alternatives (the social ranking between A and B should not depend on preferences about a third option C). This is the canonical impossibility result in social choice theory.

Arrow's theorem motivates much subsequent work: each "escape" from impossibility involves relaxing one of the conditions. Sen's liberal paradox and Bradley's 2022 impossibility result are in the same tradition. The thesis's proposed escape is to replace impartial evaluation entirely with situated structural assessment.

## Eligible set and maximal set

**Eligible set** (Sen and Gaus usage): in a social choice setting with a "no decision" outcome z, the eligible set is the set of options every individual ranks above z. If z represents "no moral rule on this matter", the eligible set is the set of rules everybody finds at least minimally acceptable.

**Maximal set** (Sen): among the eligible set, the maximal set is the set of options that are not strictly Pareto-dominated by any other option in the eligible set. These are the candidates for collective choice.

Gaus's Deliberative Model in §19.3 is built around the eligible set and maximal set construction. The "optimal eligible set" contains options every agent sees as superior solutions to their moral reconciliation-coordination problem. See [`gaus-vocabulary.md`](gaus-vocabulary.md) for Gaus-specific usage.

## Sen's framework

Amartya Sen's broader contribution to social choice includes: the liberal paradox (Pareto and minimal liberty conflict), the impossibility of a Paretian liberal, the critique of utilitarianism and the capability approach as an alternative foundation for welfare comparisons.

Sen's **positional objectivity** (Sen 1993, "Positional Objectivity", *Journal of Philosophy* 90(3)) is the concept the thesis borrows for the conditional observer-independence retreat. Facts can be objective relative to a position rather than relative to preferences. This is the central Sen reference for the thesis and is the philosophical cover for the tiered-defensibility argument about structural features.
