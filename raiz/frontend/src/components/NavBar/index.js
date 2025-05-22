import React from 'react';
import { 
  NavBarContainer, 
  BackButton, 
  BackIcon, 
  MenuButton,
  MenuIcon,
  Title, 
  BlueText, 
  OrangeText 
} from './styles';

export default function NavBar({ 
  title = "Thorc Fit",  
  showBack = true,
  showMenu = false,
  onBack,
  onMenu 
}) {

  const titleParts = title.split(' ');
  const firstPart = titleParts[0];
  const secondPart = titleParts.slice(1).join(' ');

  return (
    <NavBarContainer>
      {showBack && (
        <BackButton onClick={onBack}>
          <BackIcon />
        </BackButton>
      )}
      {showMenu && (
        <MenuButton onClick={onMenu}>
          <MenuIcon />
        </MenuButton>
      )}
      <Title>
        <BlueText>{firstPart}</BlueText>
        {secondPart && <OrangeText> {secondPart}</OrangeText>}
      </Title>
    </NavBarContainer>
  );
}