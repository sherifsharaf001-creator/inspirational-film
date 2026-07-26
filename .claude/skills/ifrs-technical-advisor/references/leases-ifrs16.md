# IFRS 16 — Leases

## Is there a lease? (scope / identification)
A contract is, or contains, a lease if it conveys the **right to control the use
of an identified asset** for a period in exchange for consideration. Two tests:
- **Identified asset** — explicitly or implicitly specified, and the supplier has
  no substantive right to substitute it.
- **Right to control use** — the customer gets substantially all the economic
  benefits from use **and** directs how and for what purpose the asset is used.

If the supplier controls how the asset is used, it's a service, not a lease.
Separate lease from non-lease components and allocate consideration on relative
standalone prices (lessees may elect, by asset class, not to separate).

## Lessee accounting (single model)
At commencement recognize a **right-of-use (ROU) asset** and a **lease
liability** — no operating/finance distinction for lessees.

- **Lease liability** = present value of unpaid lease payments, discounted at the
  rate implicit in the lease if determinable, else the lessee's **incremental
  borrowing rate**. Payments included: fixed (and in-substance fixed), variable
  payments tied to an index/rate (at the initial index), residual value
  guarantees expected to be payable, purchase-option price if reasonably certain
  to exercise, and termination penalties if the term reflects termination.
  Variable payments based on usage/sales are **excluded** and expensed as
  incurred.
- **ROU asset** = initial liability + payments made at/before commencement −
  incentives received + initial direct costs + estimated dismantling/restoration
  costs.
- **Subsequently:** unwind the liability at the discount rate (interest expense)
  and reduce it by payments; depreciate the ROU asset (usually straight-line over
  the shorter of lease term and useful life — over useful life if ownership
  transfers). Result is a **front-loaded** total expense (interest higher early).
- **Remeasure** the liability for changes in term, purchase-option assessment,
  index/rate resets, or residual guarantee changes — adjust the ROU asset (or
  P&L once the ROU asset is nil).

**Recognition exemptions** (elective): short-term leases (≤12 months, no purchase
option) and leases of low-value underlying assets (assessed new, ~USD 5,000
order of magnitude). Expense straight-line.

**Lease term** = non-cancellable period + optional renewal periods the lessee is
**reasonably certain** to exercise + periods covered by a termination option the
lessee is reasonably certain **not** to exercise. This judgment often drives the
whole answer — surface it.

## Lessor accounting (classification retained)
Lessors still classify each lease:
- **Finance lease** — transfers substantially all risks and rewards incidental to
  ownership (indicators: ownership transfers, bargain purchase option, term is
  major part of economic life, PV of payments ≈ substantially all fair value,
  specialized asset). Derecognize the asset, recognize a **net investment in the
  lease** (receivable), and recognize finance income at a constant periodic rate.
- **Operating lease** — everything else. Keep the asset on balance sheet,
  recognize lease income straight-line.

## Special situations
- **Sale and leaseback:** apply IFRS 15 to decide if a sale occurred. If yes, the
  seller-lessee recognizes a ROU asset for the retained right of use and only the
  gain relating to rights **transferred** to the buyer-lessor. If the "sale"
  fails IFRS 15 control transfer, it's a financing — no derecognition, recognize a
  financial liability.
- **Subleases:** the intermediate lessor classifies the sublease by reference to
  the **ROU asset** arising from the head lease, not the underlying asset.
- **Modifications:** a separate lease if scope increases and price rises by the
  standalone amount; otherwise remeasure.

## Presentation & disclosure
Lessee: ROU assets (separately or noted), lease liabilities (split
current/non-current), depreciation and interest split in P&L, and total cash
outflow for leases. Disclose maturity analysis and the amounts, judgments, and
practical expedients used.

## Illustrative entry — lessee at commencement
5-year lease, 10,000/yr in arrears, IBR 6%. PV ≈ 42,124.
```
Right-of-use asset            42,124
  Lease liability                    42,124
```
Year 1: interest `42,124 × 6% = 2,527`; payment 10,000.
```
Interest expense               2,527
Lease liability                7,473
  Cash                              10,000
Depreciation expense           8,425      (42,124 / 5)
  Accumulated depreciation           8,425
```
