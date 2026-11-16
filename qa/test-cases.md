# Zoma Test Run

Build/commit: be0e88224cd3a7c8b9158d3dfe9c0e323c824ae1
Date: 2026-11-16
Environment: Local (localhost:3000), Firefox 160.0, Windows 11
Test data:

- User: luka@dev.com / 123
- Product A: "ზომა - ქაფი " (ID 12), price 8.61 ₾, price before discount 9.78 ₾, in stock
- Product B: "ზომა - შუშის საწმენდი 1L" (ID 15), price 6.75 ₾, price before discount 7.5 ₾, in stock

# TC-001: Add product from product details page

Preconditions:

- User opens a product details page.
- Product is available.

  Steps:

1. Open a product details page.
2. Click Add to Cart.
3. Open the shopping cart.
   Expected result:

Expected Result:

- Product appears in the cart.
- Correct product name and price are displayed.
- Quantity is 1.

Actual Result:

- Product appears in the cart.
- Correct product name and price are displayed.
- Quantity is 1.

Status: PASS

# TC-002: Add product from product listing page

Preconditions:

- User opens the product listing page.
- Products are available.
  Steps:

1. Open the product listing.
2. Click Add to Cart on a product.
3. Open the shopping cart.

   Expected result:

- Number on cart icon on products page in top right corner changed from '0' to '1'
- Selected product appeared in the cart page.
- Correct product name and price are displayed in cart page.
- Quantity of product is 1.

Actual Result:

- Number on cart icon on products page in top right corner changed from '0' to '1'
- Selected product appeared in the cart page.
- Correct product name and price are displayed in cart page.
- Quantity of product is 1.

Status: PASS

# TC-003: Add the same product from both pages (products and products detail pages)

Preconditions:

- Cart is initially empty.
- Product is available.
  Steps:

1. Open the product details page.
2. Add the product to the cart.
3. Return to the product listing.
4. Add the same product again.
5. Open the shopping cart.

   Expected result:

- Number on cart icon on products page in top right corner changed from '0' to '2'
- Product quantity is updated to 2 (if that is the intended behavior).
- Product has been duplicated as a separate cart item.
- Total price has been calculated correctly.

Actual Result:

- Number on cart icon on products page in top right corner changed from '0' to '2'
- Product quantity is updated to 2 (if that is the intended behavior).
- Product has been duplicated as a separate cart item.
- Total price is calculated correctly.

Status: PASS

## TC-004: Product filtering

Preconditions:

- User opens the product page.

Steps:

1. Select a product category.
2. Select same product category again.

Expected result:

- Only products belonging to the selected category are displayed and Products from other categories are hidden.
- after second click the filtering must be disabled and all products must be showed

Actual Result:

- Only products belonging to the selected category are displayed and Products from other categories are hidden.
- after second click the filtering is disabled and all products are showed

Status: PASS

## TC-005: Product deleting from cart

Preconditions:

- User opens the product page.
- Product is added to cart

Steps:

1. clicking delete icon in cart page

Expected result:

- product is deleted from cart
- data on summary window returned to state before adding cart item

Actual result:

- product is deleted from cart
- data on summary window returned to state before adding cart item

Status: PASS

## TC-006: 'Buy Now' button in cart page is disabled when cart is empty

Preconditions:

- User opens the cart page.
- Cart is empty

Steps:

1. User opens the cart page.
2. Click on 'Buy Now'.

Expected result:

- Buy Now button is disabled
- Nothing happens with click on button

Actual result:

- Buy Now button is disabled
- Nothing happens with click on button

Status: PASS

## TC-007: Price calculations

Preconditions:

- User adds products to a cart.

Steps:

1. Add ZOMA BAFIX FOAM (A price before discount 9.78 ₾, price with discount 8.61 ₾), quantity 1.
2. change product quantity from 1 to 3 .

Expected result:

- Price without discount: 29.34 ₾
- Discount: -3.51 ₾
- Total to pay: 25.83 ₾

Actual result:

Expected result:

- Price without discount: 29.34 ₾
- Discount: -3.51 ₾
- Total to pay: 25.83 ₾

Status: PASS

## TC-008: order appears in My Orders

Preconditions:

- product is avalibe.
- user is loged in.
- product is added in cart

Steps:

1. click buy now button
2. select buying method 'TBC Bank'
3. agree to terms and conditions
4. click pay button
5. click myOrders buttons

Expected result:

- we get Transaction Successful page and order number
- product is added to the user orders page
- order date and product name,price,discount and summary price data are correct.

Actual result:

- we get Transaction Successful page and order number
- product is added to the user orders page
- order date and product name,price,discount and summary price data are correct.

Status: PASS

## TC-009: changing amount of product in product detail page

Preconditions:

- product is avalibe.

Steps:

1. move to product detail page of product A  by clicking 'Buy Now' button.
2. change product quantity from 1 to 3.

Expected result:

- Price without discount: 29.34 ₾
- Discount: -3.51 ₾
- Total to pay: 25.83 ₾

Actual result:

- Price without discount: 9.78 ₾
- Discount: -3.51 ₾
- Total to pay: 25.83 ₾


Status: FAIL

Severity:Low
Priority:Low

## TC-010: removing cart item after clicking buy now button

Preconditions:

- product is avalibe.

Steps:

1. Open the product details page.
2. Add the product to the cart.
3. go to cart page.
4. click buy now button
5. remove cart item

Expected result:

- checkout form is off
- we get disabled buy now button

Actual result:

- checkout form is active
- we can select purchace method, apply to conditions and create empthy user order

Status: FAIL

Severity:high
Priority:high
