# Where Models Fail

The [taxonomy](01-coordination-taxonomy.md) mapped the strategic landscape. The [evidence](02-what-works-and-why.md) showed what works and what enables it. This document asks a different question: where do the formal tools themselves break down, and what does that boundary tell us about what coordination under the hardest conditions actually requires?

Formal modelling has earned its place. Game theory, social choice theory, mechanism design, computational simulation and decision theory under uncertainty are powerful tools. They have produced genuine insights about cooperation, incentive structures and strategic interaction. The [Axelrod analysis](01-coordination-taxonomy.md) demonstrated that clearly. The question here is different: where do these tools stop working, and what does that boundary reveal about what the hardest coordination challenges actually require?

Its boundary markers are among the most useful things this investigation can map. Knowing where a tool stops working tells you as much as knowing where it starts.

## The Assumptions Underneath

Every formal model rests on assumptions. When the assumptions hold, the model illuminates. When they don't, it misleads. The real danger is that the assumptions become invisible: baked so deeply into the framework that the people using it forget they're there.

Coordination theory draws on several formal traditions. Each has produced real insights. Each carries assumptions that break under identifiable conditions. Mapping these boundaries is prerequisite to knowing which tools to reach for and when to put them down.

<details>
<summary>

### Game Theory

</summary>

The dominant formal framework for analysing strategic interaction. The [taxonomy](01-coordination-taxonomy.md) is built on its vocabulary (prisoner's dilemma, assurance game, chicken) because that vocabulary genuinely illuminates coordination structures. But the illumination depends on assumptions that break under precisely the conditions high-stakes coordination faces.

**Actors are rational and know the others are too.** The model assumes that every player maximises their expected payoff given their beliefs about what the other players will do, and that every player knows the others are doing the same. This is "common knowledge of rationality," and it structures every equilibrium analysis. It breaks when actors are boundedly rational (most humans most of the time), when they operate under cognitive biases they're unaware of, when their decision-making processes are opaque even to themselves, or when some of the actors aren't human at all and optimise for objective functions that may not resemble anything a game theorist would recognise as "rationality."

**Preferences are stable, complete and known.** The model assumes actors can rank all possible outcomes, that this ranking doesn't change during the game, and that the ranking is (at least probabilistically) known to the other players. This breaks routinely. Preferences shift under deliberation (the Irish assembly demonstrated this empirically: participants changed their positions through engagement with evidence and testimony). Preferences are often incomplete: people genuinely don't know what they want until they encounter the concrete situation. And preferences under deep uncertainty may be fundamentally incoherent: how do you rank outcomes when you can't even enumerate what the outcomes might be?

**The game structure is common knowledge.** Everyone knows what game they're playing, what moves are available, what the payoffs are and that everyone else knows all of this too. In real coordination, the game structure is itself contested. Climate negotiations involve actors who disagree about whether they're in a social dilemma, an assurance game or a value incommensurability problem. The "game" is itself part of what's being negotiated, rather than a given. A model that assumes the structure is known cannot help when the structure is precisely what the actors disagree about.

**Payoffs are commensurable.** Outcomes can be ranked on a shared scale, even if different actors rank them differently. This is the assumption that [coordination under value incommensurability](01-coordination-taxonomy.md) violates directly. When actors hold values that cannot be placed on a common scale, the payoff matrix that game theory requires cannot be constructed. The model has no starting point.

</details>

<details>
<summary>

### Social Choice Theory

</summary>

Where game theory models strategic interaction between actors, social choice theory asks how individual preferences can be aggregated into collective decisions. It is the formal foundation for voting systems, welfare economics and democratic theory. And its most famous result is a proof of impossibility.

**Arrow's Impossibility Theorem.** Kenneth Arrow demonstrated in 1951 that no voting system can simultaneously satisfy a small set of reasonable fairness criteria: unrestricted domain (any set of individual preferences is admissible), non-dictatorship (no single voter determines the outcome), Pareto efficiency (if everyone prefers A to B, the collective should too), and independence of irrelevant alternatives (the collective ranking of A vs B shouldn't depend on how people rank C).[^1] This is a formal proof of a coordination limit. Any aggregation mechanism that satisfies some of these criteria necessarily violates others.

The implications for coordination theory are direct. Every collective decision mechanism embeds a trade-off between fairness criteria that Arrow proved cannot be simultaneously satisfied. Majority voting violates independence of irrelevant alternatives (spoiler candidates). Ranked choice violates it differently. Consensus requirements give veto power to minorities, approaching dictatorship by the most stubborn. The choice of mechanism is a choice about which unfairness to accept, and most institutional design makes this choice implicitly rather than transparently.

**Sen's Liberal Paradox.** Amartya Sen extended Arrow's result by showing that even minimal individual liberty is incompatible with Pareto efficiency under certain conditions.[^2] If individuals have the right to make certain personal choices (what to read, how to dress), collective outcomes can violate Pareto optimality. This means any coordination framework faces a formal tension between individual autonomy and collective welfare that cannot be eliminated through better mechanism design. It can only be managed, and managing it requires precisely the kind of judgment about which values to prioritise that formal theory leaves unresolved.

**The Condorcet Paradox.** Under majority voting, collective preferences can cycle: A beats B, B beats C, C beats A. The collective has no stable preference even when every individual does. This means that in any sufficiently diverse group, the order in which options are considered can determine the outcome. Agenda-setting becomes decisive, which means power operates through process design rather than through the preferences the process is supposed to aggregate.

Social choice theory's boundary: it proves rigorously that certain coordination ideals are formally unattainable. This is genuinely useful because it prevents wasting effort on mechanisms that provably cannot do what they claim. But proving impossibility doesn't tell you what to do instead. The gap between "this can't be solved perfectly" and "here's what to do in practice" is precisely where judgment, institutional culture and the dimensions the [formal toolkit leaves out](../01-core/04-philosophical-foundation.md) do work that the theorem cannot.

</details>

<details>
<summary>

### Computational Modelling and Agent-Based Simulation

</summary>

Where analytical game theory handles small numbers of actors with well-defined strategies, computational approaches model large populations of interacting agents with diverse behaviours. Agent-based models (ABMs) can simulate emergent coordination dynamics that analytical methods can't solve: how cooperation spreads through networks, how norms evolve, how small changes in individual behaviour cascade into systemic shifts.

Axelrod's tournaments were an early example. Contemporary ABMs model thousands or millions of agents interacting on complex networks, with learning algorithms, bounded rationality and heterogeneous strategies. They're used for epidemiological modelling, financial market simulation, urban planning and increasingly for governance design.

Their assumptions are different from game theory's, and they fail in different ways.

**Sensitivity to initial conditions and parameters.** ABMs can produce dramatically different outcomes from small changes in starting conditions or parameter values. This is a feature (it reveals which variables matter) and a vulnerability (it means results are fragile). A model that shows cooperation emerging under one set of parameters may show collapse under slightly different ones. Which parameters are "realistic" is itself a judgment call that the model cannot resolve.

**Validation against reality.** Analytical game theory produces equilibrium predictions that can (in principle) be tested. ABMs produce emergent patterns that are difficult to validate because the real-world systems they model are too complex to observe at equivalent resolution. A simulation that produces realistic-looking output may be doing so for the wrong reasons. The model reproduces the phenomenon without correctly representing the mechanism.

**The temptation of false precision.** Computational models produce numbers. Numbers feel concrete. But a number produced by a model whose assumptions are questionable is no more reliable than a verbal argument making the same assumptions. The precision is cosmetic. This is the same danger as with game-theoretic equilibrium analysis, amplified by the volume of output that computation enables.

**Emergent behaviour is not explanation.** An ABM can show that cooperation emerges under certain conditions. It cannot easily explain why. The model demonstrates that the outcome is possible given the assumptions, but the causal chain from assumptions to outcome runs through millions of individual interactions that resist summarisation. This makes ABMs better at demonstrating possibility than at generating the kind of understanding that would enable institutional design.

Computational modelling's boundary: it extends the reach of formal analysis to domains where analytical methods can't go (large populations, nonlinear dynamics, emergent phenomena). But it inherits the core limitation: the outputs are only as good as the assumptions encoded in the agents' behaviour rules. And those behaviour rules are precisely where the deepest uncertainties about human coordination reside.

</details>

<details>
<summary>

### Decision Theory Under Uncertainty

</summary>

Classical decision theory tells you how to choose when you know the possible outcomes and their probabilities. Expected utility theory says: list the outcomes, assign probabilities, multiply each outcome's value by its probability, choose the option with the highest expected value. This works brilliantly for insurance pricing, portfolio optimisation and any domain where the probability distributions are known or estimable.

Coordination under high-stakes conditions operates in a different regime.

**Risk vs uncertainty vs deep uncertainty.** Frank Knight's distinction matters.[^3] Risk involves known probability distributions (the odds of rolling a six). Uncertainty involves unknown probabilities but known possible outcomes (you know what might happen but not how likely each outcome is). Deep uncertainty involves unknown outcomes: you cannot even enumerate what might happen, let alone assign probabilities. Climate tipping point cascades, transformative AI trajectories, novel pandemic pathogen evolution: these operate in the deep uncertainty regime where expected utility theory has no purchase.

**Prospect theory's corrections.** Daniel Kahneman and Amos Tversky showed that actual human decision-making under risk systematically deviates from expected utility: people overweight low-probability events, are loss-averse, and evaluate outcomes relative to reference points rather than absolutely.[^4] This matters for coordination because it means actors' actual behaviour under uncertainty diverges predictably from what rational choice models predict. Mechanisms designed for expected utility maximisers will be gamed, resisted or simply misunderstood by actual humans.

**Robust decision-making.** More recent approaches (Lempert, Ben-Haim) attempt to work under deeper uncertainty by asking: which strategy performs adequately across the widest range of possible futures, rather than optimally in the most likely one?[^5] This is a genuine advance because it doesn't require probability distributions. But it still requires being able to enumerate the "possible futures," which deep uncertainty may not permit.

**Info-gap decision theory.** Yakov Ben-Haim's framework addresses decisions where the uncertainty is about the model itself: you don't know how wrong your model is, only that it's wrong to some unknown degree.[^6] This is closer to the actual epistemological situation high-stakes coordination faces. But it produces recommendations of the form "choose the option that degrades least as your model error increases," which is useful for engineering tolerances but may not translate to the kind of value-laden collective decisions coordination theory cares about.

Decision theory's boundary: the formal frameworks become progressively less useful as you move from risk through uncertainty to deep uncertainty. By the time you reach the conditions that characterise the hardest coordination challenges (unknown unknowns, irreversible consequences, reflexive dynamics where the decision changes the system being decided about), the formal apparatus has little to offer beyond the meta-insight that formal apparatus has little to offer. What remains is judgment, practical wisdom and the capacity to act under conditions where no algorithm can tell you what to do.

</details>

<details>
<summary>

### Mechanism Design and Rational Choice

</summary>

Mechanism design is sometimes called "reverse game theory." Instead of analysing a given game, the designer constructs the rules of a game to achieve a desired outcome, accounting for the strategic behaviour of the participants. It is the formal foundation for auction design, matching markets, voting systems and regulatory incentive structures.

Rational choice theory and public choice theory (Buchanan) underpin most institutional design: the assumption that actors are self-interested utility maximisers, and that institutions should be designed to harness or constrain that self-interest for collective benefit.

**Objectives can be specified in advance.** The designer knows what "success" looks like and builds a mechanism to achieve it. This breaks when the objectives themselves are contested (value incommensurability), when they shift as conditions change (adaptive challenges), or when specifying the objective requires the kind of collective deliberation the mechanism is supposed to enable (circular dependency).

**The designer stands outside the system.** The mechanism designer observes the actors, understands their incentives and constructs the rules. In real coordination, the designer is also a participant: shaped by the same cognitive biases, institutional pressures and cultural assumptions as everyone else. The "view from nowhere" that mechanism design implicitly assumes is a useful fiction at best.[^7]

**Self-interest as the universal motivator.** Rational choice theory assumes actors maximise their own utility. This is both useful (it predicts a great deal of behaviour accurately) and systematically wrong in ways that matter. People cooperate when the model says they shouldn't. They sacrifice for strangers. They honour commitments beyond their strategic value. They care about fairness, reciprocity and identity in ways that utility maximisation doesn't capture.[^8] Designing institutions exclusively for self-interested actors produces institutions that erode the pro-social motivations that already exist, potentially making coordination harder rather than easier.

**Incentive compatibility as the gold standard.** Mechanism design aims for "incentive compatibility": designing rules so that self-interested behaviour produces the desired collective outcome. This is elegant when it works (spectrum auctions, kidney exchange programmes). It fails when the "desired collective outcome" is itself what the actors disagree about, or when the mechanism's complexity exceeds the participants' capacity to understand it (which undermines the legitimacy the mechanism depends on).

Mechanism design's boundary: it extends game theory's reach from analysis to construction, but inherits and sometimes amplifies the same assumptions. Where objectives are clear, actors are strategic and the design space is well-understood, it produces remarkable results. Where objectives are contested, actors are complex and the system is reflexive, it produces mechanisms that look rigorous while quietly substituting a tractable problem for the actual one.

</details>

## Where the Boundary Falls

The assumptions across these traditions break at specific, identifiable points. Mapping these produces a diagnostic tool: given a coordination challenge, which assumptions hold and which don't? The answer determines whether formal modelling helps or misleads.

**Formal models work well when:**

The actors are few enough to model. The strategic structure is relatively stable. The payoffs are measurable or at least rankable. The game repeats often enough for learning. The consequences of getting it wrong are reversible. The possible outcomes are enumerable. And the actors' decision-making processes are approximately rational in the sense the model requires.

Bilateral trade negotiations. Standard auction design. Traffic flow optimisation. Spectrum allocation. Many forms of market regulation. Matching markets for kidneys, school places, medical residencies. These are domains where formal methods earn their keep, and they should be used.

**Formal models work partially when:**

Some assumptions hold and others don't. This is the most common real-world case and the most dangerous, because the model produces results that look rigorous but may be systematically biased by the violated assumptions.

International climate negotiations: the strategic structure is partially modelable (nations do respond to incentives) but the preference instability, the contested game structure and the value incommensurability dimensions mean that models capture part of the picture while missing dimensions that may be decisive. The 2008 financial crisis demonstrated this at catastrophic scale: risk models that worked under normal market conditions failed precisely when they mattered most, because the assumption of independent, normally distributed risks broke under systemic stress.[^9] Arrow's impossibility theorem tells us formally that any voting system embeds trade-offs, but the institutional design question of which trade-offs to accept requires judgment the theorem cannot supply.

The appropriate response in this zone is to use formal methods with explicit awareness of which assumptions are holding and which aren't, and to complement them with the forms of judgment and practical wisdom that operate where the models run out.

**Formal models mislead when:**

The game structure is itself contested. The values at stake are genuinely incommensurable. The actors include non-human agents with alien objective functions. The consequences are irreversible (no iteration possible). Deep uncertainty obtains (you cannot even enumerate the possible outcomes, let alone assign probabilities). The system is reflexive (the act of modelling it changes its behaviour). And the collective objectives that mechanism design requires as inputs are themselves what the coordination is supposed to produce.

These are precisely the conditions that characterise the coordination challenges this investigation cares about most. AI governance involves non-human actors whose objective functions may be opaque even to their creators. Climate adaptation involves irreversible tipping points and deep uncertainty about nonlinear dynamics. Biosecurity involves reflexive risks where publishing the threat model changes the threat landscape. And all of them involve genuine value incommensurability between actors who disagree about what "success" means.

In this zone, formal models actively mislead by producing precise-looking answers to problems they've quietly redefined into something tractable. The model's output looks like a solution. What it actually is, is an answer to a different and simpler question than the one you're facing.

## The Gap Between Procedure and Judgment

There is a lived experience of the formalism boundary that anyone who has operated in high-consequence environments recognises.

In nuclear reactor operations, formal procedures cover every anticipated scenario. They are detailed, precise and essential. An operator who improvises when the procedure applies is dangerous. But the procedures cannot cover every scenario, because the interactions between systems under abnormal conditions are complex enough that unanticipated situations will eventually arise. When they do, the operator's judgment is what stands between orderly response and catastrophe.

This is a feature of complex systems, not a deficiency in the procedures themselves. Formal models capture what can be anticipated. They cannot capture what emerges from the interaction of multiple systems under novel conditions. The gap between procedure and judgement is structural. It exists because the systems being managed are complex in the technical sense: their behaviour at the macro level cannot be deduced from the rules governing their components.[^10]

Hubert Dreyfus spent decades studying exactly this gap. His research on expert performance showed that experts in every domain, from chess grandmasters to intensive care nurses, operate by perceiving situations directly: recognising patterns, responding to context, acting from embodied understanding that cannot be fully articulated in propositional form.[^11] The expert doesn't reason to the right action. They see it. And what they see is shaped by years of situated experience that no formal model can encode.

This is the same complementarity between formal logic and logos-attunement that the [philosophical foundation](../01-core/04-philosophical-foundation.md) argues for, visible in operational practice. The procedure is formal logic: given these conditions, follow these steps. The judgment is something else: pattern recognition, situational awareness, the capacity to perceive when the procedure no longer fits the situation. Both are essential. Neither alone is adequate.

The Fukushima case demonstrates what happens when the gap is mismanaged. TEPCO's institutional culture prioritised procedural compliance over situated judgment. Information that contradicted the institutional narrative (their own modelling predicted the tsunami height) was filtered and suppressed as it moved through organisational channels. The formal systems worked exactly as designed. The judgment that would have corrected them was systematically disabled by the very institution the systems were meant to serve.[^12]

The lesson is that coordination under the conditions that matter most requires both formal procedure and situated judgment, and that institutional designs which suppress either one are fragile in exactly the moments when resilience matters most.

## What Fills the Gap

This question has an emerging answer, drawn from converging lines of research in cognitive science, embodied cognition, expert performance studies and practical philosophy.

**Pattern recognition that precedes formal inference.** Antonio Damasio's somatic marker hypothesis demonstrated that emotion is constitutive of rational decision-making, not opposed to it. People with damage to emotional processing centres make worse decisions, because they've lost the capacity for rapid pattern recognition that guides practical reasoning before conscious analysis begins.[^13] This is the capacity that experienced practitioners in every domain rely on: the feeling that something is wrong before you can articulate what, the sense that a situation is shifting before any metric confirms it.

**Situated knowledge that resists abstraction.** Michael Polanyi's concept of tacit knowledge, further developed by Dreyfus and others, identifies the dimension of expertise that cannot be made fully explicit.[^14] The experienced negotiator reads the room. The veteran nurse notices the patient deteriorating before the vital signs change. The submariner feels the boat responding differently before any instrument registers it. This knowledge is real, consequential and irreducible to the kind of propositional form that formal models require.

**The capacity to hold contradiction.** Formal logic requires consistency. Reality doesn't. The most demanding coordination challenges involve values that are genuinely in tension, information that is genuinely contradictory and situations where multiple incompatible framings are simultaneously valid. The capacity to hold these contradictions without either collapsing into incoherence or forcing premature resolution is precisely what Heraclitus' logos described and what formal logic structurally excludes.[^15]

**Relational intelligence.** Formal models treat actors as discrete agents with defined preference functions interacting through mechanisms. Actual coordination is embedded in relationships: trust built over time, commitments that carry weight beyond their strategic value, history that shapes what's possible. The substrate on which all durable coordination rests is relational, and it operates through dynamics that mechanism design cannot capture because the model framework treats them as external to the system.

These are dimensions of practical reason that sit alongside formal analysis. Whether they are strictly necessary complements to formal methods, or whether structural features of interdependence can do coordination work without leaning on them, is exactly what this investigation is trying to work out. Either way, the gap where they operate is where the hardest coordination challenges live.

## The Diagnostic Question

The practical contribution of this analysis is a question that should accompany every application of formal methods to coordination challenges:

Which assumptions does this model require? Which of those assumptions hold in this case? Where they don't hold, what am I missing, and what forms of judgment and practical wisdom need to operate alongside the model to compensate?

Formal methods remain essential where they work. The error is using them without knowing where they stop, and treating their outputs as answers when they are, at best, partial descriptions of a problem that extends beyond their reach.

The full picture the investigation has to work with combines three things: the taxonomy's strategic structures, the evidence of what works, and the formalism boundary mapped here. Any adequate coordination mechanism would need to work where formal models help and also where they don't. That dual requirement is the central design challenge, and it is what distinguishes this work from approaches that operate exclusively within the formal tradition.

---

## References

[^1]: Arrow, Kenneth J. *Social Choice and Individual Values* (New York: Wiley, 1951; 2nd ed. 1963).

[^2]: Sen, Amartya. 'The Impossibility of a Paretian Liberal.' *Journal of Political Economy*, Vol. 78, No. 1 (1970).

[^3]: Knight, Frank H. *Risk, Uncertainty and Profit* (Boston: Houghton Mifflin, 1921). The distinction between risk (calculable probability) and uncertainty (incalculable) remains foundational.

[^4]: Kahneman, Daniel and Tversky, Amos. 'Prospect Theory: An Analysis of Decision under Risk.' *Econometrica*, Vol. 47, No. 2 (1979).

[^5]: Lempert, Robert J. et al. *Shaping the Next One Hundred Years: New Methods for Quantitative, Long-Term Policy Analysis* (Santa Monica: RAND, 2003).

[^6]: Ben-Haim, Yakov. *Info-Gap Decision Theory: Decisions Under Severe Uncertainty* (London: Academic Press, 2nd ed. 2006).

[^7]: Nagel, Thomas. *The View from Nowhere* (Oxford: Oxford University Press, 1986).

[^8]: For evidence that self-interest fails as a universal model of human motivation in interactive contexts, see Colman, Andrew M. 'Cooperation, Psychological Game Theory, and Limitations of Rationality in Social Interaction.' *Behavioral and Brain Sciences*, Vol. 26, No. 2 (2003).

[^9]: For analysis of model failure in the financial crisis, see the Financial Crisis Inquiry Commission Report (2011). See also Taleb, Nassim Nicholas. *The Black Swan: The Impact of the Highly Improbable* (New York: Random House, 2007), particularly on the misapplication of Gaussian models to fat-tailed distributions.

[^10]: For the distinction between complex and merely complicated systems, see Mitchell, Melanie. *Complexity: A Guided Tour* (Oxford: Oxford University Press, 2009). See also Holland, John H. *Complexity: A Very Short Introduction* (Oxford: Oxford University Press, 2014).

[^11]: Dreyfus, Hubert L. and Dreyfus, Stuart E. *Mind over Machine: The Power of Human Intuition and Expertise in the Era of the Computer* (New York: Free Press, 1986). The five-stage model of skill acquisition (novice to expert) demonstrates that expert performance transcends rule-following.

[^12]: Kurokawa, Kiyoshi et al. *The Official Report of the Fukushima Nuclear Accident Independent Investigation Commission* (The National Diet of Japan, 2012).

[^13]: Damasio, Antonio. *Descartes' Error: Emotion, Reason, and the Human Brain* (New York: Penguin, 1994).

[^14]: Polanyi, Michael. *The Tacit Dimension* (Chicago: University of Chicago Press, 1966). Polanyi's formulation: "We can know more than we can tell."

[^15]: For the argument tracing the progressive narrowing of logos to formal logic and its implications for practical reason, see Norton, Samuel K. 'On Logos: And the Need to Redefine Logic as the Way of the Universe' (2024/2025), available in the [working papers](../../3-project/working-papers/).
