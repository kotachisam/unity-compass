---
title: Gaus-specific Vocabulary Primer
description: Terms and constructions specific to Gerald Gaus's work, especially *The Open Society and Its Complexities* (2021). Deliberative Model, reconciliation-coordination game, inherent utility, k_n, strategic model of justification, six-element perspective model.
type: primer
created: 2026-04-11
last_updated: 2026-04-11
---

# Gaus-specific Vocabulary Primer

Terms and constructions that are specific to Gerald Gaus's work, especially *The Open Society and Its Complexities* (2021) and its predecessor *The Order of Public Reason* (Princeton UP, 2011). This is author-specific vocabulary, not a formal theory domain.

Builds on the decision theory, game theory and social choice theory primers: see [`decision-theory.md`](decision-theory.md), [`game-theory.md`](game-theory.md), [`social-choice-theory.md`](social-choice-theory.md) for the underlying vocabulary. This file covers what Gaus does with those formal tools specifically, plus his own conceptual constructions.

Each entry gives the definition in two to four sentences, a concrete example where useful, and a note on where the concept shows up in the thesis context.

## Contents

- Deliberative Model
- Reconciliation-coordination game
- Inherent utility vs total utility
- Bicchieri's sensitivity variable k_n
- Tooby-Cosmides-DeScioli model
- Strategic model of justification
- Perspective model (six elements)

---

## Deliberative Model

Gaus's formal model of moral justification, first developed in *The Order of Public Reason* (Princeton UP, 2011) and summarised in §19.3 of *The Open Society and Its Complexities* (2021). Uses social choice theory to model impartial acceptability of moral rules.

The setup: each Member of the Public has an ordinal ranking of possible moral rules, including a "no rule" option z. The eligible set is the set of rules ranked above z by everyone. The maximal set (or "optimal eligible set") is the set of rules that are Pareto-optimal within the eligible set. Society can justifiably adopt any rule in the optimal eligible set.

The Deliberative Model uses **quasi-transitive** Pareto-or-Indifference reasoning, not full cardinal utility. §20 is explicitly a cardinalisation of this ordinal model. The thesis's sharpest differentiation move against Gaus is grounded in §20.1 footnote 3, which flags the cardinalisation as a new assumption not required by the ordinal Deliberative Model.

## Reconciliation-coordination game

Gaus's name for the game underlying his Deliberative Model (§19.3) and Self-Organization Model (§20). In this game, individuals value reconciliation-coordination (acting on a shared rule with others) over "going it alone" (acting on their preferred rule unilaterally). The game is a 2×2 coordination game with ordinal payoffs in §19.3 and cardinal payoffs in §20.

The key property of the reconciliation-coordination game is that every rule in the eligible set is a Nash equilibrium: if everyone else adopts rule x, your best response is to adopt x, regardless of which rule you prefer on its own merits. The game cannot tell you which rule gets selected, only which rules are stable if selected.

## Inherent utility vs total utility

**Inherent utility** μ_A(R), introduced in Gaus §10.3 and developed in §20.1: agent A's evaluation of rule R on its own merits, independent of how many others are acting on it. Captures the agent's moral assessment of R as a rule in isolation. Gaus assumes inherent utility is "cardinal, interpersonally noncomparable" throughout.

**Total utility** U_A(R), §20.1: agent A's complete evaluation of R, combining inherent utility with reconciliation value. In §20 this is the product form U_A(R) = μ_A(R) × w_A(n)(R) where w_A(n)(R) is a weighting function capturing how much A values others sharing R. The cardinalisation of the Deliberative Model is driven specifically by the need to compute this product: you cannot multiply ordinal rankings.

## Bicchieri's sensitivity variable k_n

Cristina Bicchieri's formal concept (from *The Grammar of Society*, Cambridge UP, 2006) for how much personal cost an agent will pay to adhere to a social norm n. A high k_n means the agent will comply with the norm even under significant self-interested pressure; a low k_n means the agent will defect easily.

Gaus uses k_n in §9.3 to capture variation in how strongly different agents value shared moral rules. §20's weighting function w_A(n)(R) formalises this: it varies with n (the number of others acting on R) and captures agent-specific sensitivity to uptake. The four agent types in §20 (Quasi-Kantian, Moderately Conditional, Linear, Highly Conditional Cooperators) are different shapes of k_n.

## Tooby-Cosmides-DeScioli model

An evolutionary psychology model of morality developed by John Tooby, Leda Cosmides, Peter DeScioli and colleagues. Argues that moral judgment evolved not for the benefit of the judged individual but for the benefit of observers choosing which side to take in conflicts. Side-taking and coalition dynamics drive the evolution of moral rules.

Gaus cites this in §10.2 as a conceptual foundation for his strategic model of justification in §10.3. §20 explicitly says it picks up where the Tooby-Cosmides-DeScioli model leaves off.

## Strategic model of justification

Gaus's own name for his formal model developed in §10.3 and extended in subsequent sections. Assumes that moral justification serves agents' interests (directly or via the moral networks they join) and that moral argument is strategic advocacy. The model has three assumptions: Moral Disagreement (agents differ on the best cooperative rule), Benefits of Expanding Cooperation (every individual benefits from being in a larger moral network), Strategic Advocacy (agents defend moral rules that serve their interests).

The Strategic Model of Justification is the formal spine running through Parts I and II of Gaus's book. §10.3 introduces it, §19.3 develops it via social choice (the Deliberative Model) and §20 gives it the self-organisation formalisation (the Self-Organization Model).

## Perspective model (six elements)

Gaus's formal model of an agent from §15.1. An agent's perspective has six elements:

1. Goals, evaluative standards, values, normative principles
2. Method for modifying these standards
3. Categorisations of the natural and social world
4. Set of options in any judgment-action context
5. Predictive models mapping options to social worlds
6. A ranking function applying elements I, III, IV and V to the resulting social worlds

Crucially, Gaus writes that element VI "may generate multiple non-aggregated rankings based on different evaluative standards" (p. 104). This is structurally a partial-ordering claim in Gaus's own conceptual framework.

A key finding from the thesis work is that this perspective model is a **conceptual orphan** in Gaus's own book. It is introduced in §15.1, never referenced again in §20, and never formally integrated with the Self-Organization Model. The thesis's move to connect the perspective model to the formal object is creative work Gaus himself does not do.

Element V (predictive models) is currently absent from the thesis's own formal sketch and has been flagged as a missing component. See methodological-evolution.md under Formal object evolution for the "Predictive models as a missing element" subsection.
