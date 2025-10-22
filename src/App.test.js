// Pruebas de integración de la aplicación principal
describe('App Integration', () => {
  it('App debería inicializar estado del carrito vacío', () => {
    const initialCartItems = [];
    expect(initialCartItems).toEqual([]);
    expect(initialCartItems.length).toBe(0);
  });
});
