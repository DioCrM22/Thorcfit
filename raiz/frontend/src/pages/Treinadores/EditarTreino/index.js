// EditarTreino/index.js atualizado
import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import {
  Container,
  Header,
  WorkoutForm,
  FormGroup,
  Label,
  Input,
  TextArea,
  ExerciseList,
  ExerciseItem,
  ExerciseHeader,
  ExerciseContent,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  AddExerciseButton,
  EmptyMessage,
  TitleBar
} from './styles';

const EditarTreino = ({ userId, workoutId, onClose }) => {
  const [workout, setWorkout] = useState({
    nome: '',
    objetivo: '',
    observacoes: '',
    exercicios: []
  });

  const [newExercise, setNewExercise] = useState({
    nome: '',
    series: 3,
    repeticoes: 12,
    carga: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkout(prev => ({ ...prev, [name]: value }));
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...workout.exercicios];
    updatedExercises[index][field] = value;
    setWorkout(prev => ({ ...prev, exercicios: updatedExercises }));
  };

  const handleAddExercise = () => {
    if (!newExercise.nome) return;

    setWorkout(prev => ({
      ...prev,
      exercicios: [...prev.exercicios, newExercise]
    }));

    setNewExercise({ nome: '', series: 3, repeticoes: 12, carga: '' });
  };

  const handleRemoveExercise = (index) => {
    const updatedExercises = [...workout.exercicios];
    updatedExercises.splice(index, 1);
    setWorkout(prev => ({ ...prev, exercicios: updatedExercises }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Treino salvo:', workout);
    onClose();
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TitleBar>
        <img src="/assets/images/iconLogo.png" alt="Logo" />
        <span>THORCFIT</span>
      </TitleBar>

      <Header>
        <h2>{workoutId ? 'Editar Treino' : 'Novo Treino'}</h2>
        <SecondaryButton onClick={onClose}><FiX /> Fechar</SecondaryButton>
      </Header>

      <WorkoutForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome do Treino</Label>
          <Input name="nome" value={workout.nome} onChange={handleInputChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Objetivo</Label>
          <Input name="objetivo" value={workout.objetivo} onChange={handleInputChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Observações</Label>
          <TextArea name="observacoes" value={workout.observacoes} onChange={handleInputChange} rows="3" />
        </FormGroup>

        <h3>Exercícios</h3>
        {workout.exercicios.length === 0 ? (
          <EmptyMessage>
            <p>Nenhum exercício adicionado</p>
          </EmptyMessage>
        ) : (
          <ExerciseList>
            {workout.exercicios.map((exercise, index) => (
              <ExerciseItem key={index}>
                <ExerciseHeader>
                  <h4>{exercise.nome}</h4>
                  <DangerButton type="button" onClick={() => handleRemoveExercise(index)}><FiTrash2 /></DangerButton>
                </ExerciseHeader>

                <ExerciseContent>
                  <FormGroup>
                    <Label>Séries</Label>
                    <Input type="number" min="1" value={exercise.series} onChange={(e) => handleExerciseChange(index, 'series', e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Repetições</Label>
                    <Input type="number" min="1" value={exercise.repeticoes} onChange={(e) => handleExerciseChange(index, 'repeticoes', e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Carga</Label>
                    <Input value={exercise.carga} onChange={(e) => handleExerciseChange(index, 'carga', e.target.value)} placeholder="Ex: 20kg" />
                  </FormGroup>
                </ExerciseContent>
              </ExerciseItem>
            ))}
          </ExerciseList>
        )}

        <h4>Adicionar Exercício</h4>
        <ExerciseContent>
          <FormGroup>
            <Label>Nome do Exercício</Label>
            <Input value={newExercise.nome} onChange={(e) => setNewExercise({ ...newExercise, nome: e.target.value })} required />
          </FormGroup>
          <FormGroup>
            <Label>Séries</Label>
            <Input type="number" min="1" max="10" value={newExercise.series} onChange={(e) => setNewExercise({ ...newExercise, series: e.target.value })} required />
          </FormGroup>
          <FormGroup>
            <Label>Repetições</Label>
            <Input type="number" min="1" max="50" value={newExercise.repeticoes} onChange={(e) => setNewExercise({ ...newExercise, repeticoes: e.target.value })} required />
          </FormGroup>
          <FormGroup>
            <Label>Carga</Label>
            <Input value={newExercise.carga} onChange={(e) => setNewExercise({ ...newExercise, carga: e.target.value })} placeholder="Ex: 20kg" />
          </FormGroup>
        </ExerciseContent>

        <AddExerciseButton type="button" onClick={handleAddExercise}><FiPlus /> Adicionar Exercício</AddExerciseButton>

        <ButtonGroup>
          <PrimaryButton type="submit"><FiSave /> Salvar Treino</PrimaryButton>
        </ButtonGroup>
      </WorkoutForm>
    </Container>
  );
};

export default EditarTreino;
