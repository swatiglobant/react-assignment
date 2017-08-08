import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const routes = {
    1 : '/',
    2 : '/create',
    3 : '/about'
};

export default class Header extends Component {



    handleSelect(selectedKey) {
        this.props.router.push(routes[selectedKey]);
    };

    render() {

        return (
                <Navbar collapseOnSelect>
                <h1>React-Redux TODO Application</h1>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Home</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav onSelect={this.handleSelect.bind(this)}>
                            <NavItem href="#" eventKey={1}>List</NavItem>
                            <NavItem href="#" eventKey={2}>Create Todo Item</NavItem>
                        </Nav>
                        <Nav pullRight onSelect={this.handleSelect.bind(this)}>
                            <NavItem href="#" eventKey={3}>About</NavItem>
                            <NavItem href="#"></NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        );
    }
}
