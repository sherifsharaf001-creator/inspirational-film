# IFRS 9 — Financial Instruments (with IAS 32 and IFRS 7)

## Where each standard sits
- **IAS 32** — presentation: is the instrument a financial **liability** or
  **equity** for the issuer? Offsetting.
- **IFRS 9** — recognition, classification, measurement, impairment (ECL), and
  hedge accounting.
- **IFRS 7** — disclosures (risk exposures, fair value hierarchy, ECL).

## Liability vs. equity (IAS 32) — issuer side
Classify on **substance**, not legal form. An instrument is a financial liability
if the issuer has a contractual obligation to deliver cash/another financial
asset or to exchange on potentially unfavourable terms, or it will/may be settled
in a variable number of the entity's own shares. It is equity only if there is no
such obligation and any settlement in own shares is a **fixed-for-fixed** exchange.
- Redeemable preference shares with a mandatory dividend → liability.
- Compound instruments (e.g., convertible bonds) → split: measure the liability
  component first (PV of cash flows at the market rate for a similar
  non-convertible instrument), residual is equity. The split is fixed at issue.

## Classification & measurement of financial assets
Driven by two tests:
1. **Business model** for managing the assets — hold-to-collect; hold-to-collect-
   and-sell; or other (trading).
2. **SPPI** — are contractual cash flows solely payments of principal and
   interest on the principal outstanding? Features like equity conversion,
   leverage, or non-recourse to specified assets can fail SPPI.

| Business model | SPPI passed? | Classification | Measurement |
|----------------|--------------|----------------|-------------|
| Hold-to-collect | Yes | Amortized cost | Effective interest; ECL |
| Hold-to-collect-and-sell | Yes | FVOCI (debt) | FV via OCI; recycle on disposal; ECL in P&L |
| Other / fails SPPI | — | FVTPL | Fair value through P&L |

Equity investments default to **FVTPL**; irrevocable election available at
inception to present fair value changes in **OCI (no recycling)** for non-held-
for-trading equities. Financial **liabilities** are at amortized cost unless held
for trading or FVTPL-designated (for own-credit changes on FVTPL liabilities,
present in OCI).

## Expected credit losses (ECL)
Forward-looking impairment on debt instruments at amortized cost/FVOCI, lease
receivables, contract assets, and loan commitments/guarantees. **Three stages:**
- **Stage 1** (no significant increase in credit risk since initial recognition):
  12-month ECL; interest on gross carrying amount.
- **Stage 2** (significant increase in credit risk, not yet credit-impaired):
  lifetime ECL; interest on gross.
- **Stage 3** (credit-impaired): lifetime ECL; interest on **net** (amortized
  cost) carrying amount.

**Simplified approach** (always lifetime ECL, no staging) is required for trade
receivables and contract assets without a significant financing component, and
elective for those with one and for lease receivables — commonly implemented via
a **provision matrix**. ECL = probability-weighted, discounted estimate reflecting
reasonable and supportable forward-looking information.

## Hedge accounting (optional)
Aligns accounting with risk management. Types: fair value hedge (remeasure hedged
item for the hedged risk through P&L), cash flow hedge (effective portion to OCI,
recycled when the hedged item hits P&L), net investment hedge. Requires formal
designation and documentation, an economic relationship, credit risk not
dominating, and an appropriate hedge ratio. No bright-line 80–125% test — assess
effectiveness qualitatively/quantitatively and rebalance rather than
automatically discontinue.

## Derecognition
Derecognize a financial asset when the contractual rights to cash flows expire,
or the asset is transferred and substantially all **risks and rewards** pass (if
mixed, apply the control/continuing-involvement test). Financial liabilities are
derecognized when extinguished; a substantial modification (≥10% change in PV of
cash flows, or qualitatively substantial) is treated as extinguishment of the old
and recognition of a new liability with a P&L gain/loss.

## Illustrative entry — trade receivables ECL (provision matrix)
Receivables 1,000,000; matrix implies lifetime ECL of 2%.
```
Impairment loss (P&L)         20,000
  Loss allowance                     20,000
```
Present receivables net of the allowance; disclose the matrix and assumptions.
