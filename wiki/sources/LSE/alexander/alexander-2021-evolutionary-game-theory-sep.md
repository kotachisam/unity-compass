---
title: "Evolutionary Game Theory"
authors: J. McKenzie Alexander
year: 2021
type: article
publisher: Stanford Encyclopedia of Philosophy
status: read
priority: P1
progress: "6/6 sections"
date_started: 2026-04-06
date_completed: 2026-04-06
pages: null
url: https://plato.stanford.edu/archives/sum2021/entries/game-evolutionary/
access: open-access (SEP)
related_articles: ["j-mckenzie-alexander", "evolutionary-game-theory", "robert-axelrod", "game-theory"]
---

# Evolutionary Game Theory (SEP)

Alexander's comprehensive encyclopedia entry on evolutionary game theory. Last modified 24 April 2021, archived in Summer 2021 edition. Cite the archived edition URL for stability.

Note: the reading log originally listed this as a 2023 Cambridge UP book. The SEP entry and the CUP book are different works. The CUP book *Evolutionary Game Theory* (2023) is a separate, more comprehensive treatment. This SEP entry serves as the orientation; the book is the deep engagement.

## Takeaways

Alexander's SEP entry confirms that evolutionary game theory relaxes the rationality assumptions of classical game theory but retains the foundational requirement of commensurable payoffs: every model, whether static (ESS) or dynamic (replicator dynamics), requires a constructible payoff matrix with a shared value V (sections 2.1-2.2). When agents hold genuinely incommensurable values in Ruth Chang's sense, the formal apparatus has no starting point. This is not a limitation that refinement can address. It is a boundary condition of the framework (section 4.1). Alexander himself identifies the need for "an alternate theory of utility/fitness, one compatible with the bounded rationality of individuals" for cultural evolutionary applications (section 6.1).

The most significant result for the investigation is Nowak and May (1992): placing agents on a spatial lattice transforms the prisoner's dilemma from a single predictable equilibrium (all-defect) into three qualitatively distinct regimes, including deterministic chaos, without altering the game itself (section 3). This is the strongest existing evidence that structural topology does coordination work independent of strategic content, and it directly supports the thesis's hypothesis that structural features of interdependence can ground coordination without value convergence. The mathematical territory is three-body-problem adjacent: simple deterministic rules producing chaotic outcomes sensitive to structural configuration.

The reading surfaced a key formal intuition: values and structural features are not separate formal spaces but axes in the same coordination space. Equilibrium in this space is consensus on continuing to coordinate (temporally bounded, dissolving when structural configuration shifts), not consensus on values. The investigation positions as complementary to Alexander's population-level evolutionary dynamics: Alexander explains how coordination norms emerge over time; the thesis asks what grounds coordination in the specific case, before evolutionary dynamics have operated (sections 4.2-4.3). Skyrms's correlation coefficient result (section 5.1) suggests that structural variables function as multi-dimensional correlation parameters that transform coordination outcomes.

## Why it matters

Provides the field overview and Alexander's specific framing of EGT. Essential for understanding what tools the investigation might extend, and where Alexander sees the current boundaries of the field.

## Summary

(to be filled during reading)

## Highlights

1. "The rationality assumptions underlying evolutionary game theory are, in many cases, more appropriate for the modelling of social systems than those assumptions underlying the traditional theory of games." (Introduction)

2. "Although the fundamental solution concept of traditional game theory, the Nash equilibrium, had the desirable property of always existing for any game with a finite number of players and strategies, provided that mixed strategies were allowed, it had several deficiencies. A Nash equilibrium was not guaranteed to be unique (sometimes even with uncountably many Nash equilibria existing), did not always seem to correspond to a reasonable outcome, and occasionally conflicted with people's intuitions as to what ought to count as a rational outcome." (Section 1)

3. "It was soon realised that evolutionary game theory itself had problems structurally similar to that of the equilibrium selection problem. Several competing definitions of evolutionary stability were put forward, each of which had certain intuitive merit. In addition, as the connection between the static and dynamic approaches to evolutionary game theory were explored in detail, it was found that there was, at best, an imperfect fit between static concepts of evolutionary stability and that of dynamic stability." (Section 1)

## Notes

### On highlight 1: rationality assumptions and the logos argument

EGT relaxes the rationality assumptions of formal game theory, but not far enough. The [[Logos]] essay argues that the narrowing of reason to formal logic is upstream of these assumptions. EGT widens the aperture (agents don't need to be perfectly rational calculators) but retains the fundamental requirement of a common payoff structure. The gap between EGT's relaxed assumptions and genuine [[Value Incommensurability]] is where the investigation operates.

The standard EGT defence ("we don't need rational agents, just differential replication") is a modelling abstraction, not a description of reality. In actual human coordination, the agents ARE reasoning in each specific interaction. A nation deciding whether to cooperate on AUKUS Pillar II isn't replicating differentially across a population. It's a small number of specific actors making situated judgments under uncertainty, right now, once.

EGT's power is in explaining how norms emerge across populations over time. Its weakness is in explaining how specific actors coordinate in specific moments. The structural hypothesis isn't about population-level norm evolution. It's about whether structural features of interdependence give specific agents in specific situations sufficient grounds to coordinate without shared values.

The logos critique hits EGT, not just classical game theory. EGT assumes away the reasoning by modelling at population level. But the coordination problems the investigation cares about operate at the level where reasoning happens: three nations, one decision, different values, shared catastrophic risk. At that level, the rationality assumptions matter, and the narrowing of what counts as rational reasoning matters.

**Potential thesis positioning against Alexander:** "Your population-level dynamics explain how coordination norms emerge. My question is what grounds coordination in the specific case, before the evolutionary dynamics have had time to operate." The two accounts become complementary rather than competing: Alexander explains the long run, the investigation explains the acute case.

→ connects to [[Coordination Without Convergence]], [[Logos]], [[AUKUS]]

### On the two approaches and what's missing

Alexander identifies two approaches to EGT: (1) static/ESS (Maynard Smith and Price) which defines evolutionary stability without modelling the underlying process, and (2) dynamic, which models population dynamics explicitly and uses standard dynamical systems stability concepts.

Both operate at population level. Neither addresses the compounding nature of specific coordination moments: how a sequence of situated decisions evolves the strategic landscape itself. In real coordination, the game changes as you play it. The AUKUS negotiation in 2021 changed what was available in 2023. Each specific moment compounds into the next, and the actors are reasoning their way through a shifting structure, not replicating strategies in a fixed game.

**Key intuition:** Values and structural features aren't separate formal spaces. They're axes in the SAME space. Some coordination problems are mostly value-aligned (classical game theory). Some are mostly structural-interdependence (the hard cases). Most are a combination, plus variables not yet identified.

Equilibrium in this space = consensus on continuing to coordinate, not consensus on values. Temporally bounded: holds while the structural configuration holds, dissolves when it shifts.

The formal contribution: define a coordination space where axes include both value-alignment AND structural-interdependence variables. Characterise where stable coordination exists in that space. The four structural candidates (risk, constraints, entanglement, procedural commitments) are not claimed as exhaustive.

→ connects to [[Structural Interdependence]], [[Evolutionary Game Theory]], [[Game Theory]], [[Value Incommensurability]], [[Michael Bratman]]

### On section 2.1: the fixed-V problem

The entire ESS apparatus (Maynard Smith, Nash equilibrium, invasion barriers, local superiority) requires a shared payoff matrix. In Hawk-Dove, both players agree V is the value of the resource. In real coordination: V for party 1 and V for party 2 are almost never equal, and when comparable at all they're "on a par" in [[Ruth Chang]]'s sense: different kinds of value, not different amounts of the same value.

This isn't a parameter-tuning problem. It's a category problem. The formal machinery assumes V is a number both players recognise. When V is incommensurable across parties, the game can't be specified, the equilibrium concepts can't be applied, and the entire stability analysis is undefined. Every solution concept in this section (ESS, uniform invasion barrier, local superiority, evolutionarily stable sets) inherits this limitation.

**The question for the thesis:** what replaces V? If structural features of interdependence (shared risk ordering, constraint hardness, entanglement density) can serve as axes in a coordination space, can stability be defined in terms of those axes without requiring a common V?

→ connects to [[Value Incommensurability]], [[Structural Interdependence]], [[Ruth Chang]], [[Game Theory]]

### On section 2.2: replicator dynamics and the multi-axis extension

The replicator dynamics (Taylor and Jonker 1978) model population evolution as differential equations tracking strategy frequency changes proportional to fitness deviation from population average. The Prisoner's Dilemma example shows a single axis (cooperate-defect proportion) with a single stable equilibrium (all-defect).

This dynamic approach is closer to how the thesis's formal apparatus could work than the static ESS approach. But the real coordination problems the investigation cares about aren't binary (cooperate/defect on one axis). They're multi-dimensional: multiple structural variables simultaneously in play, each with its own dynamics. The math goes from single-variable differential equations to n-dimensional systems, which is a combinatorial explosion but also where the interesting structure lives.

The question: can replicator-style dynamics be defined where the axes aren't strategy frequencies but structural-interdependence variables? Instead of "what proportion of the population cooperates," ask "how does coordination stability change as shared risk intensity, constraint hardness and entanglement density vary simultaneously?"

→ connects to [[Evolutionary Game Theory]], [[Structural Interdependence]]

### On sections 2.2 and 3: dynamics, local interaction, and the novel math problem

Sections 2.2-3 explore replicator dynamics, BNN dynamics, Smith dynamics, local interaction models on lattices. Key finding: static (ESS) and dynamic approaches frequently disagree on outcomes. Local interaction models (Nowak and May 1992) show that cooperation can persist in spatial structures even when Defect strictly dominates, and that outcomes depend on specific payoff values rather than just strategic structure.

This is intellectually rich but uniformly bound to payoff matrices. Every dynamic, every stability concept, every local interaction model requires numerical payoffs. The tools are sophisticated but they all inherit the fixed-V limitation.

**The thesis needs genuinely novel math.** Not a tweak to EGT but a new formal object: a coordination space where axes are structural-interdependence variables, with stability defined by structural position rather than payoff.

**KEY RESULT: Nowak and May (1992).** "[Evolutionary games and spatial chaos](https://www.nature.com/articles/359826a0)" *Nature* 359, 826-829. Showed that in a spatial Prisoner's Dilemma on a lattice, with only two pure strategies (always-cooperate, always-defect), the spatial structure alone produces three qualitatively different outcomes depending on payoff parameters: all-defect, stable coexistence, or deterministic chaos with "dynamic fractals." Defect still strictly dominates. The game hasn't changed. The structure determines the outcome.

This is the strongest existing evidence that structural topology does coordination work independent of strategic content. It's also three-body-problem adjacent: simple deterministic rules, spatial interaction, chaotic outcomes that can't be predicted from the rules alone. The mathematical territory the thesis enters may require similar tools (dynamical systems, spatial/network topology, sensitivity to initial conditions).

**Thesis framing:** "Nowak and May demonstrated that structure matters even when the game is fixed. The investigation asks what happens when structure is all you have."

→ connects to [[Evolutionary Game Theory]], [[Structural Interdependence]], [[Game Theory]]

### On highlight 2: the payoff structure boundary

In most real coordination challenges, there are not a finite number of players or strategies. More fundamentally, EGT cannot address genuinely incommensurable values because a payoff structure is required by definition. The entire formal apparatus presupposes that outcomes can be ranked on a common scale. When agents hold values that are genuinely incomparable (in [[Ruth Chang]]'s sense), the starting conditions for any game-theoretic model are absent. This is not a limitation that can be patched; it is a boundary condition of the framework itself. → connects to [[Game Theory]], [[Structural Interdependence]]

### On highlight 3: equilibrium selection as parallel to the investigation's question

The equilibrium selection problem in EGT (multiple competing definitions of stability, imperfect fit between static and dynamic approaches) is structurally parallel to the investigation's central question. If structural features of interdependence can ground coordination without value convergence, the question becomes: which structural features, and are they formally unifiable or do they require distinct treatment? This mirrors EGT's own unresolved question about evolutionary stability definitions. → connects to [[Structural Interdependence]], [[Evolutionary Game Theory]]

### On section 4.1: the equilibrium selection problem and beyond refinement

Alexander (via Samuelson 1997) notes the hope that EGT could address the equilibrium selection problem: when multiple Nash equilibria exist, how do rational agents select the "right one"? The problem has merely shifted from choosing among equilibria to choosing among refinements of equilibria to choosing among competing definitions of evolutionary stability. Each layer of refinement inherits the problems of the layer below.

The investigation's position: this isn't a refinement problem. It's a foundations problem. Nash equilibrium, ESS, and every refinement thereof presuppose that the game can be specified (payoffs constructible, strategies enumerable, preferences commensurable). When those conditions don't hold, more refined equilibrium concepts within the same formal framework can't help. What's needed is not a better equilibrium selection criterion but a different formal object entirely: stability defined in a coordination space where the axes are structural-interdependence variables rather than payoff values.

Working concept: **structural equilibrium** (provisional). A configuration in the coordination space where no agent can improve their structural position (reduce risk exposure, increase network leverage, strengthen procedural commitments) by defecting from the coordination arrangement. This is NOT a Nash equilibrium refinement. It operates in a different formal space. Whether this concept is well-defined, unique, and characterisable is the core formal question of the thesis.

→ connects to [[Structural Interdependence]], [[Game Theory]], [[Coordination Without Convergence]]

### On section 4.2: hyperrational agents and the logos connection

Alexander notes that traditional game theory requires agents with "a well-defined, consistent set of uncountably infinitely many preferences" and that experimental economics consistently shows humans aren't these agents. EGT's advantage: it works with weaker rationality assumptions. Sandholm (2010) links individual learning rules at the micro level to population dynamics at the macro level without requiring hyperrationality.

This aligns with the [[Logos]] argument but from a different angle. The logos-logic narrowing critique says: the concept of rationality was narrowed philosophically, excluding situated knowledge, embodied wisdom, relational intelligence. Alexander's point is narrower but convergent: the mathematical formalism requires a specific kind of rationality (complete, transitive, consistent preferences over infinite lotteries) that empirically doesn't describe human behaviour. Both diagnoses point to the same conclusion: the formal apparatus encodes a model of rational agency that doesn't match real coordination.

The Sandholm micro-to-macro framework is worth noting: it's the kind of bridge the thesis might need for connecting individual structural positions to aggregate coordination behaviour. Statistical mechanics, not trajectory tracking.

→ connects to [[Logos]], [[Evolutionary Game Theory]], [[Game Theory]]

### On section 4.3: the missing dynamics and computational tractability

Von Neumann and Morgenstern (1953) explicitly acknowledged their theory was "thoroughly static" and that a dynamic theory would be preferable but premature. Alexander notes that extensive-form games become unmanageable for any game of reasonable complexity, and that traditional game theory's strategy representation presupposes hyperrational players who precommit to every possible move before the game starts. No learning, no observation, no adaptation.

EGT fills this gap with population-level dynamics. But the investigation identifies a different opening: **structure-based dynamics may be computationally tractable where payoff-based extensive-form dynamics are not.** If the axes of the formal space are structural variables (risk exposure, constraint hardness, entanglement density) rather than the combinatorial explosion of strategy profiles at every information set, the problem may reduce to something computable.

The extensive form is unmanageable because the number of possible strategy profiles grows combinatorially with the number of decision points. But structural variables don't multiply the same way: shared risk topology is a property of the relationship, not a per-decision-point assignment. The state space may be dramatically smaller. This is speculative but worth investigating formally.

The compute age matters here. Von Neumann and Morgenstern didn't have the tools to explore high-dimensional dynamical systems numerically. We do. If structural equilibria can be characterised as attractors in a dynamical system over structural-interdependence variables, numerical methods (agent-based simulation, network dynamics, Monte Carlo) become available even where analytical solutions don't exist. Nowak and May proved this approach works for spatial structure + payoffs. The question is whether it works for structural variables alone.

→ connects to [[Structural Interdependence]], [[Evolutionary Game Theory]], [[Game Theory]], [[Nowak and May (1992)]]

### On section 5: applications and the reference goldmine

EGT has been applied to altruism, empathy, moral behaviour, signalling systems, social learning, social norms, human culture, public goods, private property. The reference list is a map of exactly the territory the investigation occupies: the dimensions formal game theory excludes but that EGT has begun to model evolutionarily.

Key references to follow up:
- **Empathy**: Page and Nowak 2002, Fishman 2006 (EGT modelling the capacity the investigation's philosophical foundation identifies as excluded from formal theory)
- **Moral behaviour**: Alexander 2007, Skyrms 1996/2004, Harms and Skyrms 2008 (Alexander's own work on structural evolution of morality)
- **Social norms**: Bicchieri 2006, Ostrom 2000, Axelrod 1986 (the norm-emergence question adjacent to coordination-without-convergence)
- **Signalling**: Skyrms 2010, Barrett 2007 (how coordination on communication emerges without shared language, directly parallel to coordination without shared values)
- **Social learning**: Kameda and Nakanishi 2003, Rogers 1988 (micro-to-macro learning dynamics, Sandholm territory)

These aren't just citations. They're evidence that the "excluded dimensions" (empathy, situated knowledge, relational intelligence) are already being studied through EGT at the population level. The investigation's contribution would be connecting them to the acute-case structural question: these capacities have been modelled as evolving traits. What role do they play in specific coordination moments under incommensurability?

→ connects to [[Evolutionary Game Theory]], [[Logos]], [[Elinor Ostrom]], [[Robert Axelrod]]

### On sections 5.1-5.2: divide-the-cake, signalling, and structural parallels

**Divide-the-cake (Skyrms 1996):** Fair division (demand half) evolves ~62% of the time under replicator dynamics in well-mixed populations. But when correlation is introduced (agents interact preferentially with similar agents, ε = 0.2), fair division becomes virtually certain. Correlation coefficient on a single axis transforms the outcome. This is the same structural-determines-outcome pattern as Nowak and May but for fairness instead of cooperation.

**Sender-receiver games (Lewis 1969, Skyrms 1996):** Language/signalling emerges in populations without any prior communication capacity. Two signalling systems are ESS. But as N increases (states, signals, actions), strategy space explodes to N^(2N). For N=4, 65,536 strategies. Replicator dynamics often converge to suboptimal pooling equilibria (Hofbauer and Hutteger 2008).

**What pops out for the investigation:**

1. Correlation coefficients on interaction structure change outcomes dramatically (divide-the-cake). The thesis's structural variables (risk, entanglement, constraints) could function as correlation coefficients on multiple axes simultaneously. Monte Carlo methods (Skyrms) are the right computational tool for exploring multi-axis correlation effects on coordination outcomes.

2. The sender-receiver model is closer to the investigation's territory than the PD: agents coordinating on meaning without shared prior language. Parallel: agents coordinating on action without shared prior values. The pooling/partial-pooling equilibrium problem maps onto partial commensurability: agents who can coordinate in some domains (shared signal for some states) but not others.

3. The combinatorial explosion (N^(2N) strategies) is exactly the tractability problem that structural variables might solve. If coordination is characterised by 4-5 structural axes rather than N^(2N) strategy profiles, the problem space collapses.

→ connects to [[Structural Interdependence]], [[Evolutionary Game Theory]], [[Thomas Schelling]], [[Nowak and May (1992)]]

### On section 6.1: the fitness problem and the thesis's opening

Alexander states it directly: "One must develop an alternate theory of utility/fitness, one compatible with the bounded rationality of individuals, that is sufficient to define a utility measure adequate for the application of evolutionary game theory to cultural evolution."

This is the thesis's formal opening. The investigation proposes that structural-interdependence variables (risk exposure, constraint hardness, entanglement density, procedural commitment strength) ARE the alternate fitness measure. Not utility. Not payoff. Structural position.

"Fitness" in the structural-interdependence space = how well-positioned an agent is relative to the coordination arrangement. An agent's structural fitness improves when: their catastrophic risk exposure decreases through coordination, their network position becomes more robust, their constraint burden is shared rather than borne alone. This is measurable without requiring commensurable values.

Alexander is literally identifying the gap the thesis fills. He says the field needs a new fitness concept for cultural evolution that doesn't require hyperrational agents or cardinal utility. The investigation's answer: fitness defined by structural position in an interdependence space.

→ connects to [[Structural Interdependence]], [[Evolutionary Game Theory]], [[Value Incommensurability]], [[Coordination Without Convergence]]

### On section 6.2: explanatory irrelevance and the investigation's answer

Alexander raises the challenge: EGT models answer "how possibly" questions about phenomena we already know exist. The etiology (causal origin) of a social phenomenon is a unique historical event discoverable only empirically. EGT models are at best incomplete explanations because they show something COULD emerge from a dynamical process but don't connect to the actual real-world processes that generated it.

The investigation's structural-interdependence approach has a potential answer to this charge. The explanatory target is not etiology (how did this coordination emerge historically?) or persistence (why does it continue?) but **characterisation of conditions**: under what structural configurations is coordination stable, and under what configurations does it dissolve? This is a different kind of explanation from "how possibly." It's "under what conditions, necessarily."

If the thesis can show that certain structural configurations (specific combinations of risk exposure, entanglement, constraints) are necessary or sufficient for stable coordination regardless of how that coordination historically emerged, that's an explanation EGT can't give. EGT shows cooperation CAN evolve. The structural approach would show where coordination MUST be stable given the structural facts. That's closer to physics (given these forces, this orbit is stable) than to history (here's how this orbit came to be).

**Etiological application:** model the structural-interdependence axes against degree of value commensurability for any social phenomenon. The position in that space constrains how the phenomenon could have emerged (dynamically accessible paths from starting configuration). The trajectory through the space IS the etiology, and it works at all scales because the axes are scale-neutral.

AUKUS approximate position: very high shared risk, moderate entanglement, moderate constraints, strong procedural commitments, medium-high value commensurability. That configuration can be tracked historically as a trajectory through the coordination space. The structural dynamics constrain which transitions are possible.

This answers Alexander's 6.2 challenge directly. Not "how possibly" (EGT). Not "how actually" (pure history). "What trajectory through the structural space did this phenomenon follow, and what trajectories were accessible from the starting configuration?"

→ connects to [[Structural Interdependence]], [[Evolutionary Game Theory]], [[Coordination Without Convergence]], [[AUKUS]]

### On section 6.3: value-ladenness and the investigation's position

Alexander notes that EGT's normative content is explicit: boundedly rational agents maximising self-interest. The investigation's structural approach has a different value commitment, also explicit: coordination is worth characterising because the alternative (uncoordinated response to shared catastrophic risk) is worse for all parties. The normative claim is minimal: "given shared structural interdependence, coordination is rationally preferable to its absence." That's closer to engineering than ethics.

### Bibliography leads (prioritised)

**HIGH:**
- Nowak and May 1992 + 1993 (spatial chaos, already have wiki article)
- Skyrms 2004 *The Stag Hunt* (coordination where structure determines equilibrium selection)
- Skyrms 2010 *Signals* (signalling without shared prior meaning = coordination without shared values)
- Skyrms 1996 *Evolution of the Social Contract* (ε correlation parameter, Monte Carlo)
- Alexander 2007 *Structural Evolution of Morality* (closest existing framework to structural interdependence)
- Lewis 1969 *Convention* (coordination equilibrium without shared values, foundational)
- Ostrom 2000 "Collective Action and the Evolution of Social Norms" (procedural commitments axis)
- Hauert 2006 "Spatial Effects in Social Dilemmas" (math tools: lattice dynamics, Monte Carlo)
- Bicchieri 2006 *Grammar of Society* (norms as structural expectations, not value agreement)
- Sandholm 2010 *Population Games and Evolutionary Dynamics* (dynamical systems toolkit)
- Alexander and Skyrms 1999 "Bargaining with Neighbors" (local interaction → fairness)

**MEDIUM:**
- Gintis 2009 *Game Theory Evolving* (textbook, bounded rationality)
- Samuelson 1997 *Equilibrium Selection* (stability as structural)
- Weibull 1995 *Evolutionary Game Theory* (replicator dynamics formal background)
- Hargreaves Heap and Varoufakis 2004 *Critical Text* (rationality critique)
- Harms 2000 "Cooperation in Hostile Environments" (shared risk → cooperation)
- Page and Nowak 2002 "Empathy leads to fairness" (structural cognition → outcomes)

**Three critical observations:**
1. Nowak/May lineage is well-trodden. Novelty must be in formally integrating value-alignment AND structural-interdependence as independent, orthogonal axes. If they're not genuinely orthogonal, contribution collapses.
2. Alexander (2007) is closest ally AND most dangerous competitor. Must articulate what "structural interdependence" captures that "population structure" doesn't. Differentiator: procedural commitments and shared risk as formal variables.
3. Skyrms's ε (correlation) is underexploited. Framing it as a DESIGN VARIABLE for institutional architecture could be genuinely novel.

### Reading complete: SEP entry on Evolutionary Game Theory

**Status:** read. 6/6 sections. Started and completed 2026-04-06.

**Summary:** Alexander's SEP entry provides the field overview the investigation needed. Key takeaways for the thesis:
1. EGT relaxes rationality assumptions but retains the payoff-structure requirement (the fixed-V problem)
2. Static and dynamic approaches disagree on outcomes (the equilibrium selection problem)
3. Nowak and May (1992) proved structure does independent coordination work
4. Alexander himself identifies the need for a new fitness measure for cultural evolution
5. The "how possibly" explanatory limitation can be answered by structural characterisation
6. The thesis positions as complementary to Alexander's population-level programme, addressing the acute case
