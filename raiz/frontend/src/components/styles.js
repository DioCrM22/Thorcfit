// src/pages/Signup/styles.js
export const ValidationItem = styled.div`
  transition: all 0.3s;
  opacity: ${props => props.$valid ? 1 : 0.5};
  transform: scale(${props => props.$valid ? 1 : 0.95});
`;