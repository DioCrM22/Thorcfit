import React, { useState } from 'react';
import styled from 'styled-components';
import { Label, Input, ErrorMessage } from '../../pages/Perfil/styles';

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  
  input {
    padding-right: 35px;
    margin: 0;
  }
`;

const DropdownIcon = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 16px;
  transition: transform 0.2s;
`;

const OptionsDropdown = styled.div`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  width: 100%;
  background: white;
  border: 2px solid #3a86ff;
  border-top: none;
  border-radius: 0 0 8px 8px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const OptionItem = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #3a86ff 15;
    color: #3a86ff;
  }
`;

const InputWithOptions = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  error, 
  ...props 
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setShowOptions(false);
  };

  return (
    <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
      <Label>{label}</Label>
      <InputContainer>
        <Input
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e);
            setShowOptions(true);
          }}
          onFocus={() => setShowOptions(true)}
          onBlur={() => setTimeout(() => setShowOptions(false), 150)}
          error={error}
          aria-haspopup="listbox"
          aria-expanded={showOptions}
          {...props}
        />
        <DropdownIcon style={{
          transform: `translateY(-50%) ${showOptions ? 'rotate(180deg)' : ''}`
        }}>
          ▼
        </DropdownIcon>
        
        {showOptions && (
          <OptionsDropdown role="listbox">
            {options.map((option) => (
              <OptionItem 
                key={option} 
                role="option"
                onMouseDown={() => handleSelect(option)}
              >
                {option}
              </OptionItem>
            ))}
          </OptionsDropdown>
        )}
      </InputContainer>
      {error && <ErrorMessage style={{ bottom: '-22px' }}>{error}</ErrorMessage>}
    </div>
  );
};

export default InputWithOptions;