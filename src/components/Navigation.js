import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import styled from 'styled-components';


const Styles = styled.div`
background-color:green;
`;

export const Navigation = () => (
    <Styles>
        <Navbar expand="lg" className="navbar-dark bg-primary">
            <Container>
                <Navbar.Brand href="/">CrowdRec</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Link to="/" className="nav-link">Home</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/about" className="nav-link">About</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </Styles>
)