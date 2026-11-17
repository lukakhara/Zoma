# Zoma Test Plan

| Field      | Value                               |
| ---------- | ----------------------------------- |
| Project    | Zoma (cleaning products e-commerce) |
| Author     | Luka Kharaishvili                   |
| Version    | 1.0                                 |
| Date       | 2026-11-16                          |
| Test cases | `test-cases.md` (TC-001 to TC-010)  |

---

## 1. Objective

Verify that the core shopping flow of Zoma works correctly: browsing products, managing the cart, price calculation, checkout and order history. Find defects before release and record them with clear steps, severity and priority.

## 2. Scope

### In scope

- Product listing: category filtering
- Product details page: add to cart, quantity change, price display
- Cart: add, remove, quantity change, price calculation (price without discount, discount, total to pay)
- Cart state: cart icon counter, Buy Now button enabled/disabled
- Checkout: payment method selection, terms agreement, payment (test mode)
- My Orders: order appears with correct data

### Out of scope (for this cycle)

- Performance and load testing
- Security testing
- Real payment processing (only test/sandbox mode)
- Mobile devices and Safari/Chrome/Edge (Firefox only for now)
- Admin panel

## 3. Test approach

- Type: manual functional testing, black box
- Levels: UI testing against the running app (frontend + backend + database)
- Techniques: happy-path flows, negative cases, boundary values, state transitions (empty cart, removal mid-checkout)
- Each test case has: preconditions, steps, expected result, actual result, status
- Failed tests also get severity and priority

## 4. Test environment

| Item         | Value                                      |
| ------------ | ------------------------------------------ |
| Environment  | Local (`localhost:3000`)                   |
| Browser      | Firefox 160.0                              |
| OS           | Windows 11                                 |
| Build/commit | `be0e88224cd3a7c8b9158d3dfe9c0e323c824ae1` |
| Payment      | TBC Bank, test mode                        |

## 5. Test data

- User: `luka@dev.com` (test account, password stored locally, not in this file)
- Product A: "ZOMA BAFIX FOAM (500 ml)" (ID 12), price before discount 9.78 ₾, discount -1.17 ₾, price with discount 8.61 ₾, in stock
- Product B: "ZOMA GLASS CLEANER" (ID 15), price before discount 7.50 ₾, discount -0.75 ₾, price with discount 6.75 ₾, in stock

Keep this list in sync with the database seed. If prices change, update the expected results.

## 6. Test cases overview

| ID     | Title                                     | Area              | Status |
| ------ | ----------------------------------------- | ----------------- | ------ |
| TC-001 | Add product from product details page     | Cart              | PASS   |
| TC-002 | Add product from product listing page     | Cart              | PASS   |
| TC-003 | Add the same product from both pages      | Cart              | PASS   |
| TC-004 | Product filtering                         | Listing           | PASS   |
| TC-005 | Delete product from cart                  | Cart              | PASS   |
| TC-006 | Buy Now disabled when cart is empty       | Cart              | PASS   |
| TC-007 | Cart price calculations                   | Pricing           | PASS   |
| TC-008 | Order appears in My Orders                | Checkout / Orders | PASS   |
| TC-009 | Changing quantity on product details page | Pricing           | FAIL   |
| TC-010 | Removing cart item after clicking Buy Now | Checkout          | FAIL   |

## 7. Entry and exit criteria

### Entry criteria

- Build is deployed and runs locally
- Test data exists in the database
- Test account can log in
- Test payment mode works

### Exit criteria

- All planned test cases are executed
- 100% of high-priority tests pass
- No open defects with severity High or Critical
- Failed low-priority defects are documented and accepted by the team

## 8. Defect classification

| Severity | Meaning                                           | Example                                          |
| -------- | ------------------------------------------------- | ------------------------------------------------ |
| High     | Breaks a core flow or corrupts data               | TC-010: empty order can be created               |
| Medium   | Feature works but gives wrong or confusing result | Wrong total shown to user                        |
| Low      | Cosmetic or minor display issue                   | TC-009: "Price without discount" does not update |

Priority (High / Medium / Low) says how soon the defect should be fixed.

## 9. Current results (run 2026-11-16)

- Executed: 10 / 10
- Passed: 8
- Failed: 2

| Defect  | Test   | Severity | Priority | Summary                                                                                    |
| ------- | ------ | -------- | -------- | ------------------------------------------------------------------------------------------ |
| BUG-001 | TC-010 | High     | High     | After removing the item, checkout form stays active and an empty order is created          |
| BUG-002 | TC-009 | Low      | Low      | "Price without discount" does not update when quantity changes on the product details page |

## 10. Planned additional coverage

- Quantity 0, negative, or above stock
- Pay without accepting terms and conditions
- Cart persistence after page refresh and after logout/login
- Adding an out-of-stock product
- Checkout while logged out
- Cart with two different products (total is the sum)
- Product without a discount
- Retest of TC-009 and TC-010 after fixes

## 11. Risks

| Risk                              | Impact                        | Mitigation                                    |
| --------------------------------- | ----------------------------- | --------------------------------------------- |
| Test data changes in the database | Expected results become wrong | Keep test data list updated, use seed file    |
| Only one browser tested           | Browser-specific bugs missed  | Add Chrome run later                          |
| Payment tested in sandbox only    | Real payment issues missed    | Confirm with TBC test environment docs        |
| Manual testing only               | Regressions are slow to catch | Automate stable cases later (e.g. Playwright) |

## 12. Deliverables

- `test-plan.md` (this file)
- `test-cases.md` with executed results
- Bug reports for all failed tests
- Test run summary (passed / failed counts, build, date)

## 13. Retest and regression

- After each fix, retest the failed case and re-run the related cases (cart and checkout cases TC-001 to TC-008)
- Record the new build/commit and date for every run
