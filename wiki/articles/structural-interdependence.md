---
title: Structural Interdependence
type: concept
created: 2026-04-06
last_updated: 2026-04-10
related: ["Coordination Without Convergence", "Value Incommensurability", "AUKUS", "Evolutionary Game Theory", "Parity", "Incomplete Preferences", "Rorschach Concepts", "Multifaceted Social Engineering"]
sources: ["3-project/working-papers/writing/methodological-evolution.md", "1-theory/03-frameworks/04-the-coordination-space.md", "1-theory/03-frameworks/05-the-formal-programme.md", "wiki/app/source/open-questions.md"]
tags: [coordination, structural-features, hypothesis, core-concept]
description: The investigation's central hypothesis. Structural features of interdependence as candidate grounds for coordination without value convergence.
---

**Structural interdependence** refers to conditions that agents share by virtue of being strategically entangled with each other, independent of whether they share values, intentions or worldviews. The investigation hypothesises that these structural features can ground [[Coordination Without Convergence]] where shared values cannot. The hypothesis is load-bearing for the thesis and is held as a working proposal rather than a completed formal object.

## Candidate structural features

Four candidates are currently being explored. Each is treated as an observer-independent structural fact under a conditional reading: given that agents share a vocabulary for what counts as a downside, an entanglement, a constraint or a procedure, the topology and correlation structure of those features is a fact about the arrangement rather than a projection of any agent's preferences. This is weaker than a claim of value-neutral structural facts and stronger than treating structural talk as preferences in disguise. The position is close to Sen's positional objectivity and will be defended against the philosophy-of-science and fact/value literature in forthcoming articles.

### Shared risk topology

A partial ordering over catastrophic outcomes that all parties can endorse without agreeing on the ranking of positive outcomes. In [[AUKUS]] trilateral defence coordination, the parties hold different strategic doctrines but share agreement on which catastrophic outcomes are unacceptable. Status: measurable as a correlation matrix of threat exposures once the agents share a vocabulary for what counts as a downside.

### Shared constraints

Physical, institutional or systemic boundaries that all actors face regardless of values. Climate systems, supply-chain interdependencies, nuclear weapons stockpiles: conditions that do not care what anyone believes. Status: measurable as a constraint topology once the agents share a vocabulary for which boundaries bind.

### Network entanglement

Interconnection sufficient that unilateral action is self-defeating. When an actor's outcomes depend on the outcomes of others through channels they cannot sever, the structure of entanglement generates reasons for coordination that hold even under value disagreement. Status: measurable as an entanglement density once the agents share a vocabulary for which channels count as operational dependencies.

### Procedural commitments

Shared rules about how interactions will be conducted, independent of what outcomes those interactions should reach. The IETF's "rough consensus and running code" is one example. Parliamentary procedure, treaty frameworks and constitutional arrangements are others. Status: measurable as a commitment strength once the agents share a vocabulary for which procedural bindings are in force.

## Formal framing

The investigation proposes that the four features are coordinates in a configuration manifold M, alongside evaluative commitments as additional coordinates. Points in M are full configurations of a coordination arrangement. The manifold carries two coordinate types: structural coordinates (risk topology, entanglement density, constraint topology, procedural commitment strength) held as observer-independent in the conditional sense above, and evaluative coordinates (security valuation, sovereignty commitment and similar) that are agent-specific. Structural and evaluative coordinates sit in the same space as different coordinate types rather than as separate layers.

Over M sits a bundle of dominance cones. At each point, each agent has a cone in the tangent space picking out directions that agent endorses as improvements from their situated position. Unlike a half-space derived from a scalar utility gradient, a dominance cone can be narrower than a half-space and its complement can include a region of [[Parity]] where the agent can neither endorse nor reject the move. This gives [[Incomplete Preferences]] a geometric home: partial orderings over position-vectors are represented as cone sections rather than as scalar rankings.

Structural equilibrium is defined as the position from which no agent can reach a cone-endorsed destination via an available move. The working direction is to generalise Nash equilibrium to partial orderings over position-vectors in this manifold. Classical Nash on a finite strategy space with cardinal utility is the degenerate limit where cones collapse to half-spaces and the manifold collapses to a discrete set. The generalisation is strictly conservative in that limit.

This three-move package (partial orderings within an agent, partial orderings across agents, structural features as first-class coordinates) is the current working formal shape. It is explicitly held as unproven. The investigation uses language of proposal, working direction and research hypothesis rather than result, theorem or establishment.

## Formalisation

The mathematical programme spans three traditions, with supporting layers from two more.

- **Differential geometry.** The configuration manifold and its position-dependent metric tensor. Off-diagonal components of the metric encode the non-orthogonality of axes: moving along one axis can pull the configuration along another, with the effect varying with position. The metric may be smooth (classical Riemannian manifold) or stratified with phase boundaries where eigenvalues change sign, formalising cooperative-to-adversarial regime transitions as bifurcation points.
- **Convex analysis and cone theory.** Pointed cones, dual cones, generalised inequalities and polyhedral representations as the formal home of partial orderings that replace scalar utilities.
- **Vector-valued game theory.** Structural equilibrium as a generalisation of Nash to cone orderings, drawing on Shapley 1959 and subsequent formulations in Corley and Sawaragi.

Supporting layers: dynamical systems theory for time evolution and bifurcation analysis at regime transitions, and cooperative game theory for the coalition-reachability half of the equilibrium condition. [[Evolutionary Game Theory]] remains the tradition the thesis extends rather than replaces. Computational exploration using the Python scientific stack is a methodological commitment throughout, supplementing analytical work rather than substituting for it.

## Open questions

Honest unresolved questions include:

- Whether the four candidates reduce to a common formal account or require distinct treatment.
- Whether the four candidates are empirically operationalisable in specific coordination cases, and which operationalisations are defensible rather than merely convenient.
- Whether structural features are genuinely independent of preferences or whether they embed value judgements in a more subtle form. The conditional observer-independence position above is a working answer, not a settled one.
- Whether structural equilibria exist in general on the cone-bundle-over-manifold object, or only in specific intermediate cases between the Nash limit and the fully general case.
- Whether the metric and cone structures are logically independent or whether coordination domains force metric-cone coupling.
- Whether Alexander's distinction between piecemeal and [[Multifaceted Social Engineering]] is genuinely captured as single-coordinate versus multi-coordinate moves respecting the metric's off-diagonal components, or whether Alexander's intuition tracks something the metric story does not reach.
- How the picture handles collective agents coherently, given that the notion of "an agent's cone" is ambiguous for nations, treaty parties and corporations whose preferences are themselves an aggregation problem.

The running register of open questions is maintained in the investigation's open-questions document and is the canonical list. The items above are the ones most directly load-bearing for the central hypothesis. The relationship between structural stability and transient [[Rorschach Concepts]] alignment is a further open question about when structural equilibrium obtains versus when coordination is merely the appearance of alignment that collapses under pressure.

## See also

- [[Coordination Without Convergence]]
- [[Value Incommensurability]]
- [[Parity]]
- [[Incomplete Preferences]]
- [[J. McKenzie Alexander]]
- [[Richard Bradley]]
