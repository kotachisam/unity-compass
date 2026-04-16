---
title: Game Theory Primer
description: Concise reference for the formal vocabulary of game theory. Games, Nash equilibrium, ESS, coordination games, replicator dynamics, vector-valued games.
type: primer
created: 2026-04-11
last_updated: 2026-04-11
---

# Game Theory Primer

Concise reference for game theory vocabulary. Scoped to what the reading programme needs, not comprehensive textbook coverage. Builds on the decision theory vocabulary in [`decision-theory.md`](decision-theory.md): utility functions, preferences, dominance and the ordinal/cardinal distinction are assumed.

Each entry gives the definition in two to four sentences, a concrete example where useful, and a note on where the concept shows up in the thesis context. See [`README.md`](README.md) for convention and related primers.

## Contents

- What a game is
- Nash equilibrium
- Evolutionarily stable strategy (ESS)
- Equilibrium selection problem
- Coordination games
- Cooperative vs non-cooperative game theory
- Replicator dynamics
- Vector-valued games

---

## What a game is

A **game** in the formal sense has: a set of **players**, a set of **strategies** available to each player and a **payoff function** for each player that assigns a numerical value to every combination of strategy choices. The payoff function captures the outcome from that player's perspective.

Game theory studies what rational players will do in games. The central question is: given the players' strategies and payoffs, which combinations are stable? See [`decision-theory.md`](decision-theory.md) for the underlying assumptions about what a payoff function represents.

## Nash equilibrium

A **Nash equilibrium** is a combination of strategies (one per player) such that no player can improve her payoff by unilaterally changing her strategy, holding the others' strategies fixed. It is the canonical solution concept in non-cooperative game theory.

Nash's 1950 theorem proves that every finite game has at least one Nash equilibrium (possibly in mixed strategies). The proof uses Kakutani's fixed-point theorem.

Nash equilibria need not be unique. Many games have multiple equilibria, which gives rise to the equilibrium selection problem below. The thesis's structural equilibrium concept generalises Nash to partial orderings over position-vectors on a configuration manifold; classical Nash is recovered in the degenerate limit where preferences are complete and strategies are discrete.

## Evolutionarily stable strategy (ESS)

An **ESS** is a refinement of Nash equilibrium for evolutionary game theory. A strategy S is an ESS if, once adopted by a population, it cannot be invaded by any sufficiently rare mutant strategy T. Introduced by Maynard Smith and Price in 1973.

Every ESS is a Nash equilibrium, but not every Nash equilibrium is an ESS. The ESS concept filters out equilibria that would be destabilised by small perturbations and gives evolutionary game theory its central stability notion. Alexander's work (2007, 2021, 2023) is largely in this tradition.

## Equilibrium selection problem

When a game has multiple Nash equilibria, Nash's concept alone cannot tell you which one will be played. The **equilibrium selection problem** is the question of which equilibrium a rational agent or an evolving population will settle on.

Various refinements address this: ESS, subgame perfect equilibrium, perfect Bayesian equilibrium, correlated equilibrium, forward induction. Each captures a different intuition about what "more stable" means. In coordination games specifically, equilibrium selection is often about focal points (Schelling 1960), conventions that emerge from repeated play or structural features of the game that make one equilibrium salient.

Gaus's Deliberative Model and Self-Organization Model are both responses to equilibrium selection in a coordination-reconciliation game: the eligible set often has multiple members and Gaus is trying to explain how society converges on one.

## Coordination games

A **coordination game** is a game where players benefit from choosing the same strategy as each other. The canonical example is driving on the left or right: it does not matter which side you drive on as long as everybody chooses the same side. Both outcomes are Nash equilibria.

**Pure coordination games** have identical payoffs for matching strategies and zero for mismatching. **Battle-of-the-sexes** games are coordination games where players prefer different coordination points (both prefer to be together, but one prefers opera and the other football). **Assurance games** (also called stag hunt) require mutual trust that the other player will cooperate.

Coordination games are central to the thesis because they model the problem of coordination without convergence: even agents with different values may benefit from coordinating on some arrangement, and the question is whether structural features can select the coordination point.

## Cooperative vs non-cooperative game theory

**Non-cooperative game theory** studies strategic interaction where players act independently and cannot make binding agreements. Nash equilibrium is the central solution concept. Most of classical game theory is non-cooperative.

**Cooperative game theory** studies interactions where players can form coalitions and make binding agreements. Central solution concepts include the core (allocations no coalition would rationally reject), the Shapley value (a way of distributing the total value based on marginal contributions), bargaining sets and stability notions for coalition formation. Peleg & Sudhölter (reading log) is a standard reference.

The thesis's coordination space draws on both. The equilibrium concept is Nash-like (no agent can unilaterally reach a dominating position) but the reachability condition draws on cooperative theory (which joint moves are available under coalition structure).

## Replicator dynamics

**Replicator dynamics** (Taylor and Jonker 1978) is the foundational dynamic model in evolutionary game theory. The frequency of each strategy in the population changes at a rate proportional to the difference between that strategy's fitness and the population's average fitness: dx_i/dt = x_i × (f_i(x) − f̄(x)).

Replicator dynamics predict that strategies with above-average fitness grow and strategies with below-average fitness shrink. In the Prisoner's Dilemma under replicator dynamics on a well-mixed population, the unique stable equilibrium is all-defect: cooperators earn less than the population average and their frequency declines to zero.

Other dynamics have been proposed (best-response dynamics, BNN dynamics, Smith dynamics). These sometimes agree with each other and with the static ESS concept but frequently diverge. Hofbauer & Sigmund (reading log) is the standard reference for evolutionary dynamics generally.

## Vector-valued games

A **vector-valued game** is a game where payoff functions return vectors rather than scalars. Instead of each player having a single utility, they have a vector of utilities corresponding to multiple criteria. Equilibrium is defined by a vector dominance relation: one vector dominates another if it is at least as good in every component and strictly better in at least one.

Shapley's 1959 paper "Equilibrium Points in Games with Vector Payoffs" is the origin point. Corley 1985 and Sawaragi, Nakayama and Tanino 1985 are the modern references.

Vector-valued games are the formal home of the thesis's structural equilibrium concept generalising Nash to partial orderings over position-vectors. The machinery exists but the specific combination the thesis proposes (vector-valued games on Riemannian manifolds with cone bundles) is novel.
