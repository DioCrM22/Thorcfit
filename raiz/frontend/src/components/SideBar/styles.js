import styled from 'styled-components';

export const Drawer = styled.div`
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
`;

export const CloseButton = styled.div`
  padding: 16px;
  text-align: right;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-transform: uppercase;
`;

export const NavItem = styled.li`
  padding: 14px 16px;
  cursor: pointer;
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  &:hover { 
    background: #f5f5f5; 
  }
`;

export const NavItemExit = styled(NavItem)`
  color: red;
  margin-top: 20px;
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  text-align: center;
  margin: 20px 0;
  padding: 0 16px;
  text-transform: uppercase;
  letter-spacing: 1px;

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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ff7f00;
`;

export const UserInfoContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const UserName = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 15px;
`;

export const InfoDivider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px 0;
`;

export const UserInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
`;

export const InfoLabel = styled.span`
  font-weight: 600;
  color: #555;
  font-size: 0.85rem;
`;

export const InfoValue = styled.span`
  color: #333;
  font-size: 0.85rem;
  text-align: right;
  max-width: 60%;
  word-break: break-word;
`;

export const UserInfoLine = styled.div`
  font-size: 0.8rem;
  color: #555;
  text-align: center;
  margin: 10px 0;
  line-height: 1.4;
  word-break: break-word;
`;

export const ObjectiveText = styled.div`
  font-size: 0.85rem;
  color: #333;
  text-align: center;
  margin-top: 10px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;

  strong {
    color: #ff7f00;
  }
`;