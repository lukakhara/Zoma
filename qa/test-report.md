# Zoma Test Report

| Field             | Value                                               |
| ----------------- | --------------------------------------------------- |
| Project           | Zoma (cleaning products e-commerce)                 |
| Tester            | Luka Kharaishvili                                   |
| Date              | 2026-11-16                                          |
| Build/commit      | `be0e88224cd3a7c8b9158d3dfe9c0e323c824ae1`          |
| Environment       | Local (`localhost:3000`), Firefox 160.0, Windows 11 |
| Payment           | TBC Bank, test mode                                 |
| Related documents | `test-plan.md`, `test-cases.md`, `bug-reports.md`   |

---

## 1. Summary

The core shopping flow (cart, price calculation, checkout and order history) mostly works. 10 test cases were executed: 8 passed and 2 failed. One failure is a high-severity defect: an empty order can be created after the cart item is removed during checkout.

**Recommendation: do not release until BUG-001 is fixed and retested.**

## 2. Results

| Metric       | Count |
| ------------ | ----- |
| Planned      | 10    |
| Executed     | 10    |
| Passed       | 8     |
| Failed       | 2     |
| Blocked      | 0     |
| Not executed | 0     |
| Pass rate    | 80%   |

## 3. Results by test case

| ID     | Title                                     | Status | Defect  |
| ------ | ----------------------------------------- | ------ | ------- |
| TC-001 | Add product from product details page     | PASS   |         |
| TC-002 | Add product from product listing page     | PASS   |         |
| TC-003 | Add the same product from both pages      | PASS   |         |
| TC-004 | Product filtering                         | PASS   |         |
| TC-005 | Delete product from cart                  | PASS   |         |
| TC-006 | Buy Now disabled when cart is empty       | PASS   |         |
| TC-007 | Cart price calculations                   | PASS   |         |
| TC-008 | Order appears in My Orders                | PASS   |         |
| TC-009 | Changing quantity on product details page | FAIL   | BUG-002 |
| TC-010 | Removing cart item after clicking Buy Now | FAIL   | BUG-001 |

## 4. Results by area

| Area                              | Tests                      | Passed | Failed |
| --------------------------------- | -------------------------- | ------ | ------ |
| Cart (add, remove, Buy Now state) | TC-001, 002, 003, 005, 006 | 5      | 0      |
| Listing (filtering)               | TC-004                     | 1      | 0      |
| Pricing                           | TC-007, 009                | 1      | 1      |
| Checkout and orders               | TC-008, 010                | 1      | 1      |

## 5. Defects

| ID      | Title                                                                                  | Severity | Priority | Status |
| ------- | -------------------------------------------------------------------------------------- | -------- | -------- | ------ |
| BUG-001 | Order can be created after removing the cart item during checkout                      | High     | High     | Open   |
| BUG-002 | "Price without discount" does not update when quantity changes on product details page | Low      | Low      | Open   |

- **BUG-001:** after clicking Buy Now and removing the item, the checkout form stays active. The user can pay and an empty order appears in My Orders.
- **BUG-002:** on the product details page, "Price without discount" stays at 9.78 ₾ when quantity is 3 (expected 29.34 ₾). Discount and total are correct.

Details and steps: `bug-reports.md`.

## 6. Exit criteria check

| Criterion                                     | Met?                           |
| --------------------------------------------- | ------------------------------ |
| All planned test cases executed               | Yes                            |
| 100% of high-priority tests pass              | No (TC-010 failed)             |
| No open High or Critical defects              | No (BUG-001 open)              |
| Low-priority failures documented and accepted | Documented, acceptance pending |

**Result: exit criteria not met.**

## 7. Not tested

- Quantity 0, negative, or above stock
- Pay without accepting terms and conditions
- Cart persistence after refresh and after logout/login
- Out-of-stock product
- Checkout while logged out
- Cart with two different products
- Product without a discount
- Browsers other than Firefox, mobile devices
- Real payment (test mode only)

## 8. Risks and limitations

- Only one browser and one environment were tested.
- Payment was tested in test mode only.
- Testing was manual, so regressions need to be rechecked by hand after each fix.
- Product prices in the expected results depend on the current test data.

## 9. Next steps

1. Fix BUG-001, then retest TC-010 and re-run TC-001 to TC-008.
2. Fix BUG-002, then retest TC-009.
3. Add the extra test cases listed in section 7.
4. Run the tests again on the new build and update this report with the new commit and date.
