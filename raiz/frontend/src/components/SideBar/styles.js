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
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ff7f00;
`;

export const ChangePhotoButton = styled.button`
  margin-top: 8px;
  background: none;
  border: none;
  color: #ff7f00;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  padding: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    color: #e67300;
  }
`;

export const CropModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CropContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

export const CropActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

export const CropButton = styled.button`
  background: #ff7f00;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #e67300;
  }
`;

export const CropCancelButton = styled(CropButton)`
  background: #ccc;
  
  &:hover {
    background: #999;
  }
`;