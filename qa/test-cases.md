# Zoma Test Run

Build/commit: be0e88224cd3a7c8b9158d3dfe9c0e323c824ae1
Date: 2026-11-16
Environment: Local (localhost:3000), Firefox 160.0, Windows 11
Result: 8 passed, 2 failed (TC-009, TC-010)

Test data:

- User: luka@dev.com / 123
- Product A: "ZOMA BAFIX FOAM (500 ml)" (ID 12), price before discount 9.78 ₾, discount -1.17 ₾, price with discount 8.61 ₾, in stock
- Product B: "ZOMA GLASS CLEANER" (ID 15), price before discount 7.50 ₾, discount -0.75 ₾, price with discount 6.75 ₾, in stock

---

## TC-001: Add product from product details page

Preconditions:

- Cart is empty.
- Product A is available.

Steps:

1. Open the product details page of Product A.
2. Click Add to Cart.
3. Open the shopping cart.

Expected result:

- Product appears in the cart.
- Name: ZOMA BAFIX FOAM (500 ml)
- Quantity: 1
- Price before discount: 9.78 ₾
- Discount: -1.17 ₾
- Price with discount: 8.61 ₾

Actual result:

- Product appears in the cart.
- Name: ZOMA BAFIX FOAM (500 ml)
- Quantity: 1
- Price before discount: 9.78 ₾
- Discount: -1.17 ₾
- Price with discount: 8.61 ₾

Status: PASS

---

## TC-002: Add product from product listing page

Preconditions:

- Cart is empty.
- Product B is available.

Steps:

1. Open the product listing page.
2. Click Add to Cart on Product B.
3. Open the shopping cart.

Expected result:

- Cart icon (top right of the products page) changes from 0 to 1.
- Product B appears in the cart.
- Name: ZOMA GLASS CLEANER
- Quantity: 1
- Price before discount: 7.50 ₾
- Discount: -0.75 ₾
- Price with discount: 6.75 ₾

Actual result:

- Cart icon (top right of the products page) changes from 0 to 1.
- Product B appears in the cart.
- Name: ZOMA GLASS CLEANER
- Quantity: 1
- Price before discount: 7.50 ₾
- Discount: -0.75 ₾
- Price with discount: 6.75 ₾

Status: PASS

---

## TC-003: Add the same product from both pages (product listing and product details)

Preconditions:

- Cart is empty.
- Product A is available.

Steps:

1. Open the product details page of Product A.
2. Click Add to Cart.
3. Return to the product listing page.
4. Click Add to Cart on Product A.
5. Open the shopping cart.

Expected result:

- Cart icon shows 2.
- Cart has ONE line item for Product A with quantity 2.
- Price without discount: 19.56 ₾
- Discount: -2.34 ₾
- Total to pay: 17.22 ₾

Actual result:

- Cart icon shows 2.
- Cart has ONE line item for Product A with quantity 2.
- Price without discount: 19.56 ₾
- Discount: -2.34 ₾
- Total to pay: 17.22 ₾

Status: PASS

---

## TC-004: Product filtering

Preconditions:

- User is on the products page.
- All products are displayed.

Steps:

1. Click the category "<category name>".
2. Click the same category again.

Expected result:

- Only the <N> products of "<category name>" are displayed; products from other categories are hidden.
- After the second click, filtering is disabled and all products are displayed.

Actual result:

- Only the <N> products of "<category name>" are displayed; products from other categories are hidden.
- After the second click, filtering is disabled and all products are displayed.

Status: PASS

---

## TC-005: Delete product from cart

Preconditions:

- Cart contains only Product A.

Steps:

1. Open the cart page.
2. Click the delete icon on Product A.

Expected result:

- Product A is removed from the cart.
- Total price: 0.00 ₾
- Total discount: 0.00 ₾
- Total price to pay: 0.00 ₾
- Buy Now button is disabled.

Actual result:

- Product A is removed from the cart.
- Total price: 0.00 ₾
- Total discount: 0.00 ₾
- Total price to pay: 0.00 ₾
- Buy Now button is disabled.

Status: PASS

---

## TC-006: Buy Now button is disabled when cart is empty

Preconditions:

- Cart is empty.

Steps:

1. Open the cart page.
2. Click the Buy Now button.

Expected result:

- Buy Now button is disabled.
- Nothing happens on click.

Actual result:

- Buy Now button is disabled.
- Nothing happens on click.

Status: PASS

---

## TC-007: Cart price calculations

Preconditions:

- Cart is empty.
- Product A is available.

Steps:

1. Add Product A to the cart (price before discount 9.78 ₾, price with discount 8.61 ₾), quantity 1.
2. In the cart, change the quantity from 1 to 3.

Expected result:

- Price without discount: 29.34 ₾
- Discount: -3.51 ₾
- Total to pay: 25.83 ₾

Actual result:

- Price without discount: 29.34 ₾
- Discount: -3.51 ₾
- Total to pay: 25.83 ₾

Status: PASS

---

## TC-008: Order appears in My Orders

Preconditions:

- User is logged in.
- Product A is available.
- Cart contains only Product A, quantity 1.

Steps:

1. Click the Buy Now button in the cart.
2. Select payment method "TBC Bank".
3. Agree to the terms and conditions.
4. Click the Pay button.
5. Click the My Orders button.

Expected result:

- "Transaction Successful" page with an order number is displayed.
- A new order appears in My Orders with:
  - Date: 16 November 2026
  - Quantity: 1
  - Product: ZOMA BAFIX FOAM (500 ml)
  - Price without discount: 9.78 ₾
  - Price with discount: 8.61 ₾
  - Total: 8.61 ₾

Actual result:

- "Transaction Successful" page with an order number is displayed.
- A new order appears in My Orders with:
  - Date: 16 November 2026
  - Quantity: 1
  - Product: ZOMA BAFIX FOAM (500 ml)
  - Price without discount: 9.78 ₾
  - Price with discount: 8.61 ₾
  - Total: 8.61 ₾

Status: PASS

---

## TC-009: Changing product quantity on the product details page

Preconditions:

- Product A is available.

Steps:

1. On the Products page, click the Buy Now button on Product A to open its details page.
2. Change the quantity from 1 to 3.

Expected result:

- Price without discount: 29.34 ₾
- Discount: -3.51 ₾
- Total to pay: 25.83 ₾

Actual result:

- Price without discount: 9.78 ₾
- Discount: -3.51 ₾
- Total to pay: 25.83 ₾

Note: Price without discount does not update when quantity changes on the product details page.

Status: FAIL
Severity: Low
Priority: Low

---

## TC-010: Removing cart item after clicking Buy Now

Preconditions:

- User is logged in.
- Product A is available.
- Cart is empty.

Steps:

1. Open the product details page of Product A.
2. Click Add to Cart.
3. Open the cart page.
4. Click the Buy Now button (checkout form opens).
5. Remove Product A from the cart.
6. Select payment method "TBC Bank".
7. Agree to the terms and conditions.
8. Click the Pay button.

Expected result:

- Checkout form is closed or disabled.
- Buy Now button is disabled.
- Creating an order is not possible.
- No new order appears in My Orders.

Actual result:

- Checkout form stays active.
- Payment method can be selected, terms can be accepted, and an order can be created.
- An empty order (without items) was created and is visible in My Orders.

Status: FAIL
Severity: High
Priority: High
