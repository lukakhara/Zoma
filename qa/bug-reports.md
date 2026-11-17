# Zoma Bug Reports

Build/commit: `be0e88224cd3a7c8b9158d3dfe9c0e323c824ae1`
Date found: 2026-11-16
Environment: Local (`localhost:3000`), Firefox 160.0, Windows 11

| ID      | Title                                                                                  | Test case | Severity | Priority | Status |
| ------- | -------------------------------------------------------------------------------------- | --------- | -------- | -------- | ------ |
| BUG-001 | Order can be created after removing the cart item during checkout                      | TC-010    | High     | High     | Open   |
| BUG-002 | "Price without discount" does not update when quantity changes on product details page | TC-009    | Low      | Low      | Open   |

---

## BUG-001: Order can be created after removing the cart item during checkout

**Severity:** High
**Priority:** High
**Status:** Open
**Related test case:** TC-010
**Found in build:** `be0e88224cd3a7c8b9158d3dfe9c0e323c824ae1`

### Description

After clicking Buy Now in the cart, the checkout form opens. If the cart item is then removed, the checkout form stays active and the user can still complete the payment flow. An empty order (without items) is created and appears in My Orders.

### Preconditions

- User is logged in.
- Product A ("ZOMA BAFIX FOAM (500 ml)") is available.
- Cart is empty.

### Steps to reproduce

1. Open the product details page of Product A.
2. Click Add to Cart.
3. Open the cart page.
4. Click the Buy Now button (checkout form opens).
5. Remove Product A from the cart.
6. Select payment method "TBC Bank".
7. Agree to the terms and conditions.
8. Click the Pay button.

### Expected result

- Checkout form is closed or disabled.
- Buy Now button is disabled.
- Creating an order is not possible.
- No new order appears in My Orders.

### Actual result

- Checkout form stays active.
- Payment method can be selected, terms can be accepted, and an order can be created.
- An empty order (without items) is created and is visible in My Orders.

### Impact

Users can create empty orders. This pollutes order data and may cause wrong order records or payment problems.

### Suggested fix (optional)

- Close the checkout form when the cart becomes empty.
- Validate on the backend that the cart is not empty before creating an order.

### Attachments

- (add screenshot of the active checkout form with an empty cart)
- (add screenshot of the empty order in My Orders)

---

## BUG-002: "Price without discount" does not update when quantity changes on product details page

**Severity:** Low
**Priority:** Low
**Status:** Open
**Related test case:** TC-009
**Found in build:** `be0e88224cd3a7c8b9158d3dfe9c0e323c824ae1`

### Description

On the product details page, when the quantity is changed from 1 to 3, the "Price without discount" value stays at the unit price (9.78 ₾). The discount and the total to pay update correctly.

### Preconditions

- Product A ("ZOMA BAFIX FOAM (500 ml)") is available.

### Steps to reproduce

1. On the Products page, click the Buy Now button on Product A to open its details page.
2. Change the quantity from 1 to 3.

### Expected result

- Price without discount: 29.34 ₾
- Discount: -3.51 ₾
- Total to pay: 25.83 ₾

### Actual result

- Price without discount: 9.78 ₾
- Discount: -3.51 ₾
- Total to pay: 25.83 ₾

### Impact

Only the displayed "Price without discount" is wrong. The total to pay is correct. The numbers on the page do not add up, which can confuse users.

### Attachments

- (add screenshot of the details page with quantity 3)
