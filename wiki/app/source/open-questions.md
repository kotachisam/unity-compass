---
title: Open Questions
description: Genuinely unresolved conceptual questions about the coordination space. Honest about what isn't formed yet.
type: source
status: living-document
created: 2026-04-09
---

# Open Questions

This is not a research agenda. It is a list of things the author does not yet know. It exists so that the thesis proposal can distinguish between claims being made and questions being acknowledged.

---

## On the structure of the model

### How many layers?

The working distinction is between objective structural features (Layer 1) and subjective perception/evaluation of those features (Layer 2). But geopolitical, economic, institutional and normative dimensions might each require their own treatment. Are these genuinely distinct layers, or are they domains/dimensions within the single structural layer? The real question may be: is the model layered at all, or is it one configuration space with a single distinction between the measurable features of a configuration and the evaluative stance agents take toward those features?

If there are intermediate layers, what determines their ordering? If they're all axes in one space, what determines which axes matter for a given coordination problem?

### What is the relationship between structural features and values?

The thesis claims values and structural features are axes in the SAME coordination space. But the formal programme also distinguishes between objective structure (where stability is defined) and subjective perception (where coordination behaviour comes from). These two claims need reconciling. If values are axes in the space, they're structural. If they're the evaluative stance toward the space, they're not axes at all. Which is it? Or is it both, and the apparent contradiction is the actual insight?

### Is structural fitness observer-independent?

The claim is that structural features can be assessed on objective grounds (parity, dominance) while subjectivity enters in weighting. But "objective" relative to what? A configuration that is structurally stable for one set of agents may be structurally unstable for another. Does structural fitness require specifying "fitness for whom"? If so, how does this differ from utility with extra steps?

**Refined answer via the geometric sketch (2026-04-10)**: the cone-bundle-over-Riemannian-manifold picture gives the answer a sharper form. The metric tensor g_{ij}(x) is observer-independent structure: any agent looking at the configuration agrees on the measurement of shared risk, entanglement, constraint topology, procedural commitments. The dominance cones C_i(x) are agent-specific evaluation: what agent i endorses as an improvement from their situated position. Structural fitness in the objective sense is the metric; subjectivity enters through the cones. This is not utility with extra steps because the cones are partial orderings rather than scalar gradients, and the structural coordinates are facts about the arrangement rather than derived from any agent's preferences. Whether this answer holds up under pressure from a Bradley-style impossibility argument about situated assessment is a further open question, but the formal home of "observer-independent structure" is now explicit: it is the Riemannian metric on the configuration manifold.

**Tiered refinement (2026-04-11)**: the conditional retreat (after Sen's positional objectivity, see methodological-evolution.md "Tiered defensibility of structural features") is too uniform across the four candidate structural features. Shared risk topology admits a stronger Tier 1 claim at the catastrophic-to-humanity level, because at that level the categorisation is robustly shared across virtually any agent who values their own and their kind's continued existence (Bostrom 2013, Ord 2020). Constraint topology has a partial Tier 1 case for physical constraints. Entanglement density and procedural commitments require the conditional retreat throughout. The three-tier structure (catastrophic / serious-but-not-existential / contested) gives the strongest claim where it is genuinely defensible without overgeneralising. AUKUS sits at Tier 2; the case study domain runs on the conditional version; Tier 1 grounds the philosophical defensibility but is not where the case work happens.

---

## On the formal apparatus

### What is a position-vector?

The thesis uses "position-vectors in a configuration space" but has not defined what the components of the vector are. Are they measurable quantities (GDP, Gini coefficient, institutional trust indices)? Are they relational (an agent's position relative to other agents)? Are they dispositional (how an agent would respond to perturbations)? The answer determines what kind of mathematics is needed.

### Is the partial ordering constructible?

The thesis claims partial orderings over position-vectors are incomplete betterness relations (connecting to Bradley 2022). But can such an ordering actually be constructed for real-world cases, or is this a theoretical existence claim? What data would you need? Who determines the ordering?

### Does structural equilibrium have useful properties?

Defined as Nash generalised to partial orderings. But Nash equilibrium's power comes from existence and uniqueness results. Does structural equilibrium exist in general? Is it unique? Is it computable? If none of these, the concept may be formally interesting but practically useless.

---

## On the relationship to existing work

### How does this differ from mechanism design?

Mechanism design also asks: given agents with private information and divergent preferences, what institutional structure produces desirable outcomes? The coordination space might be a contribution to mechanism design rather than a new formal object. What exactly is new?

### How does this differ from Ostrom?

Ostrom's institutional analysis already examines how structural features of governance arrangements enable coordination across value difference. The coordination space might be a formalisation of Ostrom rather than something distinct. Is that enough for a thesis? (Possibly yes, if the formalisation reveals things the informal analysis misses.)

### What does Alexander's 2007 book actually do?

"Population structure explains moral norm emergence" (Alexander 2007). The thesis claims to go beyond this by adding procedural commitments and shared risk as formal variables, plus an acute-case framing rather than population-level. But this differentiator has not been tested against a close reading of the 2007 book. It needs to be.

---

## On Taylor's common meanings (surfaced 2026-04-08)

Taylor (1971) distinguishes between intersubjective meaning (enables coordination) and common meaning (creates community). Common meaning is "more than convergence": "what is required for common meanings is that this shared value be part of the common world, that this sharing be shared." Common meanings can "subsist with a high degree of cleavage."

The coordination space may be a formalisation of common meaning in Taylor's sense: not convergence of values, but a shared structural space within which divergent positions are navigable. The "sharing being shared" is the mutual orientation within the configuration space. But this is a conjecture, not a result. What would it mean to formalise "the sharing being shared"? Is mutual knowledge of the space sufficient? Is it necessary?

---

## On whether the thesis actually escapes Bradley's results

### Does the structural analogue inherit the impossibility?

The claim: replacing impartial evaluation with situated structural assessment escapes Bradley's homogeneity and ambiguity-neutrality results because those are forced by impartiality specifically. But this hasn't been proven. Bradley showed that WEAK assumptions force STRONG results. What if structural analogues of State Dominance and Pareto, combined with situated assessment, force their own restrictive results? The escape is asserted, not demonstrated. What would a proof look like? What would a counterexample look like?

### Are partial orderings over position-vectors really "incomplete betterness relations"?

Bradley's incomplete betterness relations are over well-being prospects. The thesis's partial orderings are over structural positions. "Betterness" implies better FOR SOMEONE by SOME CRITERION. What makes a structural position "better"? If the answer is "lower risk exposure, higher entanglement robustness," that's a specific value judgement about what matters structurally. The partial ordering isn't value-free; it embeds assumptions about what counts as structurally good. How is this different from utility with structural characteristics substituted for well-being?

### Does the trilemma really dissolve?

The thesis "doesn't rank prospects, so the trilemma dissolves." But structural equilibrium involves comparing configurations. Partial orderings involve assessing dominance. If agent i assesses whether configuration A or B is structurally preferable from their situated position, that IS a form of prospect evaluation. Maybe Bradley's trilemma reappears in structural clothing. What exactly is the formal difference between ranking well-being prospects and ranking structural positions?

---

## On the complementarity framing with Alexander

### Does the "acute case vs. long run" distinction hold?

The thesis positions as: "Alexander explains how coordination norms emerge over evolutionary time; the thesis explains what grounds coordination in the specific case before evolution has operated." But Alexander 2024 doesn't use evolutionary game theory at all. He writes 346 pages about coordination problems without deploying his own formal tools. If Alexander himself doesn't see EGT as relevant to his diagnostic concerns, is the thesis really complementary to his EGT work? Or is the thesis the BRIDGE between Alexander's two disconnected bodies of work (the formal EGT and the diagnostic Open Society book)?

### What does Alexander 2007 actually argue?

The thesis claims to extend Alexander's "morality as social technology for interdependent decision problems." But the 2007 book hasn't been closely read. The differentiator ("procedural commitments and shared risk as formal variables, plus acute-case framing") hasn't been tested against what Alexander actually does in that book. This is a genuine gap. You cannot claim to extend a framework you haven't read.

---

## On Rorschach concepts and structural stability

### When does a Rorschach concept produce coordination vs. mere aggregation?

Alexander's Rorschach concepts coordinate without convergence: a crowd endorses MAGA without shared policy content. But is this coordination or aggregation? Trump's presidency involved constantly shifting positions, internal chaos, contradictory policy. If the "coordination" a Rorschach concept produces is unstable and incoherent in practice, the thesis needs to distinguish between structural equilibrium (genuinely stable) and transient Rorschach alignment (appearance of coordination that collapses under pressure). What structural conditions determine which obtains?

---

## On the fitness landscape and navigation

### Can agents navigate the coordination space?

Alexander 2024 uses fitness landscapes metaphorically. If the coordination space IS a fitness landscape, agents face the standard problem: you can't see the global optimum from a local position. Even if the space is computationally tractable in principle, can agents USE the computation? Do they need to know the whole landscape (impossible) or only their local neighbourhood (which traps them at local optima)? The computational tractability argument cuts both ways: a computable space that agents can't navigate is no better than an incomputable one.

### Is ε a position or a property of the landscape?

Skyrms's correlation coefficient ε transforms coordination outcomes dramatically. The notes flag it as "underexploited" and potentially novel as a "design variable." But is ε a property of an agent's position in the coordination space, or a property of the space itself? If it's a property of the space, the thesis is partly about designing landscapes (institutional architecture), not just characterising positions within them. These are different projects with different formal requirements.

---

## On the structural candidates

### Are the coordination space axes genuinely independent?

Alexander's Ch. 29 "finest hour" opening describes specific causal loops between the four conceptions of the Open Society: social media addiction → anonymous communication → tribal reinforcement → safe space demand → echo chambers → populist rejection of cosmopolitanism. The loops run in multiple directions. This implies the four conceptions are not orthogonal axes; they have correlation structure. If the coordination space's axes have similar interdependencies (and it's hard to see why they wouldn't), the formal object needs to represent that. Can the dependencies be characterised as formal relationships between axes? Or does the space need a more complex structure (e.g., a manifold where axes are locally independent but globally correlated)? This is a harder version of the "are the axes orthogonal?" question in the formal programme.

### Is the geometry of the space variable across strategic modes?

Refinement of the independence question (surfaced 2026-04-10). The axes may not just be non-orthogonal but variably non-orthogonal: the "angle" between them shifting depending on whether agents are operating in a collaborative or adversarial mode. In collaborative regimes, structural features may reinforce each other (moving along one axis tends to pull you along another in the same direction). In adversarial regimes, the same structural features may oppose each other. This isn't standard Euclidean geometry. It's closer to Riemannian geometry with a position-dependent metric, or to the distinction between cooperative and non-cooperative game theory where the same strategic variables interact differently under different regimes.

Open questions: (1) Is there a principled way to represent the strategic mode as a parameter of the space? (2) Does the mode shift correspond to a continuous parameter or a discrete regime change that produces bifurcations? (3) If discrete, can the bifurcation conditions themselves be characterised formally (under what structural configurations does the space flip from cooperative to adversarial geometry)? (4) Does standard coordination theory's assumption of cooperative agents preclude this representation, and if so, what formal tradition handles both regimes together?

This connects to the adversarial dynamics problem: Alexander's Douglas Adams reference (p. 321) notes that regulators are always one step behind because the incentive structure rewards finding new exploits. The coordination space needs to handle agents actively trying to exploit structural asymmetries, not just agents trying to find equilibria together. The variable-geometry framing is the formal representation of that exploitation dynamic.

**Update after the Gaus targeted reading (2026-04-10)**: Gaus does not engage variable geometry in his formal treatment. §29 (p. 238) gestures at reflexivity and many-to-one-to-many relations in complex systems, but he treats these as arguments for epistemic humility about policy rather than as formal structure to be captured. Variable geometry remains a genuine novelty the thesis can claim. The formal home is a position-dependent metric tensor g_{ij}(x) on the configuration manifold. The sub-question of whether the variation is smooth (classical Riemannian) or stratified (phase boundaries where metric eigenvalues change sign or vanish) is captured as a distinct open question in the 2026-04-10 section below. The stratified-manifold answer would formalise cooperative-to-adversarial regime shifts as bifurcation points in the metric; the smooth answer would treat them as continuous gradients in the off-diagonal components.

### Are the four candidates axes or generators?

Risk, constraints, entanglement, procedural commitments: are these the axes of the coordination space, or are they features that generate the axes? If "constraint" is an axis, what does "more constraint" mean directionally? More constraint can enable coordination (forcing cooperation) or destroy it (eliminating agency). This suggests constraint isn't a single axis but a complex feature that interacts differently in different configurations. If the candidates are generators rather than axes, the dimensionality of the space is unknown.

### Can parity be quantified?

The Bradley notes claim: "the coordination space quantifies parity rather than dissolving it." But parity is the ABSENCE of a complete ordering. Two configurations are "on a par" when neither dominates. How do you quantify an absence? What number or structure captures "these are comparable but neither is better"? If the answer is "the partial ordering itself captures it," then parity isn't quantified, it's represented. Representation and quantification are different things.

---

## On sedimentation and structural fitness

### Is structural fitness the formalisation of sedimentation?

The Alexander 2024 notes say: "sedimentation is a metaphor for what structural fitness captures formally." But sedimentation (Beauvoir via Merleau-Ponty) is about individual psychology: how committed a person becomes to their projects over time. Structural fitness is about the relationship between an agent and a coordination arrangement. These are different levels of analysis. An individual can be deeply sedimented in values that produce low structural fitness (committed to a failing coordination arrangement). The metaphorical connection may be misleading rather than illuminating.

---

## On common knowledge and the "sharing being shared"

### Does structural equilibrium require common knowledge?

Taylor's "sharing being shared" implies meta-coordination: agents know that others also orient within the shared space. If structural equilibrium requires common knowledge of the structural features, this introduces the same epistemic requirements that make classical equilibrium concepts problematic in practice. Common knowledge is a very strong condition. Does the thesis need it? Can structural equilibrium be defined with weaker epistemic conditions (mutual belief, approximate common knowledge)?

---

## On the spiritual/meaning dimension

### Can the coordination space account for religion and faith?

Religion and faith persist across cultures and centuries because they do coordination work that formal institutions can't: meaning, community, shared narrative, existential orientation. These are Layer 2 phenomena that interact with Layer 1 structure. A shared religious narrative stabilises coordination differently from a shared trade agreement. Can the coordination space represent this difference? If yes, the thesis is stronger for including it. If no, the thesis has a boundary condition it needs to state honestly: that an entire class of coordination-sustaining phenomena falls outside the formal object, just as values fall outside game theory's payoff matrix.

This is not about whether the spiritual dimension is "real" in a metaphysical sense. It's about whether it does measurable coordination work, and whether the formal object can capture that work or must exclude it.

### Is institutional design sufficient without meaning?

The thesis's prescriptive ambition is: build systems where structural reality becomes legible as a byproduct of design, not a demand on individual enlightenment. But meaning-making (narrative, identity, purpose) may be a necessary condition for agents to engage with ANY institutional structure, however well-designed. If agents don't experience the coordination arrangement as meaningful, they may defect even when structural position favours staying. Meaning could be a hidden axis in the coordination space, or it could be a precondition for the space to operate at all. Which is it?

---

## On the relationship between Layer 1 and Layer 2 dynamics

### What is the lag structure?

Agents act on Layer 2 perceptions, and those actions reshape Layer 1 structure. A farmer who believes tariffs serve national greatness supports policy that damages their structural position. The lag between Layer 2 perception and Layer 1 reckoning is part of the dynamics. But how long is the lag? What determines it? Is it a property of the information environment (how fast structural consequences become visible), the agent (how resistant their projections are to disconfirming evidence), or the institutional design (whether feedback loops are short or long)? Can the coordination space model this lag, or is it exogenous to the formal object?

### Does the thesis need to model Layer 2 at all?

Three options identified (2026-04-09):
1. Agents SHOULD perceive the L1/L2 gap (normative, Enlightenment promise, probably false)
2. Structural features operate regardless of perception (descriptive, defensible, less ambitious)
3. Structural features operate regardless, coordination is MORE stable when agents perceive them accurately (empirically testable, prescriptive via institutional design)

Option 3 is the current working position. It implies the thesis doesn't model Layer 2 directly but models the CONDITIONS under which Layer 2 perception aligns with Layer 1 reality. Those conditions are properties of institutional design: feedback speed, attribution clarity, consequence visibility. This makes the prescriptive output concrete: design institutions that shorten the lag between structural reality and agent perception.

**Update after the Gaus reading and the geometric sketch (2026-04-10)**: the L1/L2 framing maps onto the metric/cone distinction in the geometric sketch. The metric g_{ij}(x) captures L1 (observer-independent structural facts about costs, distances, axis interaction). The cones C_i(x) capture L2 (agent-specific situated evaluation of which moves are endorsed). These are logically independent structures at the base level, though they interact in the equilibrium condition. Option 3 can now be restated: the metric operates regardless of agents' cone sections, and structural equilibrium is more stable when the cone sections are aligned with the metric's feasibility constraints. The three moves the thesis makes (partial orderings within an agent, partial orderings across agents, structural features as first-class objects) travel as a package, with the third move being the core of which the first two are parts. This supersedes the earlier framing of "layers" with a cleaner picture of "two logically independent structures on the same manifold."

---

## From the Gaus Claude-assisted scan and the geometric sketch (surfaced 2026-04-10)

A Claude-assisted targeted scan of Gaus (2021), intended to help plan the user's own reading rather than substitute for it, and a subsequent mathematical sketch produced a more specific picture of where the formal object might live: a Riemannian configuration manifold with agent-specific dominance cones as fibres over it. The user's own reading of Gaus is pending, so all claims in this section are provisional and should be verified against the text during that reading. Structural and evaluative commitments sit in the same manifold as different coordinate types (structural observer-independent, evaluative agent-specific). A position-dependent metric tensor g_{ij}(x) encodes axis non-orthogonality and may have singularities at cooperative-to-adversarial regime transitions. Each agent's dominance cone at a point is a subset of the tangent space picking out directions that agent endorses as improvements from their situated perspective. Structural equilibrium is the position from which no agent can reach a cone-endorsed destination via an available move.

None of this is a proven result. It is held as a working direction with explicit gaps. The sketch itself generates new open questions listed below, all surfaced 2026-04-10.

### Does Gaus's §20 actually handle the thesis's motivating examples?

The v3 proposal's motivating examples (couple valuing security vs adventure, indigenous land rights vs economic development, nation-vs-nation with different security definitions) are framed at the interpersonal level. Gaus's §20 Self-Organization Model handles interpersonal heterogeneity via agent-specific μ profiles plus typed weighting functions, without requiring interpersonal comparisons of utility. A reviewer could reasonably say these examples are already handled in the existing literature. The thesis's sharpest wedge is intrapersonal incompleteness: cases where a single agent (individual, nation, treaty principal) cannot construct a complete ordering over options even within their own perspective. The v3 examples under-sell this. A sharper set of motivating examples that isolate intrapersonal incompleteness is needed before the proposal goes out, or the thesis needs to bite both bullets (interpersonal extension plus intrapersonal novelty) explicitly and defend both.

### Do structural equilibria exist in general?

Classical Nash equilibrium existence on finite strategy spaces uses Kakutani's fixed-point theorem. Vector-valued game theory (Shapley 1959, Corley 1985) has analogues for specific cases. Whether a general existence result holds for the cone-bundle picture on Riemannian manifolds is unknown to the author and is a genuine formal research question. The proposal should flag this as an open question rather than assume existence by extrapolation. The honest minimum is: existence in the degenerate limit (cones collapse to half-spaces, manifold collapses to discrete set) is guaranteed by Nash, and the research programme is to identify which intermediate cases admit existence results.

### Are metric and cone structures logically independent?

In the current sketch, the Riemannian metric and the dominance cones are independent objects: the metric encodes observer-independent structural facts about costs and distances, the cones encode agent-specific evaluation. They interact at the equilibrium condition (a move must be cone-endorsed and metrically feasible) but neither determines the other. An alternative formulation would couple them: an agent's dominance might weight moves by cost-per-improvement, making the cone metric-dependent. Both formulations are mathematically coherent. Which one fits the phenomenon is a research choice that needs to be made early. The simpler independent version is the starting point, but there may be coordination domains where metric-cone coupling is forced by the empirical content (for example, when effort or resource cost directly shapes what an agent considers an improvement).

### Is the metric smooth or stratified?

The variable-geometry insight has a formal home in the position-dependent tensor g_{ij}(x). The unresolved sub-question is whether the variation is continuous (classical Riemannian manifold with smooth metric) or involves singularities where eigenvalues change sign or vanish (stratified manifold with phase boundaries corresponding to regime transitions). The stratified-manifold answer formalises cooperative-to-adversarial regime shifts as bifurcation points in the metric. The smooth answer treats regime shifts as continuous gradients in the off-diagonal components. Either is mathematically defensible; the choice determines which branch of differential geometry the thesis relies on and whether dynamical systems theory (bifurcation analysis) becomes central or supporting.

### How do structural features get operationalised empirically?

Shared risk topology, entanglement density, constraint topology and procedural commitments are conceptually clear. What would it mean to measure them on a real coordination case? For AUKUS, can shared risk topology be operationalised as the correlation matrix of threat exposures? Can entanglement density be operationalised as a composite index of operational dependencies (interoperability standards, personnel exchange volumes, supply chain integration)? These empirical questions are distinct from the formal questions about manifolds and cones, and they are the bridge without which the formal object has no contact with real coordination problems. The thesis needs at least one worked case showing how the structural features of a specific arrangement can be measured, and needs to distinguish between operationalisations that are defensible and operationalisations that are convenient but ad hoc.

### Is "piecemeal vs multifaceted social engineering" genuinely captured by single-axis vs multi-axis moves?

The geometric sketch suggests Alexander's Ch. 29 distinction between piecemeal and multifaceted social engineering gains formal content as single-coordinate vs multi-coordinate moves on the configuration manifold. Piecemeal moves fail because the metric's off-diagonal components mean adjusting one axis drags you along another, so single-axis optimisation cannot account for all consequences. Multifaceted moves are coordinated multi-coordinate changes that respect the full metric tensor. This is a candidate formalisation, not a proven one. It may be that Alexander's intuition is about something else (attention, cognitive capacity, political feasibility, time horizons) that the metric-tensor story does not fully capture. Worth testing against the Ch. 29 text in detail and possibly against a concrete AUKUS case before committing to the formal gloss.

### Is the Wright / shifting balance analogue formal or loose?

Wright's original fitness landscape argument used genetic drift across neutral ridges to explain how populations escape local optima. In the cone bundle sketch, coalition traversal across parity regions plays an analogous role: parity regions are the coordinate-theoretic analogue of neutral ridges; coalition formation is the analogue of drift. Is this a proper formal analogue (same mathematical structure in different domains) or a loose metaphor (similar intuition, different underlying mechanism)? If the analogue is formal, the thesis inherits some of Wright's shifting-balance machinery directly, which would be a significant cross-domain result. If the analogue is loose, it is a useful pedagogical tool but no more. Worth investigating as part of the reading of Wright 1932 and Hofbauer & Sigmund 1998.

### How much of the formal programme is computationally tractable?

Rough split: definitions, existence theorems, characterisation results and limit-case arguments need pen-and-paper work. Numerical examples, metric estimation, cone construction, dynamics simulation, bifurcation analysis and visualisation are computationally tractable. The question for the thesis is what fraction of the total programme lives on each side and whether computational exploration can substitute for (not only supplement) analytical proof in specific areas. Gaus's §20 is substantially computational (Models I-III are simulations), and the broader EGT tradition (Sandholm, Hauert, Skyrms) is heavily computational. This is useful precedent. The user's engineering and software background makes computational work a natural supplement to the formalism; a minimal Python implementation of the configuration manifold with polyhedral cones is plausible as a pre-MPhil artefact, though the definitions must be tight before code is worth writing.

### Does the configuration manifold picture handle collective agents coherently?

A stronger critique the thesis makes against Gaus's own formalism is that Gaus's completeness assumption becomes a fiction for collective agents (nations, treaty parties, corporations), whose "preferences" are themselves an aggregation problem rather than a primitive. The partial-ordering move is then not just a technical weakening for edge cases but an object more faithful to how real coordination happens at the collective scale. But the cone bundle picture has its own collective-agent problem: whose cone is the cone of a nation? Is it the cone of the principal who makes the decision, or a composite cone derived from internal factions, or something else? The thesis needs a coherent answer to "what is an agent" in the geometric picture before it can claim to handle collective agents better than Gaus does.

### How should predictive models be constructed formally? (surfaced 2026-04-11 from user reading of Gaus §15.1)

Gaus's six-element perspective model in §15.1 includes element V: a set of predictive models that take the agent's set of options and predict, for each, the social worlds that would be produced. The thesis's current formal sketch (configuration manifold with metric and cone bundle) has no element V analogue. Agents in the manifold need some way to predict where moves lead, but the metric tensor only tells the agent the cost or distance of a move; it does not model the agent's prediction of what configuration the move arrives at, what consequences follow, how the system responds. Different agents may have different predictive models of the same arrangement, and those predictive models are themselves a source of diversity that is neither metric (structural) nor cone (evaluative) in the current sketch.

The user has confirmed that element V is going to be a key part of the thesis but the construction is not yet worked out. Three candidate formal moves are flagged in the methodological evolution document under "Predictive models as a missing element":

1. Per-agent dynamical systems (each agent carries a vector field on the manifold representing their model of how configurations evolve)
2. Causal model bundles (a bundle structure where each fibre at point x is the set of plausible next-positions according to that agent's causal model)
3. Learned predictive models with shared updating (agents update based on observed outcomes, possibly converging on shared models)

None is committed yet. The thesis's current two-layer (structural / evaluative) split needs to expand to a three-component framing (structural coordinates with metric, evaluative cones, predictive models) to be honest about what is being claimed. Substantial development of this component is reserved for the MPhil year, possibly drawing on dynamical systems theory and the cognitive theory of categorisation (Hayek 1952, Page 2007, North 2005).
