# Trust + Conversion Implementation Plan

## Goal
Increase signature conversion and sharing by improving credibility, transparency, translation quality, and first-screen clarity.

## Success Metrics
- +40% increase in click-through rate to Change.org within 30 days.
- +25% increase in share action completion rate.
- Reduce bounce rate from hero by at least 20%.
- Zero mixed-language or inline untranslated UI strings in audited sections.

## Milestones

### M1: Trust Foundation (Week 1)
Scope:
- Add explicit transparency section near top of page.
- Remove misleading real-time language for signature counter.
- Improve legal notice wording that currently undermines legitimacy.
- Remove hardcoded language leaks from key trust-related UI.

Definition of done:
- Transparency block visible above key persuasion sections.
- Signature counter language accurately describes update model.
- Imprint/legal notice copy no longer signals "unfinished" ownership details.

### M2: Conversion UX Simplification (Week 2)
Scope:
- Reduce hero cognitive load (autoplay behavior and CTA prominence).
- Prioritize one primary above-the-fold action path.
- Clarify outbound trust handoff to Change.org near each CTA.

Definition of done:
- Hero no longer competes with CTA during first 10 seconds.
- Primary CTA visually dominant and repeated with consistent microcopy.

### M3: Localization + Editorial Integrity (Week 3)
Scope:
- Human review and rewrite of high-risk translated messaging.
- Replace machine-like terms and awkward phrasing in all locales.
- Add visible source/editorial methodology language.

Definition of done:
- All trust-critical copy is high quality across locales.
- No untranslated or mixed-language trust/political labels.

### M4: Measurement + Iteration (Week 4)
Scope:
- Add analytics for funnel behavior.
- Instrument CTA, share, language, and scroll-depth events.
- Run first A/B test on hero headline + CTA microcopy.

Definition of done:
- Dashboard events available and validated.
- First experiment results documented.

## Issue Backlog

### P0 (Immediate)
1. Add trust/transparency section near top of funnel.
2. Switch trust UI strings to i18n-only and remove inline copy.
3. Fix hardcoded mixed-language leaks in trust-related components.
4. Replace "real-time" signature messaging with accurate snapshot wording.
5. Update imprint wording to avoid scam-like uncertainty.

### P1 (High)
6. Refactor hero autoplay behavior for conversion-first flow.
7. Add "why Change.org" trust microcopy next to CTA buttons.
8. Add source policy and methodology link language in UI.
9. Normalize archive-link labeling and rationale.

### P2 (Important)
10. Human QA and rewrite of locale variants with awkward machine translation.
11. Add QA checks for missing locale keys in CI.
12. Create content governance rules for sensitive terms.

### P3 (Iteration)
13. Add analytics event taxonomy and dashboard.
14. Run A/B test: hero headline and CTA variants.
15. Add supporter proof elements (timestamp, social proof quality indicators).

## Rollout Sequence
1. Ship M1 changes to production.
2. Monitor conversion and bounce for 72 hours.
3. Start M2 adjustments with lightweight A/B split.
4. Complete M3 language and policy work.
5. Enable M4 instrumentation and optimize continuously.

## Risks
- Strong messaging changes can reduce mobilization among core supporters if toned down too far.
- Automation-only translation updates can reintroduce trust issues.
- Source mix changes may be interpreted as editorial repositioning.

## Mitigations
- Keep value framing strong while reducing alarmist UX patterns.
- Gate locale updates behind native speaker review for trust-critical strings.
- Publish transparent source criteria and correction policy.
