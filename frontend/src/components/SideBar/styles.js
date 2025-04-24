// components/Sidebar/styles.js
import styled from 'styled-components';

export const Drawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: #fff;
  box-shadow: 2px 0 8px rgba(0,0,0,0.1);
  transform: translateX(${({ open }) => open ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 20;
`;

export const CloseButton = styled.div`
  padding: 16px;
  text-align: right;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  &:hover { background: #f5f5f5; }
`;

export const NavItemExit = styled(NavItem)`
  color: red;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 180px;
    height: auto;
  }
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 900;
  font-family: "Golos Text", sans-serif;
  display: flex;
  align-items: center;

  & > span:first-child {
    color: #0066cc;
  }

  & > span:last-child {
    color: #ff7f00;
  }
`;