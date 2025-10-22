// Pruebas para funciones utilitarias del carrito
describe('Cart Utilities', () => {

  // Función de formateo de precios en pesos chilenos
  function clp(n) {
    const r = Math.round(n/500)*500;
    return r.toLocaleString('es-CL',{style:'currency',currency:'CLP'});
  }

  // Función para etiquetas de tamaño de tortas
  function personasLabel(size) {
    if (!size) return '';
    return size === 'S' ? 'Pequeña (10 personas)' :
           size === 'M' ? 'Mediana (20 personas)' :
           size === 'L' ? 'Grande (30 personas)' : size;
  }

  it('8. Debería formatear precios chilenos correctamente', () => {
    expect(clp(45000)).toBe('$45.000');
    expect(clp(5500)).toBe('$5.500');
    expect(clp(0)).toBe('$0');
  });

  it('9. Debería retornar etiquetas de tamaño correctas', () => {
    expect(personasLabel('S')).toBe('Pequeña (10 personas)');
    expect(personasLabel('M')).toBe('Mediana (20 personas)');
    expect(personasLabel('L')).toBe('Grande (30 personas)');
    expect(personasLabel('')).toBe('');
    expect(personasLabel(null)).toBe('');
  });

  it('10. Debería calcular total del carrito correctamente', () => {
    const cartItems = [
      { precio: 45000, qty: 2 },
      { precio: 5000, qty: 1 }
    ];

    const total = cartItems.reduce((sum, item) => sum + (item.precio * item.qty), 0);
    expect(total).toBe(95000);
  });
});