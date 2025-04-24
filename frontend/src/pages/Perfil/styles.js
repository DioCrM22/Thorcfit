// src/pages/Perfil/styles.js
import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
`;

export const Title = styled.h1`
  font-family: 'Golos Text', sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
  text-align: center;
  & span:first-child { color: #0066cc; }
  & span:last-child { color: #ff7f00; }
`;

export const Logo = styled.img`
  width: 120px;
  margin: 1rem 0;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #ff7f00;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
