import styled from 'styled-components';

const VERMELHO = '#ff4757';
const LARANJA = '#FF6B35';

export const NotificacaoContainer = styled.div`
  position: fixed;
  top: 70px;
  right: 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    right: 10px;
  }
`;

export const NotificacaoBadge = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${VERMELHO};
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    font-size: 13px;
  }
`;

export const NotificacaoDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 280px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;

  @media (max-width: 480px) {
    width: 260px;
    right: -10px;
  }
`;

export const NotificacaoItem = styled.div`
  display: flex;
  padding: 8px 0;
  margin-bottom: 6px;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

export const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
  
  h4 {
    margin: 0 0 3px 0;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  p {
    margin: 0;
    font-size: 12px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const AcaoButton = styled.button`
  padding: 4px 8px;
  border-radius: 15px;
  border: none;
  font-size: 7px;
  cursor: pointer;
  margin-left: 7px;
  background: ${props => props.aceitar ? LARANJA : '#f0f0f0' };
  color: ${props => props.aceitar ? 'white' : '#333'};
  min-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    padding: 3px 6px;
    font-size: 11px;
    min-width: 26px;
  }
`;
