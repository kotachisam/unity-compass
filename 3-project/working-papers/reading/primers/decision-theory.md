---
title: Decision Theory Primer
description: Concise reference for the formal vocabulary of decision theory. Preferences, orderings, utility, dominance, partial orderings, parity.
type: primer
created: 2026-04-11
last_updated: 2026-04-11
---

# Decision Theory Primer

Concise reference for decision theory vocabulary. Scoped to what the reading programme needs, not comprehensive textbook coverage. Written for an engineering physics background where the calculus is easy but the formal-theory terminology may be rusty or new.

Each entry gives the definition in two to four sentences, a concrete example where useful, and a note on where the concept shows up in the thesis context. See [`README.md`](README.md) for convention and related primers.

## Contents

- Preferences and orderings
- Completeness
- Transitivity and quasi-transitivity
- Ordinal and cardinal utility
- Interpersonally (non)comparable utility
- Expected utility and von Neumann–Morgenstern axioms
- Dominance
- Partial orderings and incomplete preferences
- Parity

---

## Preferences and orderings

A **preference relation** is a binary relation over options. When an agent prefers option A to option B, we write **A ≻ B** (strict preference). When she is indifferent between them, we write **A ~ B**. When she regards A as at least as good as B, we write **A ≿ B**.

A **preference ordering** is a preference relation with certain formal properties, typically at minimum transitivity. Which properties you require shapes what kind of utility representation can be built on top of it.

## Completeness

A preference relation is **complete** if for any two options A and B, the agent can rank them: either A ≻ B, B ≻ A or A ~ B. There is no fourth case.

Classical decision theory assumes completeness. The thesis (and Aumann 1962) questions this: some options may be genuinely incomparable for an agent, so there is a fourth case where she can neither rank them nor call them equivalent. Gaus's §20.1 footnote 3 explicitly acknowledges that his cardinal model "requires completeness of orderings, something I did not assume in the ordinal model."

## Transitivity and quasi-transitivity

**Transitivity** says that if A ≻ B and B ≻ C then A ≻ C. This is the standard assumption in decision theory and makes preference relations behave like orderings in the mathematical sense.

**Quasi-transitivity** is weaker. It requires only that strict preference ≻ is transitive. Indifference ~ does not have to be transitive. So you can have A ~ B, B ~ C and still A ≻ C. Gaus's Deliberative Model in §19.3 uses a quasi-transitive "Pareto or Indifference" rule.

Concrete example: a coffee drinker cannot tell the difference between cups with one and two grains of sugar added, nor between two and three grains, and so on up to one hundred grains. Indifference is not transitive across small sensory differences. But she strictly prefers zero grains to one hundred grains. Quasi-transitivity captures this.

## Ordinal and cardinal utility

An **ordinal utility function** assigns each option a number such that higher numbers correspond to more-preferred options, but only the ranking matters. If u(A) = 3 and u(B) = 5, this only tells you B is preferred to A; it says nothing about "by how much". Any order-preserving transformation gives an equally good ordinal utility function.

A **cardinal utility function** assigns numbers where the differences between them are meaningful. If u(A) = 3 and u(B) = 5, the difference of 2 means something in its own right. Cardinal utility supports operations like averaging (expected utility of a gamble), multiplication (e.g. U_A(R) = μ_A(R) × w_A(n)(R) in Gaus §20) and comparison of differences.

The ordinal-cardinal distinction matters because ordinal utility is a weaker assumption. You can build a lot of decision theory on ordinal preferences alone, including classical social choice theory. Moving from ordinal to cardinal is a substantive commitment. Gaus explicitly flags this in §20.1 footnote 3: the cardinal version requires completeness while the ordinal version did not.

## Interpersonally (non)comparable utility

Utility is **interpersonally comparable** if statements like "Alf values R more than Betty does" have meaning. Classical welfare economics (Harsanyi, Bentham) typically assumes interpersonal comparability so social welfare functions can add or average utilities across people.

Utility is **interpersonally non-comparable** if each agent's utility is only meaningful for that agent and cannot be meaningfully compared across agents. Modern game theory and most of decision theory assume non-comparability. Gaus is careful about this: "these utilities do not support interpersonal comparisons" (§20.1, p. 147 footnote 1).

Bradley's 2022 paper operates at the other extreme: his "impartial evaluator" assumes interpersonally comparable well-being. The thesis engages both positions.

## Expected utility and von Neumann–Morgenstern axioms

**Expected utility theory** says that under uncertainty a rational agent should choose the option that maximises the expected value of her utility function, where expected value weights possible outcomes by their probabilities. If option A gives utility 10 with probability 0.5 and utility 0 with probability 0.5, its expected utility is 5.

The **von Neumann–Morgenstern axioms** (1944) are four axioms on preferences (completeness, transitivity, continuity, independence) that together are necessary and sufficient for preferences to be representable by an expected-utility function that is cardinal and unique up to positive linear transformation. vNM is the standard foundation for decision under risk.

Gaus's cardinal utility in §20.1 is defined via the vNM axioms: his footnote 1 says "utility is simply a mathematical representation of a preference ordering (a ranking in terms of choice-worthiness) that meets the standard von Neumann–Morgenstern axioms."

## Dominance

Option A **dominates** option B if A is at least as good as B in every state of the world and strictly better in at least one state. Dominance is a weak and uncontroversial rationality requirement: if A dominates B, a rational agent should never choose B over A.

**State dominance** is Bradley 2022's version: if X's outcome is at least as good as Y's in every state, X is at least as good overall. It is one of the three weak conditions Bradley proves are jointly sufficient to force impossibility results.

In the thesis, **dominance cones** are the local generalisation: at each point x on the configuration manifold, an agent's dominance cone picks out the set of tangent directions that would move her to a dominating position from her situated perspective. This is the formal home of partial orderings in the coordination space sketch.

## Partial orderings and incomplete preferences

A **partial ordering** is a preference relation that is transitive but not complete. Some pairs of options can be compared (A ≻ B or A ~ B), but some cannot be ranked at all: neither A ≻ B nor B ≻ A nor A ~ B holds. The agent's preferences have a "gap" on these pairs.

**Incomplete preferences** in the decision theory literature (Aumann 1962, Dubra-Maccheroni-Ok 2004, Eliaz-Ok 2006, Danan et al. 2016) drop the completeness axiom. The formal apparatus still works, though representation theorems become more complex. You typically get a set of utility functions rather than a single one, or a multi-utility representation.

The thesis proposes that structural equilibrium in the coordination space is defined by partial orderings over position-vectors, not by complete cardinal utility. Dominance cones are the geometric implementation.

## Parity

**Parity** is Ruth Chang's term (Chang 2002, "The Possibility of Parity") for a fourth evaluative relation distinct from better, worse and equal. Two options A and B are on a par when they are comparable but none of the three standard relations holds.

The test that distinguishes parity from simple incomparability: if A and B are equal, a small improvement to A (a "sweetener") should make A strictly preferred. If A and B are on a par, a small sweetener may not change the parity relation. Mozart and Michelangelo can be on a par even though they are not equal and no small addition to either tips the balance.

The thesis extends parity from evaluative comparisons between options to structural configurations on the coordination manifold. The parity region at a point is the subset of the tangent space outside the agent's dominance cone and its reflection. Chang's own work on parity is the primary philosophical reference for the concept.
