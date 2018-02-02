import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../styles/logo.svg';

const Header = (props) => {
	return (
		<div>
			<Navbar
				inverse={false}>
				<Navbar.Header>
					<NavbarBrand>
						<Link to={'/'}>
							<img src={logo} className="App-logo" alt="logo" style={{ "height": "20px" }} />
						</Link>
					</NavbarBrand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<LinkContainer to='/graphs' activeClassName={"active"}>
							<NavItem>Graphs</NavItem>
						</LinkContainer>
						<LinkContainer to='/about' activeClassName={"active"}>
							<NavItem>About</NavItem>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default Header;