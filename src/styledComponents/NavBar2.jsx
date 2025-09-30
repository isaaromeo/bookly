import { NavLink } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";

import {
  FaHome,
  FaUsers,
  FaDragon,
  FaBook,
  FaEllipsisV,
  FaEllipsisH,
  FaSignInAlt
} from "react-icons/fa";

const NavContainer = styled.nav`
  background: ${({ theme }) => theme.navBarBackground};
  padding: 0.5rem 2rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);
  position: sticky;
  top: 0;
  z-index: 100;
  border-radius: 10px;
  max-width: 1250px;
  margin: 0 auto;
  overflow: visible;
  @media (max-width: 600px) {
    padding: 0;
  }
`;

const StyledList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
  justify-content: center;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 900px) {
    gap: 0.5rem;
    justify-content: space-around;
  }

  @media (max-width: 600px) {
    gap: 0;
    padding: 0;
  }
`;

const ListItem = styled.li`
  position: relative;
  margin: 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    width: auto;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.primaryText};
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    color: ${({ theme }) => theme.accentColor};
  }

  &.active {
    color: ${({ theme }) => theme.accentColor};
    background: rgba(255, 158, 128, 0.15);
  }

  @media (max-width: 900px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
  }

  @media (max-width: 500px) {
    padding: 0.8rem;
    font-size: 0;
    border-radius: 25%;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;

    &.active {
      &::before {
        display: none;
      }
    }
  }
`;

const NavText = styled.span`
  @media (max-width: 700px) {
    display: none;
  }
`;

const MobileIcon = styled.div`
  font-size: 1.2rem;
  padding-top: 6px;
  @media (max-width: 700px) {
    display: block;
    font-size: 1rem;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${({ theme }) => theme.tableOddRow};
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  min-width: 160px;
  z-index: 9999;
  overflow: visible;
`;

const DropdownItem = styled(NavLink)`
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.primaryText};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.accentColor}22;
    color: ${({ theme }) => theme.accentColor};
  }

  &.active {
    color: ${({ theme }) => theme.accentColor};
    font-weight: bold;
  }
`;


const NavBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/";
    };
  
    return (
      <NavContainer>
        <StyledList>
          <ListItem>
            <StyledNavLink to="/" exact activeClassName="active">
              <MobileIcon>
                <FaHome />
              </MobileIcon>
              <NavText>Home</NavText>
            </StyledNavLink>
          </ListItem>
          <ListItem>
            <StyledNavLink to="/books" activeClassName="active">
              <MobileIcon>
                <FaBook />
              </MobileIcon>
              <NavText>Books</NavText>
            </StyledNavLink>
          </ListItem>
  
          {user ? (
            <>
              <ListItem>
                <StyledNavLink to="/profile" activeClassName="active">
                  <MobileIcon>
                    <FaUser />
                  </MobileIcon>
                  <NavText>Perfil</NavText>
                </StyledNavLink>
              </ListItem>
              <ListItem>
                <StyledNavLink as="div" onClick={handleLogout}>
                  <MobileIcon>
                    <FaSignOutAlt />
                  </MobileIcon>
                  <NavText>Salir</NavText>
                </StyledNavLink>
              </ListItem>
            </>
          ) : (
            <ListItem>
              <StyledNavLink to="/login" activeClassName="active">
                <MobileIcon>
                  <FaSignInAlt />
                </MobileIcon>
                <NavText>Login</NavText>
              </StyledNavLink>
            </ListItem>
          )}
        </StyledList>
      </NavContainer>
    );
  };
  
  export default NavBar;