import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Drawer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100%;
  background: #fff;
  box-shadow: 2px 0 8px rgba(0,0,0,0.1);
  transform: translateX(${({ open }) => open ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px 0;
`;

export const CloseButton = styled.div`
  padding: 16px;
  text-align: right;
  position: absolute;
  right: 0;
  top: 0;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  text-transform: uppercase;
`;

export const NavItem = styled.li`
  padding: 14px 16px;
  cursor: pointer;
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.2s;
  
  &:hover {
    background: #f5f5f5;
    transform: translateX(5px);
  }
`;

export const NavItemExit = styled(NavItem)`
  color: #ff4444;
  margin-top: 20px;
  &:hover {
    background: #ffe5e5;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Golos Text", sans-serif;
  display: flex;
  justify-content: center;
<<<<<<< HEAD
  gap: 0; /* Removido o gap para juntar as letras */
=======
  gap: 0;
>>>>>>> diogo
  margin: 40px 0 20px;
  width: 100%;
  position: relative;
  text-transform: uppercase;

  & > span:first-child {
    color: #0066cc;
  }

  & > span:last-child {
    color: #ff7f00;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
  padding: 0 16px;
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ff7f00;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

export const UserInfoContainer = styled.div`
  width: 100%;
  margin-top: 25px;
  text-align: center;
`;

export const UserName = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  letter-spacing: 0.5px;
`;

export const InfoDivider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 15px 0;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

export const ContactInfo = styled.div`
  font-size: 0.75rem;
  color: #666;
  line-height: 1.5;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  padding: 0 10px;
`;

export const ObjectiveText = styled.div`
  font-size: 0.85rem;
  color: #333;
  padding: 10px;
  background: #fff4e6;
  border-radius: 6px;
  margin: 15px 10px 0;
  border: 1px solid #ffd8b3;

  strong {
    color: #ff7f00;
    font-weight: 600;
  }
`;