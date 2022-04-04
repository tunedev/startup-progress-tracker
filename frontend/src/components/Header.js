// TODO: Accept a user object and optionally expose available navs
// TODO: work on making the commented out codes functional in order to interact with the graphql server

import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <header className="header">
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">Progress Tracker</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {/* <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text> */}
            {/* <Nav as="div" className="p-2">
              <Nav.Item className="mx-3">
                <button className="btn btn-outline-dark">signin</button>
              </Nav.Item>
              <Nav.Item>
                <button className="btn btn-dark">signup</button>
              </Nav.Item>
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
