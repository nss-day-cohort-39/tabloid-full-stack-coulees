import React, { useState, useContext, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
  const { isLoggedIn, logout, isAdmin, setIsAdmin } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (sessionStorage.getItem("userProfile")) {
      const currentUserType = JSON.parse(sessionStorage.getItem("userProfile")).userType.name
      if (currentUserType === 'Admin') {
        setIsAdmin(true)
      }
    }
  }, [])

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Tabloid</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/posts">Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/myposts">My Posts</NavLink>
                </NavItem>
                <NavItem>               
                  <NavLink tag={RRNavLink} to="/newpost">New Post</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/category">Category Management</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/tags">Tag Management</NavLink>
                </NavItem>
              </>
            }
            {isLoggedIn && isAdmin &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/users">Users</NavLink>
                </NavItem>
              </>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
