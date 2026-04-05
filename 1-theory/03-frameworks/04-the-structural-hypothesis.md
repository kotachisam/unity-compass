# The Structural Hypothesis (Draft)

**Status: pre-reading.** This document articulates current best thinking on what might ground coordination when value convergence is unavailable. It has been written before the primary-source engagement with J. McKenzie Alexander's work on evolutionary game theory and Richard Bradley's work on decision theory under ambiguity that the investigation depends on. It will need substantial revision once that reading is done. It is included here, in rough form, because the thinking is load-bearing enough that it should be visible in the repository before it is formally defensible.

---

The [taxonomy](01-coordination-taxonomy.md) mapped five strategic archetypes and named value incommensurability as the category existing theory handles worst. The [evidence](02-what-works-and-why.md) showed that coordination without convergence does happen, and extracted a common architecture of five recurring elements. The [formalism boundary](03-where-models-fail.md) mapped where formal tools stop working, and asked whether the dimensions they exclude are strictly necessary complements or whether structural features can do coordination work without them.

This document proposes an answer. In rough form, under the assumption that it will change.

## The Hypothesis

If value convergence is neither sufficient nor necessary for coordination, something else grounds it. The hypothesis being tested is that this something else can be characterised as **structural features of interdependence**: conditions that actors share by virtue of being strategically entangled with each other, independent of whether they share values, intentions or worldviews.

Four candidates are currently being explored:

- **Shared risk topology**: a partial ordering over catastrophic outcomes that all parties can endorse without agreeing on the ranking of positive outcomes. Actors need not agree on what "success" looks like; they need only agree on what they are collectively trying to avoid.
- **Shared constraints**: physical, institutional or systemic boundaries that all actors face regardless of values. Climate systems, supply-chain interdependencies, nuclear weapons stockpiles: conditions that do not care what anyone believes.
- **Network entanglement**: interconnection sufficient that unilateral action is self-defeating. When an actor's outcomes depend on the outcomes of others through channels they cannot sever, the shared structure of entanglement generates reasons for coordination that hold even under value disagreement.
- **Procedural commitments**: shared rules about how interactions will be conducted, independent of what outcomes those interactions should reach. Constitutions, treaties, trading rules, parliamentary procedures: structures that organise interaction without requiring substantive agreement.

These four are not claimed to exhaust the category. They are the currently-visible candidates. Part of what the investigation has to establish is whether other structural features belong in the same category, and whether the four named are formally reducible to a common account or require distinct treatment.

## The Load-Bearing Distinction

The hypothesis rests on a single philosophical claim: that value convergence is *neither sufficient nor necessary* for coordination.

**Not sufficient**: Mancur Olson demonstrated that shared interests do not reliably produce collective action. Actors with aligned values still face strategic structures (free-riding, coordination failures) that can block cooperation.

**Not necessary**: Elinor Ostrom demonstrated that coordination can emerge through institutional design among actors who do not share values. Thomas Schelling demonstrated that coordination can emerge through structural salience without shared values or explicit communication.

These results are not new. What is underexamined is the formal question they pose together: if convergence is neither sufficient nor necessary, what is the relationship between structural features of interdependence and the coordination equilibria that do emerge? That relationship is what this investigation is trying to characterise.

## Candidate Structural Features, Explored

### Shared Risk Topology

The intuition: agents can disagree about what is good without disagreeing about what is catastrophic.

In trilateral defence coordination between the UK, USA and Australia, the parties hold different strategic doctrines, different democratic constraints on military deployment and different definitions of regional security. What they share is a partial ordering over catastrophic outcomes: certain regional conflicts, certain failures of nuclear deterrence, certain technology-transfer failures are unacceptable to all parties even though the parties would rank positive outcomes differently.

The formal question: whether a partial ordering over catastrophic outcomes, shared by all agents, is sufficient to generate stable coordination equilibria in the absence of a fully-specified common payoff matrix. If yes, under what conditions. If no, what additional structural features are required.

### Shared Constraints

The intuition: agents coordinate around physical or institutional boundaries they did not choose and cannot unilaterally ignore.

Climate systems are the canonical example. National jurisdictions, trade architectures and supply-chain topologies are institutional examples. These are not negotiated agreements. They are features of the environment within which coordination happens.

The formal question: whether the presence of hard constraints changes the strategic structure of coordination in ways that generate equilibria that would not emerge without them. If constraints function as forcing functions, what formal properties must they have to do that work.

### Network Entanglement

The intuition: when defection is self-defeating, coordination becomes rational even without value agreement.

In highly entangled networks, an actor's own outcomes depend on the states of others through channels they cannot sever. Financial systems, technological infrastructure, ecological dependencies: these produce entanglement dense enough that unilateral action harms the actor taking it.

The formal question: whether network entanglement, sufficiently dense, is itself a coordination mechanism. What density thresholds matter. How entanglement interacts with the other candidate structural features.

### Procedural Commitments

The intuition: agents can coordinate through shared rules about process without agreeing on outcomes.

The IETF's "rough consensus and running code" is one example. Parliamentary procedure is another. Treaty frameworks that specify how disputes are to be handled without specifying their resolution are another.

The formal question: how procedural commitments generate coordination stability in the absence of outcome agreement, and whether they can be formally distinguished from the other candidates or whether they are reducible to one of them.

## The Central Formal Question

Are these four candidates reducible to a common formal account, or do they require distinct treatment?

If reducible: there is a single underlying structural feature that all four are instances of, and the investigation's task is to identify it.

If distinct: each candidate operates through different mechanisms, and the investigation's task is to characterise each separately and specify how they interact.

Honest current state: it is not yet clear which is true. The candidates share a family resemblance but also have genuinely different structures. Whether the family resemblance is superficial or formal is what the investigation is trying to establish.

## What Formalising This Would Require

Two tool-traditions are relevant:

**Evolutionary game theory** (Alexander's territory): to ask whether coordination equilibria grounded in structural features are evolutionarily stable, whether they persist under defection pressure, whether they emerge from local interactions without central design. The question is whether Alexander's analytical apparatus can be extended to agents whose payoffs are not fully commensurable.

**Decision theory under ambiguity** (Bradley's territory): to ask what rational coordination looks like for agents who share structural interdependence but whose individual preferences cannot be aggregated into a common ranking. The question is whether Bradley's framework for decision under severe uncertainty can be extended from impartial evaluation to situated, first-person coordination.

This investigation is not yet in a position to answer whether either tool-tradition can actually be extended in the required ways. That is what the forthcoming reading is meant to establish.

## Boundary Conditions

The hypothesis is interesting only if it has limits. Some candidate boundaries:

- **Minimum structural entanglement**: below some threshold of interdependence, structural features may not be sufficient to ground coordination. What determines that threshold.
- **Maximum incommensurability**: at some depth of value divergence, no structural feature may provide purchase. What conditions would push coordination out of reach entirely.
- **Temporal stability**: coordination achievable in the short term may not be sustainable over longer periods without at least partial convergence emerging. The relationship between structural grounds and emergent convergence is itself an open question.
- **Scale-dependence**: the four structural features may do different work at different scales. What works at interpersonal scale may not generalise to international. What works for state-to-state may not apply between AI systems.

Establishing where the hypothesis fails is as important as establishing where it succeeds. The boundary conditions are where the investigation becomes philosophically informative.

## Why This Document Exists (And Why It Is Rough)

This document is deliberately rough. It is written before the primary-source reading that would let it be defended in formal terms. It is included here because the hypothesis is load-bearing for the rest of the investigation and needs to be visible in the public repository, not buried in the doctoral proposal.

The next substantive revision will happen after engagement with Alexander's *Evolutionary Game Theory* (2023) and *The Open Society as an Enemy* (2024), Bradley's *Decision Theory with a Human Face*, and "Social Ethics under Ambiguity" (2022). That reading is expected to sharpen the hypothesis, identify specific formal tools the investigation can use or must extend, and potentially reveal that one or more of the four candidate structural features requires reformulation.

What remains stable across any foreseeable revision: the central philosophical claim that value convergence is neither sufficient nor necessary for coordination, and the hypothesis that structural features of interdependence can ground coordination without it. What might change: the specific taxonomy of candidate features, the formal apparatus used to characterise them, and the boundary conditions identified.
