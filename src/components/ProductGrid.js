import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';

// Base de datos de productos de la pastelería
const DB = {
  productos: [
    {codigo:"TC001",categoria:"Tortas Cuadradas",nombre:"Torta Cuadrada de Chocolate",precio:45000,shape:"cuadrada",
     img:"https://brigams.pe/wp-content/uploads/chocolate-2.jpg",personalizable:true,
     descripcion:"Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales."},
    {codigo:"TC002",categoria:"Tortas Cuadradas",nombre:"Torta Cuadrada de Frutas",precio:50000,shape:"cuadrada",
     img:"https://chedrauimx.vteximg.com.br/arquivos/ids/53712889-400-400/2350784_00.jpg?v=638924396260470000",personalizable:true,
     descripcion:"Mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones."},
    {codigo:"TT001",categoria:"Tortas Circulares",nombre:"Torta Circular de Vainilla",precio:40000,shape:"circular",
     img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPgjtyD4IWwQrQNFRFio1Qn0Gxsk6FDJl3Ig&s",personalizable:true,
     descripcion:"Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce."},
    {codigo:"TT002",categoria:"Tortas Circulares",nombre:"Torta Circular de Manjar",precio:42000,shape:"circular",
     img:"https://www.nestleprofessional-latam.com/sites/default/files/styles/np_recipe_detail/public/2024-10/torta-con-relleno-manjar-nestle.jpg?itok=QVIIeSSu",personalizable:true,
     descripcion:"Tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos."},
    {codigo:"PI001",categoria:"Postres Individuales",nombre:"Mousse de Chocolate",precio:5000,shape:"individual",
     img:"https://upload.wikimedia.org/wikipedia/commons/9/9b/Mousse_au_Chocolat_in_Glas_%28cropped%29.jpg",
     descripcion:"Postre individual cremoso y suave, hecho con chocolate de alta calidad."},
    {codigo:"PI002",categoria:"Postres Individuales",nombre:"Tiramisú Clásico",precio:5500,shape:"individual",
     img:"https://gioelia.com/wp-content/uploads/2024/09/2019-Torta-tiramisu_-3-2-scaled.jpg",
     descripcion:"Capas de café, mascarpone y cacao; un final perfecto para cualquier comida."},
  ]
};

// Función de formateo de precios en pesos chilenos
function clp(n) {
  const r = Math.round(n/500)*500;
  return r.toLocaleString('es-CL',{style:'currency',currency:'CLP'});
}

function ProductGrid({ onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});

  const categories = [...new Set(DB.productos.map(p => p.categoria))];

  const filteredProducts = DB.productos.filter(product => {
    const matchesSearch = !searchQuery ||
      product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.codigo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || product.categoria === selectedCategory;

    const matchesShape = !selectedFilters.shape || product.shape === selectedFilters.shape;
    const matchesTag = !selectedFilters.tag || product.tag === selectedFilters.tag;

    return matchesSearch && matchesCategory && matchesShape && matchesTag;
  });

  const handleFilterToggle = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  const handleAddToCart = (product, size = 'M', note = '') => {
    const mult = {S: 0.8, M: 1.0, L: 1.4};
    const precio = Math.round(product.precio * (mult[size] || 1));

    onAddToCart({
      codigo: product.codigo,
      nombre: product.nombre,
      precio,
      img: product.img,
      size,
      note,
      qty: 1
    });
  };

  return (
    <Container className="my-4">
      <h2 style={{fontFamily: 'Pacifico', fontSize: '32px', marginBottom: '20px'}}>
        Catálogo
      </h2>

      {/* Filtros */}
      <Card className="mb-4" style={{border: '3px solid #f0e4dc', borderRadius: '20px', padding: '16px'}}>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Búsqueda rápida</Form.Label>
              <Form.Control
                type="search"
                placeholder="Buscar por nombre, código o descripción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filtros avanzados</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                <Badge
                  bg={selectedFilters.shape === 'cuadrada' ? 'primary' : 'light'}
                  text={selectedFilters.shape === 'cuadrada' ? 'white' : 'dark'}
                  style={{cursor: 'pointer'}}
                  onClick={() => handleFilterToggle('shape', 'cuadrada')}
                >
                  Cuadrada
                </Badge>
                <Badge
                  bg={selectedFilters.shape === 'circular' ? 'primary' : 'light'}
                  text={selectedFilters.shape === 'circular' ? 'white' : 'dark'}
                  style={{cursor: 'pointer'}}
                  onClick={() => handleFilterToggle('shape', 'circular')}
                >
                  Circular
                </Badge>
                <Badge
                  bg={selectedFilters.tag === 'vegano' ? 'primary' : 'light'}
                  text={selectedFilters.tag === 'vegano' ? 'white' : 'dark'}
                  style={{cursor: 'pointer'}}
                  onClick={() => handleFilterToggle('tag', 'vegano')}
                >
                  Vegano
                </Badge>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* Grid de productos */}
      <Row>
        {filteredProducts.map(product => (
          <Col key={product.codigo} md={6} lg={4} className="mb-4">
            <Card style={{border: '3px solid #f0e4dc', borderRadius: '20px', height: '100%'}}>
              <Card.Img
                variant="top"
                src={product.img}
                style={{height: '200px', objectFit: 'cover'}}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.nombre}</Card.Title>
                <Card.Text className="text-muted small">
                  {product.categoria} · Código {product.codigo}
                  {product.shape && ` · Forma ${product.shape}`}
                </Card.Text>
                <Card.Text>{product.descripcion}</Card.Text>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong style={{color: '#8B4513'}}>{clp(product.precio)}</strong>
                  <Button variant="outline-secondary" size="sm">
                    Compartir
                  </Button>
                </div>

                {product.personalizable && (
                  <Row className="mb-2">
                    <Col>
                      <Form.Group>
                        <Form.Label>Tamaño</Form.Label>
                        <Form.Select size="sm" id={`size-${product.codigo}`} defaultValue="M">
                          <option value="S">Pequeña (10 personas)</option>
                          <option value="M">Mediana (20 personas)</option>
                          <option value="L">Grande (30 personas)</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Mensaje (opcional)</Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="Feliz cumple, Paula ♥"
                          id={`note-${product.codigo}`}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                )}

                <Button
                  style={{
                    background: '#8B4513',
                    border: 'none',
                    borderRadius: '14px',
                    fontWeight: '800',
                    marginTop: 'auto'
                  }}
                  onClick={() => {
                    const sizeEl = document.getElementById(`size-${product.codigo}`);
                    const noteEl = document.getElementById(`note-${product.codigo}`);
                    const size = sizeEl ? sizeEl.value : 'M';
                    const note = noteEl ? noteEl.value : '';
                    handleAddToCart(product, size, note);
                  }}
                >
                  Añadir al carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductGrid;