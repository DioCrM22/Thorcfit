// pages/Home/styles.js
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Page = styled.div`
  font-family: "Golos Text", sans-serif;
  padding-top: 60px;
  position: relative;
  animation: ${fadeInUp} 0.8s ease-out;
`;

export const Content = styled.div`
  padding: 16px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 16px;
  color: #0066cc;
  text-align: center;
  font-family: "Golos Text", sans-serif;
  animation: ${slideUp} 0.7s ease-in-out both;
`;

export const CenteredLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  img {
    width: 180px;
    height: auto;
  }
`;