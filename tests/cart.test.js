describe("Cart total calculation", () => {
  test("calculates total correctly", () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 }
    ];

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    expect(total).toBe(250);
  });
});

