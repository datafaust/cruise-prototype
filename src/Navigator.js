import React, { Component } from 'react';
import {Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap'
import classes from './nav.module.css';
import logo from './assets/taxi.png'

class Navigator extends Component {


    render() {

  
        return (
            
            <Navbar sticky="top" collapseOnSelect expand="lg" style = {{backgroundColor:'#485671'}} variant="dark" >
            <Navbar.Brand href="/">
            <div className={classes.wrapper}>
            <img className={classes.logo}
                  src={logo}
                  width="70"
                  height="60"
                  alt="React Bootstrap logo"
                />
            <h3 className={classes.title}>TLC Cruiser</h3>
            </div>
            </Navbar.Brand>
              
            </Navbar>
            
        );
    }
}

export default Navigator;


/**
 * old code
 * <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="Dash">Dash</Nav.Link>
                  <Nav.Link href="Settings">Settings</Nav.Link>
                  <Nav.Link href="about">About</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="contact">Contact Us</Nav.Link>
                </Nav>
              </Navbar.Collapse>
 */