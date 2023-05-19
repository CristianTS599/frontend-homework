import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container id="nav-container">
        <Navbar.Brand href="#">CTS</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/home">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/houses">Houses</Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;

/*
<nav className="navbar navbar-dark bg-dark">
      <a href="#" className="site-title">
        Site Name
      </a>
    </nav>



*/
