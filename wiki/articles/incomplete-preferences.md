---
title: Incomplete Preferences
type: concept
created: 2026-04-10
last_updated: 2026-04-10
related: ["[[Parity]]", "[[Richard Bradley]]", "[[Decision Theory Under Severe Uncertainty]]", "[[Value Incommensurability]]", "[[Structural Interdependence]]"]
sources: ["wiki/sources/P1/bradley/bradley-2022-social-ethics-under-ambiguity.md"]
tags: [concept, decision-theory, preferences, formal, aumann, partial-orderings]
description: Decision-theoretic territory where the completeness axiom of classical preference theory is relaxed. Agents with incomplete preferences cannot rank all options against all others even within their own perspective. The technical foundation for the thesis's partial-ordering move.
---

**Incomplete preferences** name the decision-theoretic territory in which the completeness axiom of classical preference theory is relaxed. An agent with incomplete preferences cannot rank every pair of options against every other, even within her own perspective, without this being attributed to irrationality.

## The completeness axiom and its relaxation

Classical preference theory in the von Neumann-Morgenstern and Savage traditions requires a complete binary preference relation: for any two options A and B, either A is preferred to B, B is preferred to A, or the agent is indifferent between them. Completeness guarantees that the relation covers every pair in the option set and underwrites the passage from preference to a real-valued utility function.

Relaxing completeness admits a fourth case. An agent may decline to rank A against B without being indifferent between them and without violating rationality. The resulting relation is a partial rather than a total ordering. The fourth case reads as "neither preferred nor indifferent, and not comparable via the current information or the agent's present evaluative resources."

## Origin: Aumann 1962

Robert J. Aumann's "Utility Theory Without the Completeness Axiom" (*Econometrica* 30(3), 1962) is the origin point. Aumann showed that expected utility theory can be developed without the completeness axiom, yielding a partial ordering representation in place of a complete cardinal utility function. The result established that completeness is a simplifying convenience rather than a necessary feature of rationality, and that much of the formal machinery of decision theory survives its removal.

## Modern treatments

Dubra, Maccheroni and Ok, "Expected Utility Theory without the Completeness Axiom" (*Journal of Economic Theory* 115(1), 2004), gives the contemporary technical treatment. They characterise the multi-utility representation that arises when completeness is dropped: an incomplete preference relation can be represented by a set of utility functions such that one option is preferred to another if and only if every utility function in the set ranks it higher. The representation locates incompleteness in the multiplicity of admissible utility functions rather than in the agent's failure to have preferences at all.

Eliaz and Ok, "Indifference or Indecisiveness? Choice-theoretic Foundations of Incomplete Preferences" (*Games and Economic Behavior* 56(1), 2006), provides the choice-theoretic foundations and draws a sharp distinction between indifference and indecisiveness. An indifferent agent regards A and B as equally good; an indecisive agent cannot decide between them. The two generate different choice behaviour under menu expansion and therefore correspond to formally distinct objects. The distinction matters for the investigation: a structural equilibrium concept must accommodate agents who genuinely cannot rank certain options against each other, not merely agents who find them equally attractive.

## Connection to Bradley 2022

Richard Bradley's "Social Ethics under Ambiguity" (2022, Section VI) flags incomplete betterness relations as unexplored territory for social ethics. Bradley describes "the rational response to lack of evidence or to disagreement among experts" as "partial suspension of judgment" and identifies this as a door his paper does not walk through. The literature he cites on the social-ethics side of the door includes Levi 1990, "Pareto Unanimity and Consensus" (*Journal of Philosophy* 87: 481-92), and Danan et al. 2016, "Robust Social Decisions" (*American Economic Review* 106: 2407-25). Both treat incomplete betterness rankings in the context of social choice.

The investigation proposes that the thesis's partial orderings over structural position-vectors are the formal analogue of Bradley's incomplete betterness relations, translated from well-being prospects to situated structural assessment. This is a working direction rather than a proven identification.

## Relation to parity

Chang's parity (see [[Parity]]) is closely related to incomplete preferences but is not identical. Parity is a substantive evaluative relation in which two options are comparable yet neither better nor worse nor equal. Incompleteness is the absence of any evaluative relation on a given pair. The working proposal is that parity can be represented within an incomplete preference framework by interpreting "on a par" as "comparable but not ranked, and robust to small sweetening," so that the parity region is a substantive subset of the unranked pairs rather than the whole of it. Whether this formal identification is adequate to Chang's concept is an open question.

## Role in the investigation

Incomplete preferences are the decision-theoretic foundation for the thesis's sharpest differentiation move. The investigation argues that agents, both individual and collective, often cannot construct complete cardinal orderings over candidate options even within a single perspective. This is the intrapersonal version of the partial-ordering move, distinct from the interpersonal case in which different agents hold different preferences over the same options.

Intrapersonal incompleteness is proposed as a more honest representation of real decision-making than the completeness assumption, particularly for collective agents such as states, treaty parties and institutions whose preferences are an aggregation problem rather than a primitive. The formal machinery of partial orderings and dominance cones provides a tractable mathematical home for the weaker object: each agent's evaluative stance at a point in the configuration manifold is a cone in the tangent space, and the parity region sits outside both the cone and its reflection.

## Open question

Whether structural equilibria can be shown to exist in general under incomplete preferences remains an open formal research question. Classical Nash equilibrium existence uses Kakutani's fixed-point theorem on convex compact sets with continuous payoff functions. Vector-valued game theory (Shapley 1959, Corley 1985) has analogues for specific cases. Whether a general existence result holds for cone bundles on manifolds with arbitrary incomplete preferences is not established. The investigation flags this honestly as a research claim rather than a result.

## See also

- [[Parity]]
- [[Richard Bradley]]
- [[Decision Theory Under Severe Uncertainty]]
- [[Value Incommensurability]]
- [[Structural Interdependence]]
