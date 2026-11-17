import { renderHook, act } from "@testing-library/react";

import CartContextProdiver, { useCartContext } from "../src/context/CartContext";

jest.mock("../src/locales/products.json", () => ({
  __esModule: true,
  default: [
    { id: "p1", amount: 5 },
    { id: "p2", amount: 0 },
  ],
}));

const setup = () =>
  renderHook(() => useCartContext(), { wrapper: CartContextProdiver }).result;

test("adds a new item", () => {
  const cart = setup();
  act(() => cart.current.addToCart("p1", 2));
  expect(cart.current.cartItems).toEqual([{ id: "p1", quantity: 2 }]);
});

test("adding the same item increases quantity, no duplicate", () => {
  const cart = setup();
  act(() => cart.current.addToCart("p1", 1));
  act(() => cart.current.addToCart("p1", 2));
  expect(cart.current.cartItems).toEqual([{ id: "p1", quantity: 3 }]);
});

test("quantity does not exceed stock", () => {
  const cart = setup();
  act(() => cart.current.addToCart("p1", 3));
  act(() => cart.current.addToCart("p1", 4));
  expect(cart.current.cartItems[0].quantity).toBe(5);
});

test("out-of-stock product is not added", () => {
  const cart = setup();
  act(() => cart.current.addToCart("p2", 1));
  expect(cart.current.cartItems).toEqual([]);
});

test("updateQuantity with 0 removes the item", () => {
  const cart = setup();
  act(() => cart.current.addToCart("p1", 2));
  act(() => cart.current.updateQuantity("p1", 0));
  expect(cart.current.cartItems).toEqual([]);
});
