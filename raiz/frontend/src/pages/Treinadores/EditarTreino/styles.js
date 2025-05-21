// EditarTreino/styles.js atualizado com animações e layout padronizado
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AZUL = '#3a86ff';
const VERMELHO = '#ff4444';
const CINZA = '#666';
const CINZA_CLARO = '#f5f5f5';

export const Container = styled(motion.div)`
  width: 100%;
  max-width: 850px;
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  font-family: 'Golos Text', sans-serif;
  overflow-y: auto;
  max-height: 95vh;

  * {
    font-family: 'Golos Text', sans-serif;
  }

  h3, h4 {
    color: #333;
    margin-top: 30px;
    margin-bottom: 15px;
  }
`;

export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;

  img {
    width: 40px;
    height: auto;
  }

  span {
    font-size: 1.3rem;
    font-weight: bold;
    color: ${AZUL};
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #333;
  }
`;

export const WorkoutForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #444;
`;

export const Input = styled(motion.input)`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  background: #fafafa;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${AZUL};
    background: #fff;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  resize: vertical;
  background: #fafafa;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${AZUL};
    background: #fff;
  }
`;

export const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

export const ExerciseItem = styled.div`
  background: ${CINZA_CLARO};
  border-radius: 12px;
  padding: 20px;
  animation: fadeIn 0.3s ease-in-out;
`;

export const ExerciseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  h4 {
    margin: 0;
    color: #333;
    font-size: 1rem;
  }
`;

export const ExerciseContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
`;

export const PrimaryButton = styled(motion.button)`
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, ${AZUL}, #4fc3f7);
  color: white;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.95;
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background: white;
  color: ${AZUL};
  border: 2px solid ${AZUL};
`;

export const DangerButton = styled(PrimaryButton)`
  background: white;
  color: ${VERMELHO};
  border: 2px solid ${VERMELHO};
  padding: 10px 14px;
`;

export const AddExerciseButton = styled(PrimaryButton)`
  background: transparent;
  color: ${AZUL};
  border: 2px dashed ${AZUL};
  margin-top: 10px;
  justify-content: center;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${CINZA};
  background: ${CINZA_CLARO};
  border-radius: 10px;
  margin-bottom: 30px;

  p {
    margin-top: 10px;
    font-size: 16px;
  }
`;
