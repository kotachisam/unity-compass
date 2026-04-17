# The Formal Programme (Draft)

**Status: post-first-reading scaffold.** This document captures the open questions and mathematical programme surfaced by the first reading (Alexander, "Evolutionary Game Theory," SEP 2021). It will grow as subsequent readings (Alexander 2024, Bradley 2022, Bradley 2017) add constraints and tools.

---

## What the reading established

1. Every formal framework in EGT (ESS, replicator dynamics, BNN dynamics, Smith dynamics) requires a constructible payoff matrix with a shared value V. When V is incommensurable across parties, the formal apparatus is undefined. This is a boundary condition, not a patchable limitation.

2. Structure does independent coordination work. Nowak and May (1992) proved this for spatial topology within the existing formalism. The investigation asks what happens beyond the existing formalism: when structure is all you have.

3. Alexander himself calls for "an alternate theory of utility/fitness, one compatible with the bounded rationality of individuals" (section 6.1). The investigation proposes structural position as that fitness measure.

## Open formal questions

### Is the coordination space well-defined?

Can a formal space be specified where the axes are both value-alignment variables AND structural-interdependence variables (shared risk, constraints, entanglement, procedural commitments)? What topology does the space have? Is it continuous, discrete, or mixed? What does "distance" between two points mean?

### Are the axes orthogonal?

If value-alignment and structural-interdependence are not genuinely independent axes, the coordination space collapses into existing game theory with extra parameters. The formal contribution requires demonstrating that structural features do work that value-alignment cannot do alone, and vice versa. Nowak and May suggest orthogonality (structure changed outcomes while the game stayed fixed). The thesis must establish this formally.

### What is the stability concept?

"Structural equilibrium" (working term): a configuration where no agent can improve their structural position by defecting. How is "structural position" measured without a utility function? Is this concept well-defined, unique, characterisable? How does it relate to Nash equilibrium (it isn't a refinement; it's a different formal object operating in a different space)?

### What mathematics is needed?

The reading suggests the territory is closer to statistical mechanics than trajectory tracking. Many interacting structural variables, aggregate behaviour emerging from local configurations. Candidate tools:

- **Dynamical systems theory**: stability analysis, attractors, bifurcation points in the coordination space
- **Network topology**: structure of interaction (Nowak and May lineage, scale-free networks from Santos and Pacheco 2005)
- **Monte Carlo methods**: Skyrms's approach for exploring high-dimensional parameter spaces
- **Agent-based simulation**: Sandholm (2010) micro-to-macro framework for linking individual structural positions to population-level coordination behaviour

The n-body/three-body problem parallel is real: simple deterministic rules, spatial interaction, potentially chaotic outcomes sensitive to structural configuration.

### What are the boundary conditions?

- **Minimum structural entanglement**: below what threshold does structural interdependence fail to ground coordination?
- **Maximum incommensurability**: at what depth of value divergence does no structural feature provide purchase?
- **Temporal stability**: does structurally grounded coordination produce convergence over time (Tension 4 from philosophical-tensions.md)?
- **Scale-dependence**: do the structural variables do different work at different scales?

### What distinguishes this from "population structure" in Alexander (2007)?

Alexander's *Structural Evolution of Morality* already argues that population structure explains moral norm emergence. The investigation must articulate what "structural interdependence" captures that Alexander's "population structure" does not. The candidate differentiator: procedural commitments and shared risk as formal variables, plus the acute-case (specific actors, specific moment) rather than population-level framing.

## What the remaining readings need to establish

### Alexander, *The Open Society as an Enemy* (2024)
- Where Alexander's current thinking has moved
- Whether the open-society concept connects to coordination under value pluralism
- How to position the thesis alongside his most recent work

### Bradley, "Impartial Evaluation under Ambiguity" (2022)
- Whether Bradley's impartial-evaluation framework can be extended to situated coordination
- What "ambiguity" means formally and how it relates to value incommensurability
- The gap between impartial standpoint and first-person structural position

### Bradley, *Decision Theory with a Human Face* (2017)
- The formal apparatus for decision under severe uncertainty
- Whether the belief-revision framework applies to structural-position assessment
- Social choice under ambiguity as a tool for the coordination space

## Relationship to the thesis proposal

This document tracks the evolving formal programme. The research proposal (V2) will draw on whatever has been established here by the time of submission. The proposal doesn't need to have solved these questions. It needs to have stated them precisely and demonstrated that the tools exist to pursue them.
