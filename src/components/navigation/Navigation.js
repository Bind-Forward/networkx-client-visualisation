import React from 'react';
import { Navbar, Nav, NavItem, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../styles/logo.svg';

class Navigation extends React.Component {
	constructor(props, context) {
		super(props);
	}

	render () {
		return (
			<Navbar>
				<Navbar.Header>
					<NavbarBrand>
						<Link to={'/'}>
							<logo />
						</Link>
					</NavbarBrand>					
				</Navbar.Header>
				<Nav>
					<NavItem>
						<Link to={'/graph'} activeClassName="active" />
					</NavItem>
				</Nav>
			</Navbar>
		);
	}		
}

export default Navigation;