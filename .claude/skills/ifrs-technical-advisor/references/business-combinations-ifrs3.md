# IFRS 3 — Business Combinations (with IFRS 10 control)

## First question: is it a business?
IFRS 3 applies only to the acquisition of a **business** — an integrated set of
activities and assets capable of being conducted to provide a return, requiring
at minimum an **input** and a **substantive process**. Use the **optional
concentration test**: if substantially all the fair value of the gross assets
acquired is concentrated in a single asset (or group of similar assets), it's
**not** a business → account for as an **asset acquisition** (allocate cost on
relative fair values, no goodwill, no separate acquisition-cost expensing). This
distinction changes everything downstream, so resolve it first.

## Control (IFRS 10) — who consolidates
An investor controls an investee when it has (1) **power** over the relevant
activities, (2) **exposure to variable returns**, and (3) the **ability to use
power to affect those returns**. Control, not just a >50% share count, drives
consolidation — consider potential voting rights, de facto control, and
principal-vs-agent for asset managers.

## The acquisition method
Applied at the **acquisition date** (when control is obtained):

1. **Identify the acquirer** — the party that obtains control (in a reverse
   acquisition, the legal subsidiary is the accounting acquirer).
2. **Measure the consideration transferred** at fair value — cash, assets, equity
   issued, and **contingent consideration** at fair value. Contingent
   consideration classified as a liability is remeasured through **P&L**;
   classified as equity, it is **not** remeasured.
3. **Recognize and measure identifiable assets acquired and liabilities assumed**
   at **fair value** at the acquisition date, including intangibles not previously
   recognized by the acquiree (customer relationships, brands, technology, order
   backlog) if they meet the separability or contractual-legal criterion.
   Exceptions to the fair-value rule include deferred tax (IAS 12), employee
   benefits (IAS 19), indemnification assets, reacquired rights, share-based
   payment (IFRS 2), and assets held for sale (IFRS 5).
4. **Measure non-controlling interest (NCI)** — choice per transaction: at fair
   value ("full goodwill") or at NCI's proportionate share of identifiable net
   assets ("partial goodwill").
5. **Recognize goodwill** (or a bargain-purchase gain):

```
Goodwill = Consideration transferred
         + NCI (measured per policy choice)
         + fair value of any previously held equity interest (remeasured to FV
           through P&L at the acquisition date)
         − fair value of identifiable net assets acquired
```
If the result is **negative**, first reassess whether everything was identified
and measured correctly; if it truly is a bargain purchase, recognize the gain in
**P&L**.

## After the acquisition
- **Measurement period** (max 12 months): retrospectively adjust provisional
  amounts for facts existing at the acquisition date; new events go to P&L.
- **Acquisition-related costs** (advisory, legal, due diligence) are **expensed**
  as incurred — they are not part of consideration. Debt/equity issue costs
  follow IFRS 9 / IAS 32.
- **Goodwill** is not amortized; test for impairment at least annually under IAS
  36 (see `impairment-ias36.md`).
- **Step acquisitions:** on obtaining control, remeasure the previously held
  interest to fair value through P&L. Changes in ownership **without** losing
  control are equity transactions (no goodwill, no gain/loss). **Losing control**
  → derecognize assets/liabilities/NCI, recognize any retained interest at fair
  value, and take the gain/loss to P&L.

## Disclosure
Name and description of the acquiree, acquisition date, consideration by class,
fair values of major asset/liability classes, goodwill and the factors making it
up, NCI measurement basis, contingent consideration terms, acquisition-related
costs, and revenue/profit of the acquiree since acquisition (and pro forma as if
acquired at the start of the period).
