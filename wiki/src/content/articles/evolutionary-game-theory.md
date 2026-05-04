---
title: Evolutionary Game Theory
type: theory
created: 2026-04-06T00:00:00.000Z
last_updated: 2026-04-06T00:00:00.000Z
related:
  - J. McKenzie Alexander
  - Coordination Without Convergence
  - Structural Interdependence
  - Elinor Ostrom
  - Game Theory
  - Value Incommensurability
  - Nowak and May (1992)
  - Ruth Chang
  - Robert Axelrod
sources:
  - Alexander 2021
  - Alexander 2023
  - Alexander 2007
  - Axelrod 1984
  - Maynard Smith 1982
  - Maynard Smith and Price 1973
  - Taylor and Jonker 1978
  - Nowak and May 1992
  - Weibull 1995
tags:
  - game-theory
  - evolution
  - norms
  - stability
  - formal-methods
  - replicator-dynamics
  - ESS
description: >-
  The study of strategic interaction as a dynamic, population-level process.
  Extends classical game theory by replacing rational deliberation with
  differential replication, but retains the requirement for commensurable
  payoffs that the investigation identifies as a boundary condition.
wikidata_qid: Q2298789
---

**Evolutionary game theory** (EGT) applies the mathematical framework of [[Game Theory]] to populations of agents whose strategies change over time through selection, imitation or learning rather than through rational deliberation. Where classical game theory asks what a rational agent *should* do given full knowledge of the game, EGT asks what strategies *survive and spread* when agents interact repeatedly and the population composition evolves in response to relative success (Alexander 2021, Introduction; Maynard Smith 1982).

The field originated in mathematical biology. John Maynard Smith and George Price (1973) introduced the concept of the evolutionarily stable strategy to explain why animal conflicts are often ritualised rather than escalatory. The framework was subsequently extended to human social behaviour, where it models the emergence and persistence of norms, conventions and cooperative structures in populations (Alexander 2007; Axelrod 1984). As Alexander (2021) notes, "the rationality assumptions underlying evolutionary game theory are, in many cases, more appropriate for the modelling of social systems than those assumptions underlying the traditional theory of games."

## Two approaches: static and dynamic

Alexander (2021, Section 1) identifies two distinct approaches within EGT, each with its own stability concepts and analytical tools. The relationship between them is a central open problem in the field.

### The static approach

The static approach defines evolutionary stability without modelling the process by which populations change. Its core concept is the **evolutionarily stable strategy** (ESS).

**ESS** (Maynard Smith and Price 1973; Maynard Smith 1982): A strategy *S* is evolutionarily stable if, once adopted by a population, it cannot be invaded by any sufficiently rare mutant strategy *T*. Formally, *S* is an ESS if for all *T* ≠ *S*:

1. *E(S, S) ≥ E(T, S)* (Nash equilibrium condition), and
2. if *E(S, S) = E(T, S)*, then *E(S, T) > E(T, T)* (stability condition)

where *E(X, Y)* is the expected payoff to strategy *X* against strategy *Y* (Maynard Smith 1982, ch. 2).

Every ESS is a Nash equilibrium, but not every Nash equilibrium is an ESS. The ESS concept refines Nash equilibrium by adding an evolutionary stability requirement: the strategy must not merely be a best response to itself but must also outperform any alternative that ties against the resident population (Weibull 1995, ch. 2). This addresses one of Nash equilibrium's well-known deficiencies. A game may have multiple Nash equilibria, including ones that seem unreasonable as predictions of actual behaviour. The ESS concept filters these by requiring robustness against invasion.

Several related static concepts have been proposed to handle cases where a single ESS does not exist: **uniform invasion barriers** (Thomas 1985), **local superiority** (Apaloo 1997) and **evolutionarily stable sets** (Thomas 1985). Each attempts to extend the ESS intuition to broader classes of games, but as Alexander (2021, Section 1) observes, "several competing definitions of evolutionary stability were put forward, each of which had certain intuitive merit," producing a selection problem that mirrors the equilibrium selection problem in classical game theory.

### The dynamic approach

The dynamic approach models the process of population change explicitly, using differential equations or difference equations to track how strategy frequencies evolve over time.

**Replicator dynamics** (Taylor and Jonker 1978): The foundational dynamic model. The frequency of each strategy in the population changes at a rate proportional to the difference between that strategy's fitness and the population's average fitness. For strategy *i* with frequency *x_i* and fitness *f_i*:

*dx_i/dt = x_i [f_i(x) − f̄(x)]*

where *f̄(x)* is the average fitness across the population.

In the Prisoner's Dilemma under replicator dynamics, the single stable equilibrium is all-defect: cooperators earn less than the population average and their frequency declines monotonically to zero (Alexander 2021, Section 2.2). This is the well-mixed population prediction that [[Nowak and May (1992)]] would later show breaks down under spatial structure.

Other dynamics have been proposed, including the **best-response dynamics** (Gilboa and Matsui 1991), **BNN dynamics** (Brown and von Neumann 1950) and **Smith dynamics** (Smith 1984). These sometimes agree with each other and with the static ESS concept, but frequently diverge.

### The static-dynamic gap

A central finding in EGT is that static and dynamic approaches provide, at best, an imperfect fit (Alexander 2021, Section 1). An ESS is always an asymptotically stable fixed point of the replicator dynamics, but the converse does not hold: dynamically stable states need not be evolutionarily stable in the static sense. This matters because it means the choice of analytical framework is not neutral. Static and dynamic analyses of the same game can yield different predictions about which strategies persist.

## The Hawk-Dove game and the fixed-V problem

The Hawk-Dove game (Maynard Smith 1982) is the canonical model for analysing conflict over a resource of value *V*. Two agents contest the resource. Hawks escalate; Doves yield. The payoff matrix depends on *V* (the value of the resource) and *C* (the cost of conflict):

|  | Hawk | Dove |
|---|---|---|
| **Hawk** | (*V* − *C*)/2 | *V* |
| **Dove** | 0 | *V*/2 |

When *C* > *V*, the unique ESS is a mixed strategy: each agent plays Hawk with probability *V*/*C*. The model elegantly explains why ritualised conflict predominates when fighting is costly.

The entire apparatus depends on *V* being a number that both players recognise as the value of the resource. This is the **fixed-V problem** (identified in the investigation's reading of Alexander 2021, Section 2.1). In the model, *V* for player 1 and *V* for player 2 are identical by construction. In real coordination problems, the value of the contested resource is almost never equal across parties, and when comparable at all, the values are often "on a par" in [[Ruth Chang]]'s sense: different kinds of value rather than different amounts of the same value (Chang 2002).

This is not a parameter-tuning problem. It is a category problem. When *V* is incommensurable across parties, the game cannot be specified, the equilibrium concepts cannot be applied and the entire stability analysis is undefined. Every solution concept in EGT, whether static (ESS, invasion barriers, local superiority, evolutionarily stable sets) or dynamic (replicator dynamics, BNN dynamics, Smith dynamics), inherits this limitation. The formal machinery presupposes that outcomes can be ranked on a common scale.

## Structured populations and spatial dynamics

Classical EGT assumes a well-mixed population: every agent is equally likely to interact with every other. Structured population models relax this assumption by placing agents on networks or lattices where they interact only with neighbours. Alexander (2007) focuses extensively on how network topology shapes norm evolution.

The key result in this area is **[[Nowak and May (1992)]]**. They placed agents playing the Prisoner's Dilemma on a two-dimensional lattice with only two pure strategies (always-cooperate, always-defect). Defect strictly dominates Cooperate. The replicator dynamics prediction for a well-mixed population is all-defect. On the lattice, they found three qualitatively different outcomes depending on the payoff parameter *b* (the temptation to defect):

1. All-defect (the well-mixed prediction holds)
2. Stable coexistence of cooperators and defectors
3. Deterministic chaos producing ever-shifting spatial patterns ("dynamic fractals")

The game did not change. Defect still strictly dominated. The spatial structure alone determined which outcome obtained (Nowak and May 1992, p. 826). This is the strongest existing evidence that structural topology does coordination work independent of strategic content. The result demonstrates that network structure is not merely a context in which games are played but an active determinant of coordination outcomes.

## Population-level dynamics vs acute-case coordination

EGT's explanatory power is concentrated at the population level: it describes how norms, conventions and cooperative strategies emerge across many agents over many interactions. Its weakness is in explaining how specific actors coordinate in specific moments.

The standard EGT defence, that agents need not be rational calculators since differential replication is sufficient, is a modelling abstraction. In actual human coordination, the agents are reasoning in each interaction. A nation deciding whether to cooperate on [[AUKUS]] Pillar II is not replicating differentially across a population. It is a small number of specific actors making situated judgments under uncertainty, once (investigation reading notes on Alexander 2021).

This creates a scope distinction. EGT explains the long run: how coordination norms emerge and stabilise across populations over time. The investigation asks about the acute case: what grounds coordination between specific agents in a specific situation, before evolutionary dynamics have had time to operate. Alexander's population-level dynamics and the investigation's structural analysis become complementary rather than competing accounts. Alexander explains the long run; the investigation addresses the acute case.

## Applications

EGT has been applied across multiple domains:

- **Biology**: Explaining ritualised conflict, sex ratios, altruism, parasite-host dynamics and the evolution of cooperation in animal populations (Maynard Smith 1982).
- **Social norms**: Modelling how conventions and moral norms emerge from repeated interaction without central design (Alexander 2007; Skyrms 1996).
- **Cooperation**: Axelrod's (1984) tournaments showed that Tit-for-Tat, a simple reciprocal strategy, outperformed more sophisticated alternatives in iterated Prisoner's Dilemma competitions, demonstrating that cooperation can evolve through reciprocity.
- **Network science**: Structured population models demonstrate that the topology of interaction networks affects which strategies spread, independent of the game being played (Nowak and May 1992; Santos and Pacheco 2005).

## Role in the investigation

EGT is central to the investigation's sub-question on stability: under what conditions do coordination equilibria grounded in [[Structural Interdependence]] resist defection, capture and decay?

**What EGT offers.** The replicator dynamics framework is closer to the investigation's formal needs than static ESS analysis. Its multi-dimensional extensions suggest the possibility of defining dynamics where the axes are structural-interdependence variables (shared risk intensity, constraint hardness, entanglement density) rather than strategy frequencies. The question becomes: can replicator-style dynamics be defined where the state space tracks structural configuration rather than population composition?

**Where EGT breaks down.** EGT inherits classical game theory's foundational requirement for commensurable payoffs. When agents hold values that are genuinely incomparable in [[Ruth Chang]]'s sense, the payoff matrix that every EGT model requires cannot be constructed. This is not a limitation that can be patched within the existing framework. It is a boundary condition of the framework itself. The investigation operates in this gap.

**The key question for EGT.** If structural features of interdependence (shared risk, constraints, entanglement, procedural commitments) can substitute for a common payoff matrix, what does evolutionary stability look like in that regime? Can stability be defined in terms of structural position without requiring a common *V*?

The investigation's framing: "Nowak and May demonstrated that structure matters even when the game is fixed. The investigation asks what happens when structure is all you have."

## See also

- [[Game Theory]]
- [[J. McKenzie Alexander]]
- [[Nowak and May (1992)]]
- [[Coordination Without Convergence]]
- [[Structural Interdependence]]
- [[Value Incommensurability]]
- [[Ruth Chang]]
- [[Robert Axelrod]]
- [[Decision Theory Under Severe Uncertainty]]

## References

- Alexander, J.M. (2007). *The Structural Evolution of Morality*. Cambridge University Press.
- Alexander, J.M. (2021). "Evolutionary Game Theory." In E.N. Zalta (ed.), *Stanford Encyclopedia of Philosophy* (Summer 2021 Edition). [https://plato.stanford.edu/archives/sum2021/entries/game-evolutionary/](https://plato.stanford.edu/archives/sum2021/entries/game-evolutionary/)
- Alexander, J.M. (2023). *Evolutionary Game Theory*. Cambridge University Press.
- Apaloo, J. (1997). "Revisiting strategic models of evolution: the concept of neighborhood invader strategies." *Theoretical Population Biology* 52(1), 71-77.
- Axelrod, R. (1984). *The Evolution of Cooperation*. Basic Books.
- Brown, G.W. and von Neumann, J. (1950). "Solutions of games by differential equations." In H.W. Kuhn and A.W. Tucker (eds.), *Contributions to the Theory of Games I*, 73-79. Princeton University Press.
- Chang, R. (2002). "The possibility of parity." *Ethics* 112(4), 659-688.
- Gilboa, I. and Matsui, A. (1991). "Social stability and equilibrium." *Econometrica* 59(3), 859-867.
- Maynard Smith, J. (1982). *Evolution and the Theory of Games*. Cambridge University Press.
- Maynard Smith, J. and Price, G.R. (1973). "The logic of animal conflict." *Nature* 246, 15-18.
- Nowak, M.A. and May, R.M. (1992). "Evolutionary games and spatial chaos." *Nature* 359, 826-829. [https://www.nature.com/articles/359826a0](https://www.nature.com/articles/359826a0)
- Santos, F.C. and Pacheco, J.M. (2005). "Scale-free networks provide a unifying framework for the emergence of cooperation." *Physical Review Letters* 95(9), 098104.
- Skyrms, B. (1996). *Evolution of the Social Contract*. Cambridge University Press.
- Smith, M.J. (1984). "The stability of a dynamic model of traffic assignment." *Transportation Science* 18(3), 245-252.
- Taylor, P.D. and Jonker, L.B. (1978). "Evolutionarily stable strategies and game dynamics." *Mathematical Biosciences* 40(1-2), 145-156.
- Thomas, B. (1985). "On evolutionarily stable sets." *Journal of Mathematical Biology* 22(1), 105-115.
- Weibull, J.W. (1995). *Evolutionary Game Theory*. MIT Press.
