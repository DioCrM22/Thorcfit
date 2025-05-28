import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Container, 
  ProfilePicture, 
  Header,
  ProfileImage,
  UploadLabel,
  InputGroup,
  Label,
  Input,
  DateInput,
  Button,
  ModalBackdrop,
  ModalContent,
  ErrorMessage,
  SpacingLine,
  Separator,
  ViewModeField,
  EditButton,
  PasswordButton,
  BioText,
  ProfessionalHeader,
  DateDisplay
} from './styles';
import NavBar from '../../components/NavBar';
import ImageCropper from './ImageCropper';

const AZUL = '#3a86ff';
const LARANJA = '#FF6B35';
const VERDE = '#229a00';

const ProfessionalProfile = () => {
  const { professionalType } = useParams();
  const navigate = useNavigate();

  // Dados mockados
  const mockData = {
    nome: professionalType === 'nutricionista' ? 'Dra. Ana Silva' : 'Carlos Mendes',
    email: professionalType === 'nutricionista' ? 'ana.silva@email.com' : 'carlos.mendes@email.com',
    telefone: '(11) 98765-4321',
    dataNascimento: '1985-05-15',
    genero: 'Feminino',
    registro: professionalType === 'nutricionista' ? 'CRN-12345' : 'CREF-54321',
    bio: professionalType === 'nutricionista' 
      ? 'Nutricionista especializada em nutrição esportiva e reeducação alimentar. Formada pela USP com 10 anos de experiência.'
      : 'Personal Trainer especializado em treinamento funcional e musculação. Certificado pela ACE e com 8 anos de experiência.',
    foto_perfil: null,
    especialidades: professionalType === 'nutricionista' 
      ? 'Nutrição Esportiva, Emagrecimento Saudável' 
      : 'Treino Funcional, Hipertrofia',
    experiencia: professionalType === 'nutricionista'
      ? '10 anos de experiência clínica\nConsultora nutricional de atletas'
      : '8 anos de experiência\nTreinador de atletas amadores',
    formacao: professionalType === 'nutricionista'
      ? 'Nutrição - USP (2010)\nPós em Nutrição Esportiva - UNIFESP (2012)'
      : 'Educação Física - UNICAMP (2013)\nCertificação ACE (2015)',
    clientesAtivos: professionalType === 'nutricionista' ? 32 : 25
  };

  const [profileData, setProfileData] = useState(mockData);
  const [formData, setFormData] = useState({ ...mockData });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) setFormData(profileData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'registro') {
      if (professionalType === 'nutricionista' && !value.match(/^CRN-[0-9]{5,8}$/)) {
        error = 'Formato CRN inválido (ex: CRN-12345)';
      }
      if (professionalType === 'personal' && !value.match(/^CREF-[0-9]{5,8}$/)) {
        error = 'Formato CREF inválido (ex: CREF-12345)';
      }
    }
    
    if (name === 'bio' && value.length > 500) {
      error = 'Máximo 500 caracteres';
    }

    if (name === 'dataNascimento') {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        error = 'Data inválida';
      }
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleSave = () => {
    const hasErrors = Object.keys(errors).some(key => errors[key]);
    if (hasErrors) return toast.error('Corrija os campos inválidos');

    toast.success('Perfil atualizado com sucesso! (dados mockados)');
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    if (e.target.files?.[0]) {
      setShowCropper(true);
      setTempImage(e.target.files[0]);
    }
  };

  const handleCropComplete = (croppedImage) => {
    setFormData(prev => ({ ...prev, foto_perfil: croppedImage }));
    setShowCropper(false);
  };

  const formatDateToDisplay = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  const registrationLabel = professionalType === 'nutricionista' 
    ? 'CRN (Registro Profissional)' 
    : 'CREF (Registro Profissional)';

  return (
    <Container>
      <Header>
        <NavBar 
          title="THORC FIT"
          showBack={true}
          showMenu={false}
          onBack={() => navigate('/treinadores')}
        />

        <EditButton 
          onClick={handleEditToggle} 
          isEditing={isEditing}
        >
          <span>
            {isEditing ? '✕' : '✏️'}
          </span>
        </EditButton>
      </Header>

      <ProfilePicture>
        <ProfileImage 
          src={formData.foto_perfil || '/default-avatar.png'} 
          alt="Perfil" 
        />
        
        {isEditing && (
          <UploadLabel>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              style={{ display: 'none' }}
              id="profile-upload"
            />
            <label htmlFor="profile-upload">
              <span className="material-icons">edit</span>
            </label>
          </UploadLabel>
        )}
      </ProfilePicture>

      {showCropper && (
        <ModalBackdrop>
          <ModalContent>
            <h3 style={{ color: AZUL }}>Recortar Foto</h3>
            <ImageCropper
              imageFile={tempImage}
              onCropComplete={handleCropComplete}
              onCancel={() => setShowCropper(false)}
            />
          </ModalContent>
        </ModalBackdrop>
      )}

      <ProfessionalHeader>
        <h2>{profileData.nome}</h2>
        <p>{profileData.especialidades}</p>
      </ProfessionalHeader>

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <InputGroup>
          <Label>👤 Nome Completo</Label>
          {isEditing ? (
            <Input
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              error={errors.nome}
            />
          ) : (
            <ViewModeField>{profileData.nome}</ViewModeField>
          )}
        </InputGroup>

        <InputGroup>
          <Label>📧 Email</Label>
          <ViewModeField>{profileData.email}</ViewModeField>
        </InputGroup>

        <InputGroup>
          <Label>📱 Telefone</Label>
          {isEditing ? (
            <Input
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              error={errors.telefone}
              placeholder="(99) 99999-9999"
            />
          ) : (
            <ViewModeField>{profileData.telefone}</ViewModeField>
          )}
        </InputGroup>

        <SpacingLine />

        <InputGroup>
          <Label>📆 Data Nascimento</Label>
          {isEditing ? (
            <>
              <DateInput
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                bordercolor={AZUL}
              />
              <DateDisplay>
                {formData.dataNascimento ? formatDateToDisplay(formData.dataNascimento) : 'Selecione uma data'}
              </DateDisplay>
              {errors.dataNascimento && <ErrorMessage>{errors.dataNascimento}</ErrorMessage>}
            </>
          ) : (
            <ViewModeField>{formatDateToDisplay(profileData.dataNascimento) || 'Não informado'}</ViewModeField>
          )}
        </InputGroup>

        <InputGroup>
          <Label>🚻 Gênero</Label>
          {isEditing ? (
            <Input
              as="select"
              name="genero"
              value={formData.genero}
              onChange={handleInputChange}
            >
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
              <option value="Outro">Outro</option>
              <option value="Prefiro não informar">Prefiro não informar</option>
            </Input>
          ) : (
            <ViewModeField>{profileData.genero}</ViewModeField>
          )}
        </InputGroup>

        <SpacingLine />

        <InputGroup>
          <Label>{registrationLabel}</Label>
          {isEditing ? (
            <>
              <Input
                name="registro"
                value={formData.registro}
                onChange={handleInputChange}
                error={errors.registro}
                placeholder={
                  professionalType === 'nutricionista' 
                    ? 'Ex: CRN-12345' 
                    : 'Ex: CREF-12345'
                }
              />
              {errors.registro && <ErrorMessage>{errors.registro}</ErrorMessage>}
            </>
          ) : (
            <ViewModeField>{profileData.registro}</ViewModeField>
          )}
        </InputGroup>

        <InputGroup>
          <Label>🎓 Formação Acadêmica</Label>
          {isEditing ? (
            <Input
              as="textarea"
              name="formacao"
              value={formData.formacao}
              onChange={handleInputChange}
              rows="3"
              placeholder="Ex: Educação Física - USP (2015)"
            />
          ) : (
            <ViewModeField style={{ whiteSpace: 'pre-wrap' }}>{profileData.formacao}</ViewModeField>
          )}
        </InputGroup>

        <InputGroup>
          <Label>🌟 Especialidades</Label>
          {isEditing ? (
            <Input
              name="especialidades"
              value={formData.especialidades}
              onChange={handleInputChange}
              placeholder="Ex: Nutrição Esportiva, Emagrecimento"
            />
          ) : (
            <ViewModeField>{profileData.especialidades}</ViewModeField>
          )}
        </InputGroup>

        <InputGroup>
          <Label>📖 Biografia Profissional</Label>
          {isEditing ? (
            <>
              <Input
                as="textarea"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                error={errors.bio}
                rows="4"
                style={{ resize: 'vertical' }}
                placeholder="Fale sobre sua abordagem profissional"
              />
              {errors.bio && <ErrorMessage>{errors.bio}</ErrorMessage>}
              <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                {formData.bio.length}/500 caracteres
              </div>
            </>
          ) : (
            <BioText>
              {profileData.bio}
            </BioText>
          )}
        </InputGroup>

        <Separator>
          <span><img src="/assets/images/iconlogo.png" alt="iconLogo" /></span>
        </Separator>

        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          marginTop: '1.5rem',
          flexDirection: window.innerWidth < 480 ? 'column' : 'row'
        }}>
          {isEditing ? (
            <>
              <Button type="submit" cor={VERDE}>
                💾 Salvar Alterações
              </Button>
              
              <Button 
                type="button" 
                cor={LARANJA}
                onClick={() => setIsEditing(false)}
              >
                ❌ Cancelar
              </Button>
            </>
          ) : (
            <PasswordButton to="/forgot-password">
              🔐 Alterar Senha
            </PasswordButton>
          )}
        </div>
      </form>
    </Container>
  );
};

export default ProfessionalProfile;