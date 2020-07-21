import React, { useState, useContext, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem

} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";
import logo from "../logo.svg"
import PostSearch from './posts/SearchPosts';
import { Route, Redirect } from "react-router-dom";

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
      <Navbar light expand="md">
        <NavbarBrand tag={RRNavLink} to="/"><img src={logo} className="mt-n1 mr-1" />Tabloid</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
                <NavItem>
                  <PostSearch />
                </NavItem>
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

                {isLoggedIn && isAdmin &&
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Admin Functions
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink tag={RRNavLink} to="/category">Category Management</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink tag={RRNavLink} to="/tags">Tag Management</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink tag={RRNavLink} to="/users">User Profiles</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                }
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
