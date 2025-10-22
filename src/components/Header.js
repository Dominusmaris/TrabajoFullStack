import React from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';

function Header({ cartCount, onCartOpen }) {
  return (
    <Navbar expand="lg" style={{
      backgroundColor: 'rgba(255,255,255,0.7)',
      backdropFilter: 'saturate(1.2) blur(6px)',
      borderBottom: '3px solid #ffdbe2',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <Container>
        <Navbar.Brand
          href="#home"
          style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: '28px',
            color: '#8B4513',
            letterSpacing: '.5px'
          }}
        >
          Pastelería 1000 Sabores
          <span style={{
            background: '#FFC0CB',
            color: '#8B4513',
            border: '2px solid #8B4513',
            borderRadius: '999px',
            padding: '2px 10px',
            fontWeight: '800',
            fontSize: '12px',
            marginLeft: '8px'
          }}>
            50 años
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#productos" style={{fontWeight: '700'}}>Productos</Nav.Link>
            <Nav.Link href="#blog" style={{fontWeight: '700'}}>Blog</Nav.Link>
            <Nav.Link href="#origen" style={{fontWeight: '700'}}>Origen</Nav.Link>
            <Nav.Link href="#impacto" style={{fontWeight: '700'}}>Impacto</Nav.Link>
            <Nav.Link href="#checkout" style={{fontWeight: '700'}}>Pedido</Nav.Link>
            <Nav.Link href="#registro" style={{fontWeight: '700'}}>Registro</Nav.Link>
          </Nav>

          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              style={{
                background: '#FFC0CB',
                color: '#8B4513',
                border: '2px solid #8B4513',
                borderRadius: '14px',
                fontWeight: '800'
              }}
            >
              🧁 Ver Catálogo
            </Button>
            <Button
              variant="outline-secondary"
              onClick={onCartOpen}
              style={{
                background: 'transparent',
                border: '2px solid #8B4513',
                color: '#8B4513',
                borderRadius: '14px',
                fontWeight: '800'
              }}
            >
              🧺 Carrito{' '}
              <Badge bg="secondary" style={{marginLeft: '6px'}}>
                {cartCount || 0}
              </Badge>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;